<template>
  <v-dialog v-model="flag" width="800">
    <v-card v-click-outside="onClickOutside" class="market-dialog dialog container">
      <div class="container">
        <v-row class="ma-0 d-flex align-center">
          <v-col cols="1" class="d-flex justify-center">
            <v-img class="ml-5" :src="require(`@/assets/tokens/${data.token.logo}.png`)" />
          </v-col>
          <v-col cols="2">
            <v-row class="ml-5 item d-flex justify-start">
              <h1 class="ma-0">{{ data.token.symbol }}</h1>
            </v-row>
            <v-row class="ml-5 d-flex justify-start">
              <a class="listTitle" target="_blank" :href="rskExplorerUrl">
                {{ data.token.symbol }} Addr
              </a>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-row>
              <h2>price:</h2>
            </v-row>
            <v-row class="item d-flex justify-start">
              <span>{{ price | formatPrice }}</span
              ><span class="ml-2 itemInfo">usd</span>
            </v-row>
          </v-col>
          <!-- <v-col cols="2" >
            <v-row>
              <h2>APR:</h2>
            </v-row>
            <v-row class="item d-flex justify-start"> {{ apr | formatPercentage }} </v-row>
          </v-col> -->
          <v-col />
          <v-col cols="2" class="mr-1">
            <v-row class="ma-0 pr-1 d-flex justify-start">
              <h2 class="grayish">APR:</h2>
            </v-row>
            <v-row class="item d-flex justify-start"> {{ apr | formatPercentage }} </v-row>
          </v-col>
          <!-- <v-col cols="2" class="mr-1">
            <v-row class="ma-0 pr-1 d-flex justify-end">
              <h2 class="grayish">Price 24hs:</h2>
            </v-row>
            <v-row class="grayish item d-flex justify-end mr-1">
              {{ priceChange | formatPercentage }}
            </v-row>
          </v-col> -->
        </v-row>
      </div>
      <div class="container">
        <v-row class="ma-2 d-flex align-center">
          <v-col cols="3">
            <h3>Total cash</h3>
          </v-col>
          <v-col cols="2" class="item">
            <span>{{ updatedTotalReserves | formatToken(data.token.decimals) }} </span>
          </v-col>
          <v-col cols="0">
            <span class="ml-2 itemInfo">{{ data.token.symbol }}</span>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <h3>Reserve Factor</h3>
          </v-col>
          <v-col cols="2" class="item">
            <span>{{ reserveFactor | formatPercentage }} </span>
          </v-col>
        </v-row>

        <v-row class="ma-2 d-flex align-center">
          <v-col cols="3">
            <h3>Total borrow</h3>
          </v-col>
          <v-col cols="2" class="item">
            <span>{{ updatedTotalBorrow | formatToken(data.token.decimals) }}</span>
          </v-col>
          <v-col cols="0">
            <span class="ml-2 itemInfo">{{ data.token.symbol }}</span>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <h3>Est. Borrow interest (year)</h3>
          </v-col>
          <v-col cols="2" class="item">
            <span>{{ borrowAPR | formatPercentage }} </span>
          </v-col>
        </v-row>

        <v-row class="ma-2 d-flex align-center">
          <v-col cols="3">
            <h3>Total Supplied</h3>
          </v-col>
          <v-col cols="2" class="item">
            <span>{{ updatedTotalSupply | formatToken(data.token.decimals) }}</span>
          </v-col>
          <v-col cols="0">
            <span class="ml-2 itemInfo">{{ data.token.symbol }}</span>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <h3>Est. Supply interest (year)</h3>
          </v-col>
          <v-col cols="2" class="item">
            <span>{{ supplyAPR | formatPercentage }} </span>
          </v-col>
        </v-row>

        <v-row class="ma-2 d-flex align-center">
          <v-col cols="3">
            <h3>Supply-Borrowed ratio</h3>
          </v-col>
          <v-col cols="2" class="item">
            <span>{{ supBorRatio | formatPercentage }} </span>
          </v-col>
          <v-col cols="2" />
          <v-col cols="3" class="d-flex align-center">
            <h3>Collateral Factor (LTV)</h3>
          </v-col>
          <v-col cols="2" class="item">
            <span>{{ collFact | formatPercentage }} </span>
          </v-col>
        </v-row>

        <v-row class="ma-2 d-flex align-center">
          <v-col cols="3">
            <h3>Market Liquidity</h3>
          </v-col>
          <v-col cols="2" class="item">
            <span>{{ mktLiqu | formatPrice }} </span>
          </v-col>
          <v-col cols="2" />
          <v-col cols="3" class="d-flex align-center">
            <h3>Liquidation Incentive</h3>
          </v-col>
          <v-col cols="2" class="item">
            <span>{{ liqPen | formatPercentage }} </span>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <template v-if="priceFlag">
      <MarketPriceDialog :data="dataObject" @closed="reset" />
    </template>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import MarketPriceDialog from '@/components/dialog/market/MarketPriceDialog.vue'
