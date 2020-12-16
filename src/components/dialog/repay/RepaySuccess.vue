<template>
  <div>
    <div class="successBox">
      <v-row class="my-5 d-flex justify-center">
        <h1 class="blueish">Success!</h1>
      </v-row>
      <v-row class="my-5 d-flex justify-center">
        <div class="text-center">
          You have successfully repayed <br>
          <span class="greenish">
            {{ data.borrowBalanceInfo | formatToken(data.token.decimals) }}
          </span>
          <span class="greenish">{{ data.token.symbol }}</span>
          to this Market.
        </div>
      </v-row>
    </div>
    <div class="my-5 py-5">
      <v-row class="d-flex align-center">
        <v-col cols="2"/>
        <v-col cols="3" class="d-flex justify-end">
          <h3>health factor:</h3>
        </v-col>
        <v-col cols="3">
          <h1 class="text-center">{{ healthFactor }}%</h1>
        </v-col>
        <v-col cols="2"/>
        <v-col cols="2"/>
      </v-row>
      <v-row class="d-flex align-center">
        <v-col cols="2"/>
        <v-col cols="3" class="d-flex justify-end">
          <h3>borrow balance:</h3>
        </v-col>
        <v-col cols="3">
          <h1 class="text-center">{{ borrowBy | formatToken(data.token.decimals) | shortenDecimals }}</h1>
        </v-col>
        <v-col cols="2">
          <span class="itemInfo">{{ data.token.symbol }}</span>
        </v-col>
        <v-col cols="2"/>
      </v-row>
      <v-row class="d-flex align-center">
        <v-col cols="2"/>
        <v-col cols="3" class="d-flex align-end justify-end">
          <h3>borrow limit:</h3>
        </v-col>
        <v-col cols="3">
          <h1 class="text-center">{{ maxBorrowAllowed | formatToken(data.token.decimals) }}</h1>
        </v-col>
        <v-col cols="2">
          <span class="itemInfo">{{ data.token.symbol }}</span>
        </v-col>
        <v-col cols="2"/>
      </v-row>
    </div>
    <transaction-hash :hash="data.hash"/>
    <v-row class="my-5 d-flex justify-center">
      <v-btn class="button" rounded color="#008CFF" @click="closeDialog">
        Back to Supply / Borrow
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TransactionHash from '@/components/common/TransactionHash.vue';

export default {
  name: 'BorrowSuccess',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tokenBalance: 0,
      liquidity: 0,
      cash: 0,
      price: 0,
      maxBorrowAllowed: 0,
      borrowBy: 0,
      accountHealth: 0,
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    healthFactor() {
      return this.accountHealth >= 1 ? 100 : (this.accountHealth * 100).toFixed(2);
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
    getMaxAllowed(liquidity, cash) {
      const allowed =
        this.price > 0 ? Math.floor(liquidity / (this.price * 2)) : 0;
      return allowed >= cash ? cash : allowed;
    },
  },
  components: {
    TransactionHash,
  },
  created() {
    this.$middleware.getAccountLiquidity(this.account)
      // sets liquidity
      .then(({ accountLiquidityInExcess }) => {
        console.log("repaySuccess: liquidity",accountLiquidityInExcess);
        this.liquidity = Number(accountLiquidityInExcess);
        console.log("repaySuccess: Number(liquidity)",this.liquidity);
        return this.data.market.getCash();
      })
      //sets cash
      .then((cash) => {
        this.cash = cash;
        console.log("repaySuccess: cash",this.cash);
        return this.data.market.borrowRate;
      })
      .then((borrowRate) => {
        this.borrowRate = borrowRate;
        console.log("repaySuccess: borrowRate",this.borrowRate);
        return this.data.market.price;
      })
      //sets price
      .then((price) => {
        this.price = price;
        console.log("repaySuccess: price",this.price);
        return this.data.market.borrowBalanceCurrent(this.account);
      })
      .then((borrowBy) => {
        this.borrowBy = Number(borrowBy);
        console.log("success! borrowby",this.borrowBy);
        this.borrowBalanceInfo = Number(this.contractAmount);
      });

// TODO: double-check that we're not missing anything in this refactor
      // .then((accountLiquidity) => {
      //   this.liquidity = accountLiquidity;
      //   console.log("repaySuccess: liquidity",this.liquidity);
      //   return this.data.market.eventualCash;
      // })
      // .then((cash) => {
      //   this.cash = cash;
      //   return this.$rbank.controller.eventualMarketPrice(this.data.market.address);
      // })
      // .then((marketPrice) => {
      //   this.price = marketPrice;
      //   return this.data.market.updatedBorrowBy(this.account);
      // })
      // .then((borrowBy) => {
      //   this.borrowBy = borrowBy;
      //   return this.$rbank.controller.getAccountHealth(this.account);
      // })
      // .then((accountHealth) => {
      //   this.accountHealth = accountHealth;
      //   this.maxBorrowAllowed = this.getMaxAllowed(this.liquidity, this.cash);
      // });
  },
};
</script>
