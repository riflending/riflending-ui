<template class="index">
  <v-app light>
    <AppBar />
    <v-main>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-main>
    <Footing></Footing>
  </v-app>
</template>

<script>
import AppBar from '@/components/layouts/base/AppBar.vue'
import Footing from '@/components/layouts/base/Footing.vue'

import { mapGetters } from 'vuex'
import * as constants from '@/store/constants'

export default {
  name: 'BaseLayout',
  components: {
    AppBar,
    Footing,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      isLogged: constants.SESSION_IS_LOGGED,
    }),
  },
}
</script>
