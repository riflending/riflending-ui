<template>
  <div class="repay-input">
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
              rules.debtExists,
              rules.notBiggerThanDebt,
              rules.hasEnoughTokens,
            ]"
          />
        </v-col>
        <v-col cols="2">
          <v-btn
            class="mb-12"
            text
            color="#008CFF"
            :disabled="!maxRepayAllowed"
            @click="maxAmount = true"
            >max</v-btn
          >
        </v-col>
      </v-row>
      <div class="my-5 py-5">
        <v-row class="d-flex align-center">
          <v-col cols="2" />
          <v-col cols="3" class="d-flex justify-end">
            <h3>health factor:</h3>
          </v-col>
          <v-col cols="4">
            <v-row class="ma-0 d-flex align-center">
              <v-col cols="7" class="d-flex justify-center">
                <h1>{{ healthFactor }}%</h1>
              </v-col>
              <v-col cols="5" />
            </v-row>
          </v-col>
          <v-col cols="1" />
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
        <v-btn v-else class="button" rounded color="#008CFF" :disabled="!validForm" @click="repay">
          Repay tokens
        </v-btn>
      </v-row>
    </template>
    <template v-else-if="!approveDialog">
      <Loader />
    </template>
    <template v-else>
      <Approve dialog-father-name="Repay" @backToMainDialog="closeTemplateApprove" />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/common/Loader.vue'
import Approve from '@/components/common/Approve.vue'
import { ethers } from 'ethers'

