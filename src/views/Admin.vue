<template>
  <div class="admin">
    <v-row class="d-flex justify-center">
      <h1>Market Status</h1>
    </v-row>
    <div class="d-flex justify-center">
      <v-card flat width="1250" class="list">
        <MarketList />
      </v-card>
    </div>
  </div>
</template>

<script>
import MarketList from '@/components/admin/MarketList.vue'

export default {
  name: 'Admin',
  components: {
    MarketList,
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    dataObject() {
      return {
        flag: this.dialog,
      }
    },
  },
}
</script>
