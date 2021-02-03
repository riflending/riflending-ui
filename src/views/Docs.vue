<template>
  <div class="admin">
    <v-row class="d-flex justify-center">
      <h1>Market Status</h1>
    </v-row>
    <div class="d-flex justify-center">
      <v-card flat width="1250" class="list">
        <v-row class="ma-0 d-flex justify-space-between">
          <v-col class="d-flex align-center">
            <h2>Listed Markets</h2>
          </v-col>
        </v-row>
        <Introduction />
        <KeyConcepts />
      </v-card>
    </div>
  </div>
</template>

<script>
import Introduction from '@/components/docs/1-introduction.vue'
import KeyConcepts from '@/components/docs/2-keyConcepts.vue'

export default {
  name: 'Docs',
  components: {
    Introduction,
    KeyConcepts,
  },
}
</script>