export default {
  name: 'RepayInput',
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
      oldBorrowBy: 0,
      borrowBy: 0,
      borrowRate: 0,
      liquidity: 0,
      cash: 0,
      maxRepayAllowed: 0,
      maxBorrowAllowed: 0,
      borrowBalanceInfo: null,
      borrowLimitInfo: null,
      tokenBalance: 0,
      accountHealth: 0,
      maxAmountBalanceAllowed: 0,
      needApproval: true,
      approveDialog: false,
      rules: {
        required: () => !!Number(this.amount) || 'Required.',
        decimals: () =>
          this.decimalPositions ||
          `Maximum ${this.data.token.decimals} decimal places for ${this.data.token.symbol}.`,
        debtExists: () =>
          (this.maxRepayAllowed > 0 && !!this.contractAmount) ||
          'You do not have a debt on this market.',
        hasEnoughTokens: () =>
          this.maxAmountBalanceAllowed >= Number(this.amount) ||
          `You do not have enough ${this.data.token.symbol}`,
        notBiggerThanDebt: () =>
          this.maxRepayAllowed >= Number(this.amount) || 'You do not owe that much.',
      },
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    healthFactor() {
      return this.accountHealth >= 1 ? 100 : (this.accountHealth * 100).toFixed(2)
    },
    borrowed() {
      return this.asDouble(this.borrowBy)
    },
    balanceAsDouble() {
      return this.asDouble(this.tokenBalance)
    },
    maxBorrowAllowedAsDouble() {
      return this.asDouble(this.maxBorrowAllowed)
    },
    contractAmount() {
      return Number(this.amount).toFixed(this.data.token.decimals).replace('.', '')
    },
    validForm() {
      return (
        typeof this.rules.required() !== 'string' &&
        typeof this.rules.decimals() !== 'string' &&
        typeof this.rules.debtExists() !== 'string' &&
        typeof this.rules.hasEnoughTokens() !== 'string' &&
        typeof this.rules.notBiggerThanDebt() !== 'string'
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
      if (this.maxAmount && this.amount !== this.maxRepayAllowed) this.maxAmount = false
      if (this.amount === this.maxRepayAllowed) this.maxAmount = true
    },
    maxAmount() {
      if (this.maxAmount) {
        //maxRepayAllowed <= maxAmountBalanceAllowed
        if (
          ethers.utils
            .parseUnits(this.maxRepayAllowed, this.data.market.token.decimals)
            .lte(
              ethers.utils.parseUnits(
                this.maxAmountBalanceAllowed,
                this.data.market.token.decimals,
              ),
            )
        ) {
          this.amount = this.maxRepayAllowed
        } else this.amount = this.maxAmountBalanceAllowed
      }
      if (!this.maxAmount && this.amount === this.maxRepayAllowed) this.amount = null
    },
  },
  created() {
    this.data.market
      .isAllowance(this.account)
      .then((allow) => {
        this.needApproval = !allow
        // gets liquidity
        return this.$middleware.getAccountLiquidity(this.account)
      })
      .then(({ accountLiquidityInExcess }) => {
        this.liquidity = accountLiquidityInExcess
        return this.data.market.getCash()
      })
      // gets borrowRate
      .then((cash) => {
        this.cash = cash
        return this.data.market.getBorrowRate()
      })
      // gets marketPrice
      .then((borrowRate) => {
        this.borrowRate = borrowRate
        return this.data.market.getPriceInDecimals()
      })
      // gets token balance
      .then((price) => {
        this.price = price
        return this.data.market.getUserBalanceOfUnderlying()
      })
      // sets account balance and health
      .then((tokenBalance) => {
        this.tokenBalance = tokenBalance
        this.supplyValue = tokenBalance
        return this.data.market.getMaxBorrowAllowed(this.account)
      })
      .then((maxBorrowAllowed) => {
        this.maxBorrowAllowed = maxBorrowAllowed
        return this.$middleware.getAccountHealth(this.account)
      })
      // sets health
      .then((health) => {
        this.accountHealth = health
        return this.data.market.borrowBalanceCurrent(this.account)
      })
      .then((borrowBy) => {
        this.maxRepayAllowed = ethers.utils.formatEther(borrowBy)
        this.borrowBy = Number(borrowBy)
        this.oldBorrowBy = Number(borrowBy)
        return !this.data.market.isCRBTC
          ? this.$middleware.getWalletAccountBalance(this.account, this.data.market.token?.address)
          : this.$middleware.getWalletAccountBalanceForRBTC(this.account)
      })
      .then((balanceOfToken) => {
        this.maxAmountBalanceAllowed = balanceOfToken
        return this.data.market.getMaxBorrowAllowed(this.account)
      })
      .then((maxBorrowAllowed) => {
        this.maxBorrowAllowed = maxBorrowAllowed
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
    repay() {
      this.waiting = true
      this.$emit('wait')
      this.data.market
        .payBorrow(this.amount)
        .then((res) => {
          this.waiting = false
          this.$emit('succeed', {
            hash: res.transactionHash,
            borrowLimitInfo: this.borrowLimitInfo,
            borrowBalanceInfo: this.borrowBalanceInfo,
          })
        })
        .catch((error) => {
          console.log('ERROR repayBorrow()', error)
          // validate user error message
          const userError = typeof error === 'string' ? error : error.message || ''
          this.$emit('error', {
            userErrorMessage: userError,
          })
          this.waiting = false
        })
    },

    asDouble(value) {
      return (value / 10 ** this.data.token.decimals).toFixed(this.data.token.decimals)
    },

    getValues() {
      console.log('RepayBorrow: getValues')
      // TODO check oldLiquidity usage here
      // eslint-disable-next-line no-unused-vars
      let oldLiquidity
      let oldCash
      this.data.market
        .borrowBalanceCurrent(this.account)
        .then((borrowBy) => {
          if (Number(borrowBy) - Number(this.contractAmount) > 0) {
            this.borrowBy = Number(borrowBy) - Number(this.contractAmount)
          }
        })
        .then(() => this.$middleware.getAccountLiquidity(this.account))
        .then(({ accountLiquidityInExcess }) => {
          oldLiquidity = accountLiquidityInExcess
          return this.data.market.getCash()
        })
        .then((cash) => {
          oldCash = cash
          this.cash = oldCash + Number(this.contractAmount)
          return this.data.market.getBorrowRate()
        })

      this.supplyBalanceInfo = Number(this.amount)
      this.borrowBalanceInfo = Number(this.contractAmount)

      console.log('RepayBorrow: this.supplyBalanceInfo', this.supplyBalanceInfo)
    },
  },
}
</script>
