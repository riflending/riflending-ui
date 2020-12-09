<template>
  <div>
    <template v-if="!waiting">
      <v-row class="inputBox">
        <v-col cols="10">
          <v-text-field
            class="inputText"
            full-width
            single-line
            solo
            flat
            type="number"
            v-model="amount"
            required
            :rules="[
              rules.required,
              rules.decimals,
              rules.marketSupply,
              rules.userSupply,
              rules.userDebts,
            ]"
          />
        </v-col>
        <v-col cols="2">
          <v-btn @click="maxAmount = true" class="mb-12" text color="#008CFF"
            >max</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="my-5" />
      <div class="my-5 py-5">
        <v-row class="d-flex align-center">
          <v-col cols="2" />
          <v-col cols="3" class="d-flex justify-end">
            <h3>Total supply in contract:</h3>
          </v-col>
          <v-col cols="4">
            <v-row class="ma-0 d-flex align-center">
              <v-col cols="7" class="d-flex justify-center">
                <h1>{{ cash | formatToken(data.token.decimals) }}</h1>
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
            <h3>supply balance:</h3>
          </v-col>
          <v-col cols="4">
            <v-row class="ma-0 d-flex align-center">
              <v-col cols="7" class="d-flex justify-center">
                <h1 :title="[`Balance ${tokenBalance} ${data.token.symbol}`]">
                  {{ +tokenBalance | formatNumber() }}
                </h1>
              </v-col>
              <v-col cols="5" class="itemInfo">
                <span class="text-center" v-if="supplyBalanceInfo">
                  (-{{ supplyBalanceInfo | formatToken(data.token.decimals) }})
                </span>
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
                  {{ maxBorrowAllowed | formatToken(data.token.decimals) }}
                </h1>
              </v-col>
              <v-col cols="5" class="itemInfo">
                <span class="text-center" v-if="borrowLimitInfo">
                  (-{{ borrowLimitInfo | formatToken(data.token.decimals) }})
                </span>
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
          class="button"
          rounded
          color="#008CFF"
          @click="withdraw"
          :disabled="!validForm"
        >
          Withdraw my tokens
        </v-btn>
      </v-row>
    </template>
    <template v-else>
      <loader class="my-15" />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loader from "@/components/common/Loader.vue";
import { ethers } from "ethers";

