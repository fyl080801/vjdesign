import { guid2 } from "../utils/helpers";
import { eachTree } from "../utils/tree";
// import { merge } from "lodash-es";
// import { cloneDeep } from "lodash-es";

export default {
  namespaced: true,
  state: {
    fields: [],
    datasource: {},
    inits: {},
    watchs: {},
    schema: {}
  },
  mutations: {
    ADD_ROOT: (state, payload) => {
      if (!Array.isArray(payload) || payload.length <= 0) {
        return;
      }
      state.fields = [{ uuid: guid2(), ...payload[0] }];
    },
    FIELD_CHILDREN_CHANGED: (state, payload) => {
      state.fields.forEach(item => {
        eachTree(item, node => {
          const action = payload.find(p => p.uuid === node.uuid);

          if (!action) {
            return true;
          }

          const result = action.value.map(item =>
            item.component !== undefined
              ? item
              : {
                  uuid: guid2(),
                  component: item.tag
                }
          );

          node.children = [...result];
        });
      });

      state.fields = [...state.fields];
    }
  }
};
