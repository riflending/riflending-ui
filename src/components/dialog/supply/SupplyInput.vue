<template>
  <div class="supply-input">
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
            type="text"
            required
            :rules="[rules.required, rules.decimals, rules.minBalance]"
          />
        </v-col>
        <v-col cols="2">
          <v-btn
            class="mb-12"
            text
            color="#008CFF"
            :disabled="!maxBorrowAllowed"
            @click="maxAmount = true"
            >max</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="ma-0 my-5 d-flex justify-center">
        <p class="buyMoreTokens">
          Would you like to
          <a target="_blank" href="https://app.rskswap.com/">buy more tokens?</a>
        </p>
      </v-row>
      <div class="my-5 py-5">
        <v-row class="d-flex align-center">
          <v-col cols="2" />
          <v-col cols="3" class="d-flex justify-end">
            <h3>apr:</h3>
          </v-col>
          <v-col cols="4">
            <v-col cols="7" class="d-flex justify-center">
              <h1>{{ apr }}%</h1>
            </v-col>
            <v-col cols="5" />
          </v-col>
          <v-col cols="1" />
          <v-col cols="2" />
        </v-row>
        <v-row class="d-flex align-center">
          <v-col cols="2" />
          <v-col cols="3" class="d-flex justify-end">
            <h3>supply balance:</h3>
          </v-col>
          <v-col cols="4">
            <v-row class="ma-0 d-flex align-center">
              <v-col cols="7" class="d-flex justify-center">
                <h1 :title="[`Balance ${tokenBalance} ${data.token.symbol}`]">
                  {{ tokenBalance | formatNumber }}
                </h1>
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
                <h1>
                  {{ maxBorrowAllowed | formatNumber }}
                </h1>
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
        <v-btn
          v-if="needApproval"
          class="button"
          rounded
          color="#00A24D"
          :disabled="!validForm"
          @click="approve"
        >
          Approve
        </v-btn>
        <v-btn v-else class="button" rounded color="#008CFF" :disabled="!validForm" @click="supply">
          Supply tokens
        </v-btn>
      </v-row>
    </template>
    <template v-else-if="!approveDialog">
      <Loader />
    </template>
    <template v-else>
      <Approve dialog-father-name="Supply" @backToMainDialog="closeTemplateApprove" />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/common/Loader.vue'
import Approve from '@/components/common/Approve.vue'

