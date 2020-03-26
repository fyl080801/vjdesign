import { guid2 } from "../utils/helpers";
import { eachTreeNodes } from "../utils/tree";
import { set } from "lodash-es";

export default {
  namespaced: true,
  state: {
    fields: [],
    datasource: {},
    inits: {},
    watchs: {},
    schema: {},
    //
    editing: null,
    fieldMap: {},
    model: {}
  },
  mutations: {
    //
    CREATEED: (state, payload = {}) => {
      const {
        fields = [],
        datasource = {},
        inits = {},
        watchs = {},
        schema = {}
      } = payload;

      state.fields = fields;
      state.datasource = datasource;
      state.inits = inits;
      state.watchs = watchs;
      state.schema = schema;
    },
    // 添加根元素
    ADD_ROOT: (state, payload) => {
      if (!Array.isArray(payload) || payload.length <= 0) {
        return;
      }

      const newItem = { uuid: guid2(), ...{ component: payload[0].tag } };

      (payload[0].defaults || []).forEach(item => {
        set(newItem, item.property, item.value);
      });

      state.fields = [newItem];

      // 同步
      eachTreeNodes(state.fields, node => {
        state.fieldMap[node.uuid] = node;
      });
    },
    // 添加或更新
    FIELD_CHILDREN_CHANGED: (state, payload) => {
      eachTreeNodes(state.fields, node => {
        const action = payload.find(p => p.uuid === node.uuid);

        if (!action) {
          return true;
        }

        const result = action.value.map(item => {
          if (item.component === undefined) {
            const newItem = {
              uuid: guid2(),
              component: item.tag
            };

            (item.defaults || []).forEach(item => {
              set(newItem, item.property, item.value);
            });

            return newItem;
          }
          return item;
        });

        node.children = result.map(item => {
          return state.fieldMap[item.uuid] || item;
        });
      });

      state.fields = [].concat(state.fields);

      // 同步map
      state.fieldMap = {};
      eachTreeNodes(state.fields, node => {
        state.fieldMap[node.uuid] = node;
      });
    },
    // 删除
    DELETE_FIELD: (state, payload) => {
      let isdelete = null;

      // 先看根级元素
      const deleteIndex = state.fields.findIndex(
        item => item.uuid === payload.uuid
      );

      if (deleteIndex >= 0) {
        isdelete = state.fields[deleteIndex].uuid;
        state.fields.splice(deleteIndex, 1);
      } else {
        eachTreeNodes(state.fields, node => {
          if (!node.children || node.children <= 0) {
            return true;
          }

          const deleteIndex = node.children.findIndex(
            item => item.uuid === payload.uuid
          );
          if (deleteIndex < 0) {
            return true;
          }

          isdelete = node.children[deleteIndex].uuid;
          node.children.splice(deleteIndex, 1);
          return false;
        });
      }

      if (isdelete) {
        if (state.editing === isdelete) {
          state.editing = null;
        }
        state.fields = [].concat(state.fields);
      }
    },

    //
    SELECT_EDITING: (state, payload) => {
      state.editing = payload.uuid;
    },
    UPDATE_EDITING: (state, payload) => {
      state.fieldMap[payload.uuid] = Object.assign(
        state.fieldMap[payload.uuid],
        payload
      );

      state.fields = [].concat(state.fields);
    },

    //
    UPDATE_MODEL: (state, payload) => {
      state.model = payload;
    }
  }
};
