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
