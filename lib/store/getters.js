const getters = {
  form: state => state.form,
  edit: state => state.edit,
  profile: state => state.profile,
  popup: state => state.popup,
  //
  options: state => ({
    design: { registry: state.edit.registry, profile: state.profile }
  })
}

export default getters
