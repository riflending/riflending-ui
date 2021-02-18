<template>
  <div class="supply-borrow">
    <h1 class="text-center">Invest Or Borrow In Just A Few Clicks.</h1>
    <v-row class="my-5 d-flex justify-center">
      <div class="healthBorder d-flex justify-center">
        <div class="mx-3">
          Health Factor:
          <span class="ml-2 healthFactor" :style="{ color: healthFactorColor }">
            {{ healthFactor }}%
          </span>
        </div>
      </div>
      <v-tooltip right color="#E5E5E5">
        <template v-slot:activator="{ on, attrs }">
          <v-icon small class="mx-5" v-bind="attrs" v-on="on">info</v-icon>
        </template>
        <div class="tooltip">
          Your Health Factor represents <br />
          the state of your loans.
          <span class="boldie">
            Don't <br />
            let it drop to <span class="redish"> 0% </span></span
          >
          or your <br />
          collateral might be liquidated!
        </div>
      </v-tooltip>
    </v-row>
    <v-row class="d-flex justify-center">
      <div class="toggle my-5">
        <v-btn
          :class="[currentComponent === 'SupplyList' ? 'selected' : 'notSelected']"
          text
          @click="currentComponent = 'SupplyList'"
        >
          <span>Supply</span>
        </v-btn>
        <v-btn
          :class="[currentComponent === 'BorrowList' ? 'selected' : 'notSelected']"
          text
          @click="currentComponent = 'BorrowList'"
        >
          <span>Borrow</span>
        </v-btn>
      </div>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-alert
        border="right"
        colored-border
        type="error"
        elevation="2"
        :value="!hasEnteredToSomeMarket"
      >
        In order to borrow in a market, you must add collateral first. You can do it by clicking on
        the toggle button.
      </v-alert>
    </v-row>
    <v-row class="d-flex justify-center">
      <component :is="currentComponent" @listChange="reset" @launchTx="catchTx" />
    </v-row>
    <v-row class="d-flex justify-center token-bridge-launch">
      <v-banner single-line elevation="0">
        <a target="_blank" :href="getHttpTokenBridge" class="center-content">
          <v-img
            class="token-bridge-launch-logo"
            :src="require(`@/assets/tokenbridge_logo.jpg`)"
            alt="tokenbridge logo"
          />
          {{
            currentComponent == 'SupplyList'
              ? 'Bring your ethereum tokens '
              : 'Cross your tokens to ethereum '
          }}</a
        >
      </v-banner>
    </v-row>
  </div>
</template>

<script>
import SupplyList from '@/components/supply/SupplyList.vue'
import BorrowList from '@/components/borrow/BorrowList.vue'
import { mapState, mapMutations } from 'vuex'
import * as constants from '@/store/constants'

export default {
  name: 'SupplyBorrow',
  components: {
    SupplyList,
    BorrowList,
  },
  data() {
    return {
      accountHealth: 1,
      currentComponent: 'SupplyList',
      hasEnteredToSomeMarket: true,
      transactionHash: null,
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    healthFactor() {
      return this.accountHealth >= 1 ? 100 : (this.accountHealth * 100).toFixed(2)
    },
    healthFactorColor() {
      if (this.accountHealth <= 0.3) return '#EB5757'
      if (this.accountHealth > 0.3 && this.accountHealth <= 0.6) return '#F2994A'
      return '#24BD6B'
    },
    getHttpTokenBridge() {
      return process.env.VUE_APP_HTTP_TOKEN_BRIDGE
    },
  },
  mounted() {
    this.$on('reload', this.reset)
    this.$root.$on('toggleMarketStatusTransaction', this.reset)
  },
  async created() {
    this.accountHealth = await this.$middleware.getAccountHealth(this.account)
    this.hasEnteredToSomeMarket = await this.$middleware.hasEnteredToSomeMarket(this.account)
  },
  methods: {
    async reset() {
      this.accountHealth = await this.$middleware.getAccountHealth(this.account)
      this.hasEnteredToSomeMarket = await this.$middleware.hasEnteredToSomeMarket(this.account)
    },
    catchTx(obj) {
      //validate obj has an action
      if (!obj.action) return
      //send snack
      this.setSnack('WAITING FOR CONFIRMATION')
      //await action tx (sender to wallet)
      obj.action
        .then((transaction) => {
          this.transactionHash = transaction.hash
          //when approve tx send wait snack
          this.setWaitTxSnack()
          //await for wait tx
          return transaction.wait()
          // })
        })
        //TODO validate transactionResult
        // eslint-disable-next-line no-unused-vars
        .then((transactionResult) => {
          this.setSuccessTxSnack({
            tx: this.transactionHash,
            token: obj.symbol,
            amount: this.$options.filters.formatNumber(obj.amount),
            action: obj.nameAction,
          })
        })
        .catch((error) => {
          const userError = typeof error === 'string' ? error : error.message || ''
          this.setFailTxSnack({ error: userError })
        })
    },

    ...mapMutations({
      setSnack: constants.SNACK_SET,
      setSuccessTxSnack: constants.SNACK_SET_SUCCESS_TX,
      setWaitTxSnack: constants.SNACK_SET_WAIT_TX,
      setFailTxSnack: constants.SNACK_SET_FAIL_TX,
    }),
  },
}
</script>
