<template>
  <v-app light class="index">
    <AppBar />
    <v-main>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/components/layouts/base/AppBar.vue'

import { mapGetters } from 'vuex'
import * as constants from '@/store/constants'

export default {
  name: 'BaseLayout',
  components: {
    AppBar,
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
