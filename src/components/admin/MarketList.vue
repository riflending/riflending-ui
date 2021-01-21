<template>
  <div class="market-list">
    <v-list>
      <v-list-item>
        <v-row>
          <v-col>
            <v-list-item-subtitle class="listTitle">Market</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">Price</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">APR</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle" title="Loan to Value">LTV</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">Supply APY</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">Interest debt</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">Total Supplied</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">Total Borrowed</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">Current Cash</v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider />
      <MarketItem v-for="(market, idx) in markets" :key="`market-${idx}`" :market="market" />
    </v-list>
  </div>
</template>

<script>
import MarketItem from '@/components/admin/MarketItem.vue'

export default {
  name: 'MarketList',
  components: {
    MarketItem,
  },
  data() {
    return {
      markets: [],
    }
  },
  async created() {
    this.markets = await this.$middleware.getMarkets(this.account)
  },
  methods: {
    reloadItems() {
      this.$emit('reload')
    },
  },
}
</script>
