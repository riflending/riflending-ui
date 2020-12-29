<template>
  <div>
    <div v-if="hasAccounts" class="liquidate-list">
      <v-row class="d-flex justify-center">
        <h1>Select the collaterals you wish to liquidate:</h1>
      </v-row>
      <div class="container">
        <v-row>
          <v-col class="d-flex justify-center">
            <h2>Address</h2>
          </v-col>
          <v-col class="d-flex justify-center">
            <h2>Collateral to be Liquidated</h2>
          </v-col>
        </v-row>
        <v-row class="ma-0 px-6">
          <v-divider />
        </v-row>
        <v-list v-for="(borrow, idx) in borrows" :key="`liquidate-item-${idx}`" class="mx-6">
          <LiquidateItem
            :borrower="borrow.borrower"
            :max-to-liquidate="borrow.maxToLiquidate"
            :debt="borrow.debt"
            :borrow-market-address="borrow.borrowMarketAddress"
            :collateral="data"
            @selected="accountSelected"
          />
          <v-divider />
        </v-list>
      </div>
    </div>
    <div v-else class="py-6 empty-liquidate">
      <v-row class="my-6 d-flex justify-center">
        <v-icon class="d-flex justify-center" x-large color="#000000"> error_outline </v-icon>
      </v-row>
      <v-row class="ma-6 d-flex justify-center">
        <h1>There are no accounts available to be liquidated</h1>
      </v-row>
      <v-row class="my-6 d-flex justify-center"> Please check later. </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LiquidateItem from '@/components/dialog/liquidate/LiquidateItem.vue'

export default {
  name: 'LiquidateListVue',
  components: {
    LiquidateItem,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      borrows: [],
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    hasAccounts() {
      return this.borrows.length > 0
    },
  },
  created() {
    this.getBorrows()
  },
  methods: {
    accountSelected(accountObject) {
      this.$emit('selected', accountObject)
    },
    getUnhealthyAccounts(market) {
      console.log('LiquidateList: getUnhealthyAccounts', market)
    },
    getBorrows() {
      this.$middleware
        .getMarkets(this.account)
        .then((markets) => markets.filter((market) => market.address !== this.data.market.address))
        .then((markets) => markets.forEach((market) => this.getUnhealthyAccounts(market)))
    },
  },
}
</script>
