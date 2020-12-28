<template>
  <v-card width="50%" flat>
    <v-list>
      <v-list-item>
        <v-row>
          <v-col cols="2">
            <v-list-item-subtitle class="listTitle">Market</v-list-item-subtitle>
          </v-col>
          <v-col cols="3">
            <v-list-item-subtitle class="listTitle">Price</v-list-item-subtitle>
          </v-col>
          <v-col cols="2">
            <v-list-item-subtitle class="listTitle">APR</v-list-item-subtitle>
          </v-col>
          <v-col cols="3">
            <v-list-item-subtitle class="listTitle">Supplied</v-list-item-subtitle>
          </v-col>
          <v-col cols="2">
            <v-list-item-subtitle class="listTitle">Collateral</v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider />
      <SupplyItem
        v-for="(market, idx) in markets"
        :key="`market-${idx}`"
        :market="market"
        @dialogClosed="reset"
      />
    </v-list>
  </v-card>
  <template v-if="waiting">

  </template>
</template>

<script>
import { mapState } from 'vuex'
import SupplyItem from '@/components/supply/SupplyItem.vue'
import WaitingDialog from '@/components/dialog/WaitingDialog.vue'

export default {
  name: 'SupplyList',
  components: {
    SupplyItem,
    WaitingDialog,
  },
  data() {
    return {
      markets: [],
      succeed: false,
      waiting: false,
      error: false,
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
  },
  created() {
    // get all markets
    this.markets = this.$middleware.getMarkets(this.account)

    this.markets.forEach((market) =>
      market.eventualEvents.then((events) => events.liquidateBorrow().on('data', this.reloadItems)),
    )
  },
  methods: {
    reset() {
      this.$emit('listChange')
    },
    reloadItems() {
      this.$emit('reload')
    },
  },
}
</script>
