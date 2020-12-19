<template>
  <div class="borrow-success">
    <div class="successBox">
      <v-row class="my-5 d-flex justify-center">
        <h1 class="blueish">Success!</h1>
      </v-row>
      <v-row class="my-5 d-flex justify-center">
        <div class="text-center">
          You have successfully borrowed <br>
          <span class="greenish">
            {{ data.borrowBalanceInfo | formatToken(data.token.decimals) }}
          </span>
          <span class="greenish">{{ data.token.symbol }}</span>
           from this Market.
        </div>
      </v-row>
    </div>
    <div class="my-5 py-5">
      <v-row class="d-flex align-center">
        <v-col cols="2"/>
        <v-col cols="3" class="d-flex justify-end">
          <h3>borrow balance:</h3>
        </v-col>
        <v-col cols="3">
          <h1 class="text-center">{{ borrowBy | formatToken(data.token.decimals)}}</h1>
        </v-col>
        <v-col cols="2">
          <span class="itemInfo">{{ data.token.symbol }}</span>
        </v-col>
        <v-col cols="2"/>
      </v-row>
      <v-row class="d-flex align-center">
        <v-col cols="2"/>
        <v-col cols="3" class="d-flex justify-end">
          <h3>supplied to contract:</h3>
        </v-col>
        <v-col cols="3">
          <h1 class="text-center">{{ tokenBalance | formatNumber}}</h1>
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
          <h1 class="text-center">{{ maxBorrowAllowed | formatToken(data.token.decimals)}}</h1>
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
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
  },
  components: {
    TransactionHash,
  },
  created() {
    this.data.market.getUserBalanceOfUnderlying()
      .then((balance) => {
        this.tokenBalance = balance;
        console.log("success! balance",this.tokenBalance, " account: ", this.account);
        return this.$middleware.getAccountLiquidity(this.account);
        // return this.$rbank.controller.getAccountLiquidity(this.account);
      })
      .then(({ accountLiquidityInExcess }) => {
        this.liquidity = accountLiquidityInExcess;
        return this.data.market.getCash();
        // return this.data.market.eventualCash;
      })
      .then((cash) => {
        this.cash = cash;
        console.log("success! cash",this.cash);
        return this.data.market.getPriceInDecimals();
        // return this.$rbank.controller.eventualMarketPrice(this.data.market.address);
      })
      .then((marketPrice) => {
        this.price = Number(marketPrice);
        console.log("success! marketprice",this.price);
        return this.data.market.borrowBalanceCurrent(this.account);
      })
      .then((borrowBy) => {
        this.borrowBy = Number(borrowBy);
        console.log("success! borrowby",this.borrowBy);
        return this.data.market.getMaxBorrowAllowed(this.account);
      })
      .then((maxBorrowAllowed) =>{
        this.maxBorrowAllowed = maxBorrowAllowed;
      });
  },
};
</script>
