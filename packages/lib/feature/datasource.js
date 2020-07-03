export default store => {
  return (type, description, options = []) => {
    const component = {
      description,
      options
    };

    store.set(type, component);
  };
};
