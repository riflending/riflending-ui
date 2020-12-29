<template>
  <div class="borrow-input">
    <template v-if="!waiting">
      <v-row class="inputBox">
        <v-col cols="10">
          <v-text-field
            v-model="amount"
            class="inputText"
            full-width
            single-line
            solo
            flat
            type="number"
            required
            :rules="[
              rules.required,
              rules.decimals,
              rules.marketCash,
              rules.liquidity,
              rules.allowed,
            ]"
          />
        </v-col>
        <v-col cols="2">
          <v-btn
            class="mb-12"
            text
            color="#008CFF"
            :disabled="!oldMaxBorrowAllowed"
            @click="maxAmount = true"
            >max</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="ma-0 my-5 d-flex justify-center">
        <p class="buyMoreTokens">
          Would you like to <a target="_blank" href="https://app.rskswap.com/">buy more tokens</a>
        </p>
      </v-row>
      <div class="my-5 py-5">
        <v-row class="d-flex align-center">
          <v-col cols="2" />
          <v-col cols="3" class="d-flex justify-end">
            <h3>Contract liquidity:</h3>
          </v-col>
          <v-col cols="4">
            <v-row class="ma-0 d-flex align-center">
              <v-col cols="7" class="d-flex justify-center">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <h1 v-bind="attrs" v-on="on">{{ cash | formatToken(data.token.decimals) }}</h1>
                  </template>
                  <span>{{ cash | formatToken(data.token.decimals) }}</span>
                </v-tooltip>
              </v-col>
              <v-col cols="5" />
            </v-row>
          </v-col>
          <v-col cols="1">
            <span class="itemInfo">{{ data.token.symbol }}</span>
          </v-col>
          <v-col cols="2" />
        </v-row>
        <v-row class="d-flex align-center">
          <v-col cols="2" />
          <v-col cols="3" class="d-flex justify-end">
            <h3>borrow balance:</h3>
          </v-col>
          <v-col cols="4">
            <v-row class="ma-0 d-flex align-center">
              <v-col cols="7" class="d-flex justify-center">
                <h1>{{ borrowBy | formatToken(data.token.decimals) }}</h1>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1">
            <span class="itemInfo">{{ data.token.symbol }}</span>
          </v-col>
          <v-col cols="2" />
        </v-row>
        <v-row class="d-flex align-center">
          <v-col cols="2" />
          <v-col cols="3" class="d-flex align-end justify-end">
            <h3>borrow limit:</h3>
          </v-col>
          <v-col cols="4">
            <v-row class="ma-0 d-flex align-center">
              <v-col cols="7" class="d-flex justify-center">
                <h1>{{ maxBorrowAllowed | formatNumber }}</h1>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1">
            <span class="itemInfo">{{ data.token.symbol }}</span>
          </v-col>
          <v-col cols="2" />
        </v-row>
      </div>
      <v-row class="my-5 d-flex justify-center">
        <v-btn class="button" rounded color="#008CFF" :disabled="!validForm" @click="borrow">
          Borrow tokens
        </v-btn>
      </v-row>
    </template>
    <template v-else>
      <Loader />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/common/Loader.vue'

