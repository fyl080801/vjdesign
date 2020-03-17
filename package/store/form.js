import { guid2 } from "../utils/helpers";
import { eachTreeNodes } from "../utils/tree";
// import { merge } from "lodash-es";
// import { cloneDeep } from "lodash-es";

export default {
  namespaced: true,
  state: {
    fields: [],
    datasource: {},
    inits: {},
    watchs: {},
    schema: {},
    editing: null,
    fieldMap: {}
  },
  mutations: {
    // 添加根元素
    ADD_ROOT: (state, payload) => {
      if (!Array.isArray(payload) || payload.length <= 0) {
        return;
      }
      state.fields = [{ uuid: guid2(), ...payload[0] }];

      // 同步
      eachTreeNodes(state.fields, node => {
        state.fieldMap[node.uuid] = node;
        state.editing = node.uuid;
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
            return {
              uuid: guid2(),
              component: item.tag
            };
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
      var isdelete = false;

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

        node.children.splice(deleteIndex, 1);
        isdelete = true;
        return false;
      });

      if (isdelete) {
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
    }
  }
};