export default {
  name: 'SupplyInput',
  components: {
    Loader,
    Approve,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      waiting: false,
      maxAmount: false,
      price: 0,
      amount: '0',
      maxAmountBalanceAllowed: 0,
      supplyOf: 0,
      borrowRate: 0,
      liquidity: 0,
      cash: 0,
      maxBorrowAllowed: 0,
      supplyBalanceInfo: null,
      borrowLimitInfo: null,
      tokenBalance: 0,
      collateralFactor: 0,
      mantissa: 0,
      needApproval: true,
      approveDialog: false,
      rules: {
        required: () => (!!Number(this.amount) && Math.sign(this.amount) == 1) || 'Required.',
        decimals: () =>
          this.decimalPositions ||
          `Maximum ${this.data.token.decimals} decimal places for ${this.data.token.symbol}.`,
        minBalance: () =>
          // TODO see if the tokenBalance is the balance of account or the balance of the account in the protocol
          // this.tokenBalance >= Number(this.contractAmount) ||
          // "Not enough funds",
          this.maxAmountBalanceAllowed >= Number(this.amount) || 'Not enough funds',
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
    balanceAsDouble() {
      return this.asDouble(this.tokenBalance)
    },
    contractAmount() {
      return Number(this.amount).toFixed(this.data.token.decimals).replace('.', '')
    },
    validForm() {
      return (
        typeof this.rules.minBalance() !== 'string' &&
        typeof this.rules.required() !== 'string' &&
        typeof this.rules.decimals() !== 'string'
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
      if (this.maxAmount && this.amount !== this.maxAmountBalanceAllowed) this.maxAmount = false
      if (this.amount === this.maxAmountBalanceAllowed) this.maxAmount = true
    },
    maxAmount() {
      if (this.maxAmount) this.amount = this.maxAmountBalanceAllowed
      if (!this.maxAmount && this.amount === this.maxAmountBalanceAllowed) this.amount = null
    },
  },
  created() {
    this.data.market
      .isAllowance(this.account)
      .then((allow) => {
        this.needApproval = !allow
        return this.$middleware.getAccountLiquidity(this.account)
      })
      .then(({ accountLiquidityInExcess }) => {
        this.liquidity = Number(accountLiquidityInExcess)
        return this.data.market.getCash()
      })
      .then((cash) => {
        this.cash = cash
        return this.data.market.getBorrowRate()
      })
      .then((borrowRate) => {
        this.borrowRate = borrowRate
        return this.data.market.getPriceInDecimals()
      })
      .then((price) => {
        this.price = price
        return this.data.market.getUserBalanceOfUnderlying()
      })
      .then((tokenBalance) => {
        this.tokenBalance = tokenBalance
        this.supplyOf = tokenBalance
        return this.data.market.getMaxBorrowAllowed(this.account)
      })
      .then((maxBorrowAllowed) => {
        this.maxBorrowAllowed = maxBorrowAllowed
        const internalAddressOfToken = this.data.market.token?.address
        return internalAddressOfToken
          ? this.$middleware.getWalletAccountBalance(this.account, this.data.market.token?.address)
          : this.$middleware.getWalletAccountBalanceForRBTC(this.account)
      })
      .then((balanceOfToken) => {
        this.maxAmountBalanceAllowed = balanceOfToken
        return this.data.market.getCurrentExchangeRate()
      })
      .then((mantissa) => {
        this.mantissa = mantissa
        return this.data.market.getCollateralFactorMantissa()
      })
      .then((collateralFactor) => {
        this.collateralFactor = collateralFactor
      })
  },
  methods: {
    closeTemplateApprove() {
      this.waiting = false
      this.approveDialog = false
      this.$emit('approve')
    },
    approve() {
      this.waiting = true
      this.$emit('wait')
      this.data.market
        .approveWithMaxUint()
        .then(() => {
          this.approveDialog = true
          this.needApproval = false
        })
        .catch((error) => {
          this.waiting = false
          const userError = typeof error === 'string' ? error : error.message || ''
          this.$emit('error', { userErrorMessage: userError })
        })
    },
    supply() {
      this.waiting = true
      this.$emit('wait')
      this.data.market
        .supply(this.amount)
        .then((res) => {
          this.waiting = false
          this.$emit('succeed', {
            hash: res.transactionHash,
            borrowLimitInfo: this.borrowLimitInfo,
            supplyBalanceInfo: Number(this.amount),
          })
        })
        .catch((error) => {
          this.waiting = false
          console.error('ERROR supply()', error)
          const userError = typeof error === 'string' ? error : error.message || ''
          this.$emit('error', { userErrorMessage: userError })
        })
    },
    asDouble(value) {
      return (Number(value) / 10 ** this.data.token.decimals).toFixed(this.data.token.decimals)
    },
    async getValues() {
      // TODO check oldLiquidity usage here
      // eslint-disable-next-line no-unused-vars
      let oldLiquidity
      let oldCash
      await this.$middleware
        .getAccountLiquidity(this.account)
        .then(({ accountLiquidityInExcess }) => {
          oldLiquidity = accountLiquidityInExcess
          return this.data.market.getUserBalanceOfUnderlying()
        })
        .then((balance) => {
          this.supplyOf = balance + Number(this.contractAmount)
          return this.data.market.getCash()
        })
        .then((cash) => {
          oldCash = cash
          this.cash = oldCash + Number(this.contractAmount)
          return this.data.market.getBorrowRate()
        })
    },
  },
}
</script>
