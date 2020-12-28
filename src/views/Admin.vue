<template>
  <div class="admin">
    <v-row class="d-flex justify-center">
      <h1>Add, Edit and Manage your markets</h1>
    </v-row>
    <div class="d-flex justify-center">
      <v-card flat width="950" class="list">
        <v-row class="ma-0 d-flex justify-space-between">
          <v-col class="d-flex align-center">
            <h2>My Markets</h2>
          </v-col>
          <!-- <v-col>
            <v-row class="d-flex align-center justify-end">
              <h3>Add new Market</h3>
              <v-btn class="ml-5" fab dark small color="#008CFF" @click="dialog = !dialog">
                <v-icon>add</v-icon>
              </v-btn>
            </v-row>
          </v-col> -->
        </v-row>
        <MarketList />
      </v-card>
      <!-- <template v-if="dialog">
        <MarketCreateDialog :data="dataObject" @closed="dialog = false" />
      </template> -->
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
