<template>
  <div>
    <DocsNav />
    <v-container>
      <v-row class="d-flex align-center justify-Left">
        <v-col cols="12">
          <center>
            If the website doesn't redirect you automatically, You can find the rLending Whitepaper
            v1.0 <a href="http://github.com/">here</a>
          </center>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DocsNav from '@/components/layouts/base/DocsNav.vue'

export default {
  name: 'Whitepaper',
  components: {
    DocsNav,
  },
  created() {
    window.location.href = 'https://github.com/riflending/rlending-ui/tree/dev/whitepaper'
  },
}
</script>
