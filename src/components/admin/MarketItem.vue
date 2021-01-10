<template>
  <div class="market-item dialog">
    <v-list-item class="pa-0">
      <v-row class="my-5 mx-0 d-flex align-center">
        <v-col cols="2">
          <v-row class="d-flex align-center">
            <v-col cols="6" class="pa-0 d-flex justify-end">
              <v-list-item-avatar tile size="40">
                <v-img src="../../assets/rif.png" />
              </v-list-item-avatar>
            </v-col>
            <v-col cols="6" class="pa-0 d-flex justify-start">
              <v-list-item-subtitle class="item d-flex justify-start">
                {{ token.symbol }}
              </v-list-item-subtitle>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2">
          <v-list-item-subtitle class="item">
            {{ price | formatPrice }}<span class="ml-2 itemInfo">usd</span>
          </v-list-item-subtitle>
        </v-col>
        <v-col cols="2">
          <v-list-item-subtitle class="item"> {{ apr }}% </v-list-item-subtitle>
        </v-col>
        <v-col cols="2">
          <v-list-item-subtitle class="item">
            {{ totalSupply | formatNumber }}
            <span class="ml-2 itemInfo">{{ token.symbol }}</span>
          </v-list-item-subtitle>
        </v-col>
        <v-col cols="2">
          <v-list-item-subtitle class="item">
            {{ totalBorrows | formatNumber }}
            <span class="ml-2 itemInfo">{{ token.symbol }}</span>
          </v-list-item-subtitle>
        </v-col>
        <v-col cols="2" class="px-0">
          <v-row class="ma-0">
            <v-col cols="10" class="pa-0 d-flex align-center">
              <v-list-item-subtitle class="item">
                {{ cash | formatNumber }}
                <span class="ml-2 itemInfo">{{ token.symbol }}</span>
              </v-list-item-subtitle>
            </v-col>
            <!--TODO: we are going to hide this button for now, we don't know if we will have to use it later-->
            <!--<v-col cols="2" class="pa-0">-->
            <!--<v-btn class="pa-0 ma-0" icon @click="dialog = !dialog">-->
            <!--<svg-->
            <!--width="11"-->
            <!--height="32"-->
            <!--viewBox="0 0 11 32"-->
            <!--fill="none"-->
            <!--xmlns="http://www.w3.org/2000/svg"-->
            <!--&gt;-->
            <!--<path-->
            <!--d="M1 1L9 16L1 31"-->
            <!--stroke="#008CFF"-->
            <!--stroke-width="2"-->
            <!--stroke-linecap="round"-->
            <!--/>-->
            <!--</svg>-->
            <!--</v-btn>-->
            <!--</v-col>-->
          </v-row>
        </v-col>
      </v-row>
    </v-list-item>
    <v-divider />
    <template v-if="dialog">
      <MarketDialog :data="dataObject" @closed="reset" />
    </template>
  </div>
</template>

<script>
import MarketDialog from '@/components/dialog/market/MarketDialog.vue'
import { ethers } from 'ethers'

export default {
  name: 'MarketItem',
  components: {
    MarketDialog,
  },
  props: {
    market: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      token: {
        name: null,
        symbol: null,
        decimals: 0,
      },
      price: 0,
      borrowRate: 0,
      cash: 0, // current contract liquidity
      totalSupply: 0,
      totalBorrows: 0,
      dialog: false,
    }
  },
  computed: {
    apr() {
      // APR represents the annual rate charged for earning or borrowing money
      return this.borrowRate.toFixed(2)
    },
    dataObject() {
      return {
        flag: this.dialog,
        token: this.token,
        market: this.market,
      }
    },
  },
  mounted() {
    this.$parent.$parent.$on('reload', this.reset)
  },
  async created() {
    this.token = this.market.token
    this.price = await this.market.getPriceInDecimals()
    this.borrowRate = await this.market.getBorrowRate()
    this.cash = ethers.utils.formatEther(this.market.totalCash)
    this.totalSupply = this.market.getTotalSupply()
    this.totalBorrows = ethers.utils.formatEther(this.market.totalBorrows)
  },
  methods: {
    reset() {
      this.dialog = false
      this.market
        .getPriceInDecimals()
        .then((marketPrice) => {
          this.price = marketPrice
          return this.market.getBorrowRate()
        })
        .then((borrowRate) => {
          this.borrowRate = borrowRate
          return ethers.utils.formatEther(this.market.totalCash)
        })
        .then((cash) => {
          this.cash = cash
          return this.market.eventualUpdatedTotalSupply
        })
        .then((updatedTotalSupply) => {
          this.totalSupply = updatedTotalSupply
          return this.market.eventualUpdatedTotalBorrows
        })
        .then((updatedTotalBorrows) => {
          this.totalBorrows = updatedTotalBorrows
        })
      this.$emit('dialogClosed')
    },
  },
}
</script>
