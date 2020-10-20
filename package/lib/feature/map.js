import { getMapDefault } from "../../utils/helpers";

const store = new Map();

export const getFeature = (type, storeDefault = new Map()) => {
  return getMapDefault(store, type, storeDefault);
};

export default store;
