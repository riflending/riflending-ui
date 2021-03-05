<template>
  <v-app light class="index">
    <AppBar />
    <v-main class="main-min-height">
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