export default {
  name: "WithdrawInput",
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
      amount: "0",
      supplyOf: 0,
      liquidity: 0,
      cash: 0,
      price: 0,
      maxBorrowAllowed: 0,
      maxWithdrawAllowed: 0,
      supplyBalanceInfo: null,
      borrowLimitInfo: null,
      tokenBalance: 0,
      collateralFactor: 0,
      mantissa: 0,
      oldCash: 0,
      oldSupplyOf: 0,
      supplyValue: 0,
      borrowValue: 0,
      debt: 0,
      rules: {
        required: () => !!Number(this.amount) || "Required.",
        decimals: () =>
          this.decimalPositions ||
          `Maximum ${this.data.token.decimals} decimal places for ${this.data.token.symbol}.`,
        marketSupply: () =>
          this.oldCash >= Number(this.amount) ||
          "Market does not have enough funds",
        userSupply: () =>
          this.oldSupplyOf >= Number(this.amount) ||
          "You do not have enough funds on this market",
        userDebts: () =>
          this.oldSupplyOf - this.debt >= Number(this.amount) ||
          "You can not withdraw that much, because is compromised as collateral in a debt",
      },
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    maxBorrowAllowedAsDouble() {
      return this.asDouble(this.maxBorrowAllowed);
    },
    contractAmount() {
      return Number(this.amount)
        .toFixed(this.data.token.decimals)
        .replace(".", "");
    },
    validForm() {
      return (
        typeof this.rules.required() !== "string" &&
        typeof this.rules.decimals() !== "string" &&
        typeof this.rules.marketSupply() !== "string" &&
        typeof this.rules.userDebts() !== "string" &&
        typeof this.rules.userSupply() !== "string"
      );
    },
    hasDecimals() {
      return !!Number(this.data.token.decimals);
    },
    numberOfDecimals() {
      const amount = this.amount.toString();
      return amount.includes(".")
        ? amount.substring(amount.indexOf(".") + 1, amount.length).length <=
            this.data.token.decimals
        : true;
    },
    decimalPositions() {
      const amount = this.amount.toString();
      return this.hasDecimals ? this.numberOfDecimals : !amount.includes(".");
    },
  },
  methods: {
    withdraw() {
      this.waiting = true;
      this.$emit("wait");
      this.data.market
        //TODO false is tru if max press(validate)
        .withdraw(this.amount, false)
        .then((res) => {
          this.waiting = false;
          this.$emit("succeed", {
            hash: res.transactionHash,
            borrowLimitInfo: this.borrowLimitInfo,
            supplyBalanceInfo: this.supplyBalanceInfo,
          });
        })
        .catch((error) => {
          this.waiting = false;
          this.$emit("error");
        });
    },
    asDouble(value) {
      return (Number(value) / 10 ** this.data.token.decimals).toFixed(
        this.data.token.decimals
      );
    },
    getMaxWithdrawAllowed(supplyOf, cash) {
      const allowed = cash > supplyOf - this.debt ? supplyOf - this.debt : cash;
      // return this.asDouble(allowed);
      return allowed;
    },
    getMaxBorrowAllowed(liquidity, cash) {
      const allowed =
        this.price > 0 ? Math.floor(liquidity / (this.price * 2)) : 0;
      return allowed >= cash ? cash : allowed;
    },
    async getValues() {
      this.supplyBalanceInfo = Number(this.amount);
      return;
      // TODO this functon
      let oldLiquidity;
      let auxBorrowValue;
      this.$middleware
        .getAccountLiquidity(this.account)
        .then((accountLiquidity) => {
          oldLiquidity = accountLiquidity;
          return this.data.market.getCash();
        })
        .then((cash) => {
          this.oldCash = cash;
          this.cash = cash - Number(this.contractAmount);
          return this.data.market.borrowBalanceCurrent(this.account);
        })
        .then((borrowValue) => {
          auxBorrowValue = borrowValue;
          return this.data.market.tokenBalance;
        })
        .then((balanceSupply) => {
          const newBorrowValue =
            (auxBorrowValue * (this.collateralFactor + this.mantissa)) /
            this.mantissa;
          const newSupplyValue =
            balanceSupply - Number(this.contractAmount) * this.price;

          this.liquidity =
            newBorrowValue < newSupplyValue
              ? newSupplyValue - newBorrowValue
              : 0;
        });
      this.maxWithdrawAllowed = this.getMaxWithdrawAllowed(
        this.oldSupplyOf,
        this.oldCash
      );
      // TODO getAccountValues
      // return this.data.market.getAccountValues(this.account);
      // .then(({ supplyValue, borrowValue }) => {
      //   const newBorrowValue =
      //     (borrowValue * (this.collateralFactor + this.mantissa)) /
      //     this.mantissa;
      //   const newSupplyValue =
      //     supplyValue - Number(this.contractAmount) * this.price;
      //   this.liquidity =
      //     newBorrowValue < newSupplyValue
      //       ? newSupplyValue - newBorrowValue
      //       : 0;
      //   this.maxWithdrawAllowed = this.getMaxWithdrawAllowed(
      //     this.oldSupplyOf,
      //     this.oldCash
      //   );
      //   this.maxBorrowAllowed = this.getMaxBorrowAllowed(
      //     this.liquidity,
      //     this.cash
      //   );
      //   this.supplyBalanceInfo = Number(this.contractAmount);
      //   this.borrowLimitInfo = Number(
      //     this.getMaxBorrowAllowed(oldLiquidity, this.oldCash) -
      //       this.maxBorrowAllowed
      //   );
      // });
    },
  },
  watch: {
    amount() {
      this.getValues();
      if (this.maxAmount && this.amount !== this.maxWithdrawAllowed)
        this.maxAmount = false;
      if (this.amount === this.maxWithdrawAllowed) this.maxAmount = true;
    },
    maxAmount() {
      this.getValues();
      if (this.maxAmount) this.amount = this.maxWithdrawAllowed;
      if (!this.maxAmount && this.amount === this.maxWithdrawAllowed)
        this.amount = null;
    },
  },
  components: {
    Loader,
  },
  created() {
    //TODO getAccountValues
    // this.supplyValue = supplyValue;
    //sets oldCash and cash
    this.data.market
      .getCash()
      .then((cash) => {
        this.oldCash = cash;
        this.cash = cash;
        return this.data.market.price;
      })
      //set price
      .then((marketPrice) => {
        this.price = marketPrice;
        return this.data.market.borrowBalanceCurrent(this.account);
      })
      .then((borrowValue) => {
        this.data.market.contractAmount;
        //TODO format
        this.borrowValue = ethers.utils.formatEther(borrowValue);
        return this.data.market.tokenBalance;
      })
      .then((balance) => {
        this.tokenBalance = balance;
        this.supplyOf = this.tokenBalance;
        this.oldSupplyOf = this.tokenBalance;
        return this.$middleware.getAccountLiquidity(this.account);
      })
      //sets liquidity
      .then((accountLiquidity) => {
        this.liquidity = accountLiquidity;
        return this.data.market.getCurrentExchangeRate();
      })
      //sets mantissa
      .then((mantissa) => {
        this.mantissa = mantissa;
        return this.data.market.getCollateralFactorMantissa();
      })
      //sets maxWithdrawAllowed and maxBorrowAllowed
      .then((collateralFactor) => {
        //set collateralFactor
        this.collateralFactor = collateralFactor * this.mantissa;
        //sets debt
        this.debt =
          (this.borrowValue * (this.mantissa + this.collateralFactor)) /
          this.mantissa /
          this.price;
        this.maxWithdrawAllowed = this.getMaxWithdrawAllowed(
          this.supplyOf,
          this.cash
        );
        this.maxBorrowAllowed = this.getMaxBorrowAllowed(
          this.liquidity,
          this.cash
        );
      });
  },
};
</script>