import { ethers } from 'ethers'

export default {
  name: 'MarketDialog',
  components: {
    MarketPriceDialog,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      flag: this.data.flag,
      borrowRate: 0,
      baseBorrowRate: 0,
      price: 0,
      updatedTotalSupply: 0, // sum of supply in this market
      updatedTotalBorrow: 0, // sum of borrowed in this market
      updatedTotalReserves: 0, // sum of reserves in this market
      supplyAPR: 0, // the supply apr
      borrowAPR: 0, // the borrow apr
      supBorRatio: 0, // the sup/borr ratio
      collFact: 0, // the collateral factor
      reserveFactor: 0, //reserveFactorMantissa
      liqThr: 0, // the liquidation factor
      liqPen: 0, // the liquidation penalty
      priceChange: 0, // the price change in the last 24hs
      mktLiqu: 0, // market liquidity in usd
      cash: 0,
      growth: 0,
      tokenAddress: 0,
      priceFlag: false,
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    apr() {
      return this.borrowRate.toFixed(2)
    },
    rskExplorerUrl() {
      return `https://explorer.testnet.rsk.co/address/${this.tokenAddress}`
    },
    dataObject() {
      return {
        flag: this.priceFlag,
        market: this.data.market,
        token: this.data.token,
      }
    },
  },
  async created() {
    this.price = await this.data.market.getPriceInDecimals()
    this.updatedTotalSupply = this.data.market.totalSupply
    this.updatedTotalBorrow = this.data.market.totalBorrows
    this.updatedTotalReserves = this.data.market.totalCash
    this.supBorRatio =
      this.updatedTotalSupply != 0
        ? Number(this.updatedTotalBorrow) / Number(this.updatedTotalSupply)
        : 0
    this.reserveFactor = ethers.utils.formatUnits(
      this.data.market.reserveFactorMantissa.mul(100),
      this.data.market.token.decimals,
    )
    this.supplyAPR = this.data.market.supplyApy
    this.borrowAPR = this.data.market.borrowApy
    this.borrowRate = await this.data.market.getBorrowRate()
    this.collFact = ethers.utils.formatUnits(
      this.data.market.loanToValue.mul(100),
      this.data.market.token.decimals,
    )
    this.liqPen = await this.data.market.getLiquidationIncentiveMantissa()
    this.mktLiqu = this.price * (this.updatedTotalReserves / 1e18)

    this.reset()
  },
  methods: {
    onClickOutside() {
      if (!this.priceFlag) {
        this.flag = false
        this.$emit('closed')
      }
    },
    reset() {
      this.priceFlag = false
      // this.data.market
      //   .getPrice(this.data.market.address)
      //   .then((marketPrice) => {
      //     this.price = marketPrice
      //     return this.data.market.eventualBorrowRate
      //   })
      //   .then((borrowRate) => {
      //     this.borrowRate = borrowRate
      //     return this.data.market.eventualBaseBorrowRate
      //   })
      //   .then((baseBorrowRate) => {
      //     this.baseBorrowRate = baseBorrowRate
      //     return this.data.market.eventualUpdatedTotalSupply
      //   })
      //   .then((updatedTotalSupply) => {
      //     this.updatedTotalSupply = updatedTotalSupply
      //     return this.data.market.eventualUpdatedTotalBorrows
      //   })
      //   .then((updatedTotalBorrows) => {
      //     this.updatedTotalBorrow = updatedTotalBorrows
      //     return this.data.market.getCash()
      //   })
      //   .then((cash) => {
      //     this.cash = cash
      //     this.growth = (this.borrowRate - this.baseBorrowRate).toFixed(2)
      //   })
    },
  },
}
</script>
