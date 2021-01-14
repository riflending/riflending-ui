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
          :disabled="!hasAccountLiquidityInExcess"
          @click="currentComponent = 'BorrowList'"
        >
          <span>Borrow</span>
        </v-btn>
      </div>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-alert border="right" colored-border type="error" elevation="2">
        In order to borrow in a market, you must add collateral first. You can do it by clicking on
        the toggle button.
      </v-alert> </v-row
    >>
    <v-row class="d-flex justify-center">
      <component :is="currentComponent" @listChange="reset" />
    </v-row>
  </div>
</template>

<script>
import SupplyList from '@/components/supply/SupplyList.vue'
import BorrowList from '@/components/borrow/BorrowList.vue'
import { mapState } from 'vuex'

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
      hasAccountLiquidityInExcess: false,
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
  },
  async created() {
    this.accountHealth = await this.$middleware.getAccountHealth(this.account)
    // Take a look at the doc https://compound.finance/docs/comptroller#account-liquidity
    // The account Liquidity represents the USD value borrowable by a user, before it reaches liquidation
    // If the user never deposited collateral, this value is zero
    const { accountLiquidityInExcess } = await this.$middleware.getAccountLiquidity(this.account)
    this.hasAccountLiquidityInExcess = !accountLiquidityInExcess.isZero()
  },
  methods: {
    reset() {
      this.$middleware.getAccountHealth(this.account).then((accountHealth) => {
        this.accountHealth = accountHealth
      })
    },
  },
}
</script>
