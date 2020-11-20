import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['demo'])
  },
  methods: {
    async load(profilePath, valuePath) {
      this.$store.dispatch('demo/setData', {
        value: {
          fields: [],
          datasource: {},
          listeners: []
        },
        profile: {}
      })

      const profile = await fetch(profilePath, { method: 'GET' })
      const config = await fetch(valuePath, { method: 'GET' })

      this.$store.dispatch('demo/setData', {
        value: await config.json(),
        profile: await profile.json()
      })
    }
  }
}
