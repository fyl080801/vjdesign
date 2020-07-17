// import Vue from "vue";
import { guid2 } from "../utils/helpers";
import { eachTreeNodes } from "../utils/tree";
import { set } from "lodash-es";

export default {
  namespaced: true,
  state: {
    value: {
      fields: [],
      datasource: {},
      listeners: [],
      schema: {}
    },
    //
    editing: null,
    fieldMap: {},
    model: {}
  },
  mutations: {
    //
    CREATEED: (state, payload = {}) => {
      state.value = {
        ...state.value,
        ...payload
      };
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

      state.value.fields = [newItem];

      // 同步
      eachTreeNodes(state.value.fields, node => {
        state.fieldMap[node.uuid] = node;
      });
    },
    // 添加或更新
    FIELD_CHILDREN_CHANGED: (state, payload) => {
      eachTreeNodes(state.value.fields, node => {
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

      state.value.fields = [].concat(state.value.fields);

      // 同步map
      state.fieldMap = {};
      eachTreeNodes(state.value.fields, node => {
        state.fieldMap[node.uuid] = node;
      });
    },
    // 删除
    DELETE_FIELD: (state, payload) => {
      let isdelete = null;

      // 先看根级元素
      const deleteIndex = state.value.fields.findIndex(
        item => item.uuid === payload.uuid
      );

      if (deleteIndex >= 0) {
        isdelete = state.value.fields[deleteIndex].uuid;
        state.value.fields.splice(deleteIndex, 1);
      } else {
        eachTreeNodes(state.value.fields, node => {
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
        state.value.fields = [].concat(state.value.fields);
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

      //
      state.value.fields = [].concat(state.value.fields);
    },
    REFRESH_EDITING: state => {
      state.fieldMap = { ...state.fieldMap };
    },

    //
    UPDATE_MODEL: (state, payload) => {
      state.model = payload;
    },

    //
    SET_DATASOURCE: (state, payload) => {
      const { name, value } = payload;
      delete value.name;
      state.value.datasource = { ...state.value.datasource, [name]: value };
    },
    UPDATE_DATASOURCE: (state, payload) => {
      const { name, value } = payload;
      const { name: newName } = value;
      delete state.value.datasource[name];
      delete value.name;
      state.value.datasource = { ...state.value.datasource, [newName]: value };
    },
    REMOVE_DATASOURCE: (state, payload) => {
      const changed = { ...state.value.datasource };
      delete changed[payload];
      state.value.datasource = changed;
    },

    //
    SET_LISTENERS: (state, payload) => {
      const { value } = payload;
      state.value.listeners = [
        ...state.value.listeners,
        { actions: [], ...value }
      ];
    },
    UPDATE_LISTENERS: (state, payload) => {
      const { index, value } = payload;
      Object.keys(value)
        .filter(key => key !== "actions")
        .forEach(key => {
          state.value.listeners[index][key] = value[key];
        });
      state.value.listeners = [...state.value.listeners];
    },
    REMOVE_LISTENERS: (state, payload) => {
      const { index } = payload;
      state.value.listeners.splice(index, 1);
    }
  }
};