export default {
  name: 'BorrowInput',
  components: {
    Loader,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      waiting: false, // ???
      maxAmount: false, // ??? if MAX button was clicked
      price: 0,
      amount: '0', // user generated input
      borrowBy: 0, // borrowBalanceCurrent() The borrowed balance of current acount in this market with accrued interests
      borrowRate: 0,
      liquidity: 0, // users liquid assets in the protocol
      oldLiquidity: 0, // users liquid assets in the protocol
      supplyValue: 0, // user's liquidity in underlying
      usdPrice: 0,
      cash: 0, // current underlying balance stored in contract. AKA "CONTRACT LIQUIDITY"
      oldCash: 0, // balance of ctoken expressed in underlying
      tokenBalance: 0, // getBalanceOfUnderlying(this.account) balance of this account in underlying
      isBorrowAllowed: true, // checks whether or not the Comptroller will allow the borrow
      oldMaxBorrowAllowed: 0,
      maxBorrowAllowed: 0, // BORROW LIMIT getMaxBorrowAllowed() calculates the maximun borrow allowance. User should never borrow close to this amount, otherwise runs risk of getting automatically liquidated
      borrowAllowance: 0,
      borrowBalanceInfo: null,
      borrowLimitInfo: null, // Borrow difference - gray number to be shown to the side
      collateralFactor: 0, // getCollateralFactorMantissa()
      mantissa: 0, // getCurrentExchangeRate() current exchange rate mantissa to convert underlying to ctoken
      rules: {
        required: () => !!Number(this.amount) || 'Required.',
        allowed: () => this.isBorrowAllowed || "Borrow won't be allowed by the protocol", // TODO: currently not being used
        decimals: () =>
          this.decimalPositions ||
          `Maximum ${this.data.token.decimals} decimal places for ${this.data.token.symbol}.`,
        marketCash: () =>
          this.oldCash - Number(this.contractAmount) >= 0 ||
          `This market doesn't have enough ${this.data.token.symbol} liquidity`,
        liquidity: () =>
          Number(this.amount) < this.maxBorrowAllowed ||
          "You don't have enough liquidity, supply more collateral to raise your Borrow Limit.",
        enteredMarket: () => true || '', // TODO: currently not being used
      },
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    apr() {
      return this.borrowRate.toFixed(2)
    },
    contractAmount() {
      return Number(this.amount).toFixed(this.data.token.decimals).replace('.', '')
    },
    validForm() {
      return (
        typeof this.rules.enteredMarket() !== 'string' &&
        typeof this.rules.allowed() !== 'string' &&
        typeof this.rules.liquidity() !== 'string' &&
        typeof this.rules.decimals() !== 'string' &&
        typeof this.rules.required() !== 'string' &&
        typeof this.rules.marketCash() !== 'string'
      )
    },
    hasDecimals() {
      return !!Number(this.data.token.decimals)
    },
    numberOfDecimals() {
      const amount = this.amount.toString()
      return amount.includes('.')
        ? amount.substring(amount.indexOf('.') + 1, amount.length).length <=
            this.data.token.decimals
        : true
    },
    decimalPositions() {
      const amount = this.amount.toString()
      return this.hasDecimals ? this.numberOfDecimals : !amount.includes('.')
    },
  },
  watch: {
    amount() {
      this.getValues()
      if (this.maxAmount && this.amount !== this.oldMaxBorrowAllowed) this.maxAmount = false
      if (this.amount === this.oldMaxBorrowAllowed) {
        this.maxAmount = true
      }
    },
    maxAmount() {
      if (this.maxAmount) this.amount = Math.min(this.oldMaxBorrowAllowed, this.cash / 1e18)
      if (!this.maxAmount && this.amount === this.oldMaxBorrowAllowed) this.amount = null
    },
  },
  created() {
    this.data.market
      .borrowBalanceCurrent(this.account)
      .then((borrowBy) => {
        this.borrowBy = Number(borrowBy)
        return this.$middleware.getAccountLiquidity(this.account)
      })
      .then(({ accountLiquidityInExcess }) => {
        this.oldLiquidity = accountLiquidityInExcess // liquid assets in the protocol
        this.liquidity = accountLiquidityInExcess // liquid assets in the protocol
        return this.data.market.getCash()
      })
      .then((cash) => {
        // the amount of underlying stored in contract AKA "CONTRACT LIQUIDITY"
        this.oldCash = cash // the amount of underlying stored in contract AKA "CONTRACT LIQUIDITY"
        this.cash = cash // the amount of underlying stored in contract AKA "CONTRACT LIQUIDITY"
        return this.data.market.getBorrowRate()
      })
      .then((borrowRate) => {
        // TODO: double check, perhaps this is not being used
        this.borrowRate = borrowRate
        return this.data.market.getPrice(this.data.market.address)
      })
      .then((marketPrice) => {
        this.price = marketPrice
        return this.data.market.getBalanceOfUnderlying(this.account)
      })
      .then((supplyValue) => {
        this.supplyValue = supplyValue
        return this.data.market.getCurrentExchangeRate()
      })
      .then((mantissa) => {
        this.mantissa = mantissa
        return this.data.market.getMaxBorrowAllowed(this.account)
      })
      .then((maxBorrowAllowed) => {
        this.maxBorrowAllowed = maxBorrowAllowed
        this.oldMaxBorrowAllowed = maxBorrowAllowed
        this.borrowAllowance = maxBorrowAllowed
        this.borrowBalanceInfo = Number(this.contractAmount)
      })
  },
  methods: {
    async borrowAllowed() {
      return this.data.market.borrowAllowed(this.amount, this.account).then((allowed) => {
        if (!allowed.allowed) {
          this.isBorrowAllowed = false // if not allowed, sets internal variable to false
          return this.$middleware.getMsjErrorCodeComptroller(allowed.errorCode._hex)
        }
        return ''
      })
    },
    borrow() {
      this.waiting = true
      this.$emit('wait')
      // checks if enteredMarket
      this.data.market
        .validateMarketAccount(this.account, this.data.market.token.symbol)
        .then((ok) => {
          // if not exist => enterMarket
          if (!ok) {
            console.log('BorrowInput: Need to enter market first')
            return this.data.market.addMarket()
          }
          return ok
        })
        // checks if borrowAllowed
        .then(() => this.borrowAllowed())
        .then((allowed) => {
          if (!allowed) {
            this.isBorrowAllowed = true // probably get rid of this variable alltogether.
            console.log('borrow() borrow was allowed. Sending tx...')
            return this.data.market.borrow(this.amount)
          }
          throw allowed
        })
        .then((res) => {
          this.waiting = false
          console.log('BorrowInput() transaction sent: ', res)
          this.$emit('succeed', {
            hash: res.transactionHash,
            borrowLimitInfo: this.borrowLimitInfo,
            borrowBalanceInfo: this.borrowBalanceInfo,
          })
        })
        .catch((error) => {
          console.log('ERROR borrow()', error)
          // validate user error message
          const userError = typeof error === 'string' ? error : error.message || ''
          this.$emit('error', {
            userErrorMessage: userError,
          })
          this.waiting = false
        })
    },
    async getValues() {
      this.data.market
        .borrowBalanceCurrent(this.account)
        .then((borrowBy) => {
          this.borrowBy = Number(borrowBy) + Number(this.contractAmount)
          return this.$middleware.getAccountLiquidity(this.account)
        })
        .then(({ accountLiquidityInExcess }) => {
          this.oldLiquidity = accountLiquidityInExcess // user's liquid assets in the protocol
          return this.data.market.getCash() // gets underlying balance stored in contract
        })
        .then((cash) => {
          this.oldCash = cash // balance of contract underlying AKA "CONTRACT LIQUIDITY"
          this.cash =
            cash - (cash - Number(this.contractAmount) <= 0 ? cash : Number(this.contractAmount))
          return this.data.market.getBalanceOfUnderlying(this.account)
        })
        .then((supplyValue) => {
          this.supplyValue = supplyValue
          const newBorrowValue =
            ((this.borrowBy + Number(this.contractAmount) * this.price) *
              (this.collateralFactor + this.mantissa)) /
            this.mantissa
          const newSupplyValue = supplyValue
          this.liquidity = newBorrowValue < newSupplyValue ? newSupplyValue - newBorrowValue : 0
          return this.data.market.getMaxBorrowAllowed(this.account)
        })
        .then((maxBorrowAllowed) => {
          this.maxBorrowAllowed = maxBorrowAllowed
          this.borrowAllowance = maxBorrowAllowed
          this.borrowBalanceInfo = Number(this.contractAmount)
        })

    },
  },
}
</script>
