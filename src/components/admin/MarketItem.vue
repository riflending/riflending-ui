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
            {{ totalBorrow | formatNumber }}
            <span class="ml-2 itemInfo">{{ token.symbol }}</span>
          </v-list-item-subtitle>
        </v-col>
        <v-col cols="2" class="px-0">
          <v-row class="ma-0">
            <v-col cols="10" class="pa-0 d-flex align-center">
              <v-list-item-subtitle class="item">
                {{ cash | formatToken(token.decimals) }}
                <span class="ml-2 itemInfo">{{ token.symbol }}</span>
              </v-list-item-subtitle>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn class="pa-0 ma-0" icon @click="dialog = !dialog">
                <svg
                  width="11"
                  height="32"
                  viewBox="0 0 11 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L9 16L1 31"
                    stroke="#008CFF"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </v-btn>
            </v-col>
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
      totalBorrow: 0,
      dialog: false,
    }
  },
  computed: {
    apr() {
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
  created() {
    console.log('mktItem created')
    this.token = this.market.token
    console.log('mktItem token', this.token)
    // this.market
    //   .borrowBalanceCurrent(this.account)
    //   .then((balance) => {
    //     console.log("mktItem balance",balance)
    //     this.borrowBalance = Number(balance)
    //     return this.market.getPriceInDecimals()
    //   })
    this.market
      .getPriceInDecimals()
      // set price
      .then((price) => {
        console.log('mktItem price', price)
        this.price = price
        return this.market.getBorrowRate()
      })
      // set borrow rate block (APR)
      .then((borrowRatePerBlock) => {
        console.log('mktItem borrowPerBlock', borrowRatePerBlock)
        this.borrowRate = borrowRatePerBlock
        return this.market.getCash()
      })
      // set current market balance
      .then((cash) => {
        console.log('mktItem cash', cash)
        this.cash = cash
        console.log('THIS MARKET', this.market)
        return this.market.getLockedBalance(this.market.instance.address)
      })
      .then((updatedTotalSupply) => {
        console.log('mktItem balanceUnderlying', updatedTotalSupply)
        this.totalSupply = updatedTotalSupply
        return 99.9999
      })
      .then((updatedTotalBorrows) => {
        console.log('mktItem totalBorrow', updatedTotalBorrows)
        this.totalBorrow = updatedTotalBorrows
      })
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
          return this.market.getCash()
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
          this.totalBorrow = updatedTotalBorrows
        })
      this.$emit('dialogClosed')
    },
  },
}
</script>
