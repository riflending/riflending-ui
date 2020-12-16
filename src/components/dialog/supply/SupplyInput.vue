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
            type="text"
            v-model="amount"
            required
            :rules="[rules.required, rules.decimals, rules.minBalance]"
          />
        </v-col>
        <v-col cols="2">
          <v-btn
            @click="maxAmount = true"
            class="mb-12"
            text
            color="#008CFF"
            :disabled="!maxBorrowAllowed"
            >max</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="ma-0 my-5 d-flex justify-center">
        <p class="buyMoreTokens">
          Would you like to
          <a target="_blank" href="https://app.rskswap.com/"
            >buy more tokens?</a
          >
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
                  {{ +tokenBalance | formatNumber() }}
                </h1>
              </v-col>
              <!-- <v-col cols="5" class="itemInfo d-flex justify-center">
                <span class="text-right" v-if="supplyBalanceInfo">
                  (+{{ supplyBalanceInfo | formatToken(data.token.decimals) }})
                </span>
              </v-col> -->
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
                  {{
                    maxBorrowAllowed
                      | formatToken(data.token.decimals)
                      | shortenDecimals
                  }}
                </h1>
              </v-col>
              <v-col cols="5" class="itemInfo d-flex justify-center">
                <!-- <span class="text-right" v-if="borrowLimitInfo">
                  (+{{ borrowLimitInfo | formatToken(data.token.decimals) }})
                </span> -->
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
          @click="supply"
          :disabled="!validForm"
        >
          Supply tokens
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

export default {
  name: "SupplyInput",
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
      amount: "0",
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
      rules: {
        required: () => (!!Number(this.amount) && Math.sign(this.amount) == 1) || "Required.",
        decimals: () =>
          this.decimalPositions ||
          `Maximum ${this.data.token.decimals} decimal places for ${this.data.token.symbol}.`,
        minBalance: () =>
          //TODO see if the tokenBalance is the balance of account or the balance of the account in the protocol
          // this.tokenBalance >= Number(this.contractAmount) ||
          // "Not enough funds",
          this.maxAmountBalanceAllowed >= Number(this.amount) ||
          "Not enough funds",
      },
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    apr() {
      return this.borrowRate.toFixed(2);
    },
    balanceAsDouble() {
      return this.asDouble(this.tokenBalance);
    },
    contractAmount() {
      return Number(this.amount)
        .toFixed(this.data.token.decimals)
        .replace(".", "");
    },
    validForm() {
      return (
        typeof this.rules.minBalance() !== "string" &&
        typeof this.rules.required() !== "string" &&
        typeof this.rules.decimals() !== "string"
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
    supply() {
      this.waiting = true;
      this.$emit("wait");
      this.data.market
        .supply(this.amount, this.account)
        // .supply(this.contractAmount, this.account)
        .then((res) => {
          this.waiting = false;
          this.$emit("succeed", {
            hash: res.transactionHash,
            borrowLimitInfo: this.borrowLimitInfo,
            supplyBalanceInfo: Number(this.amount),
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
    // getMaxBorrowAllowed(liquidity, cash) {
    //   const allowed =
    //     this.price > 0 ? Math.floor(liquidity / (this.price * 2)) : 0;
    //   return allowed >= cash ? cash : allowed;
    // },
    async getValues() {
      let oldLiquidity;
      let oldCash;
      await this.$middleware
        .getAccountLiquidity(this.account)
        .then(({ accountLiquidityInExcess }) => {
          oldLiquidity = accountLiquidityInExcess;
          return this.data.market.tokenBalance;
        })
        .then((balance) => {
          this.supplyOf = balance + Number(this.contractAmount);
          return this.data.market.getCash();
        })
        .then((cash) => {
          oldCash = cash;
          this.cash = oldCash + Number(this.contractAmount);
          return this.data.market.borrowRate;
        });

      //TODO all this !!
      //   .then(({ supplyValue, borrowValue }) => {
      //     const newBorrowValue =
      //       (borrowValue * (this.collateralFactor + this.mantissa)) /
      //       this.mantissa;
      //     const newSupplyValue =
      //       supplyValue + Number(this.contractAmount) * this.price;
      //     this.liquidity =
      //       newBorrowValue < newSupplyValue
      //         ? newSupplyValue - newBorrowValue
      //         : 0;
      //     this.maxBorrowAllowed = this.getMaxBorrowAllowed(
      //       this.liquidity,
      //       this.cash
      //     );
      //     this.supplyBalanceInfo = Number(this.contractAmount);
      //     this.borrowLimitInfo = Number(
      //       this.maxBorrowAllowed -
      //         this.getMaxBorrowAllowed(oldLiquidity, oldCash)
      //     );
      //   });
    },
  },
  watch: {
    amount() {
      this.getValues();
      if (this.maxAmount && this.amount !== this.maxAmountBalanceAllowed)
        this.maxAmount = false;
      if (this.amount === this.maxAmountBalanceAllowed) this.maxAmount = true;
    },
    maxAmount() {
      if (this.maxAmount) this.amount = this.maxAmountBalanceAllowed;
      if (!this.maxAmount && this.amount === this.maxAmountBalanceAllowed)
        this.amount = null;
    },
  },
  components: {
    Loader,
  },
  created() {
    this.$middleware
      .getAccountLiquidity(this.account)
      .then(({ accountLiquidityInExcess }) => {
        this.liquidity = Number(accountLiquidityInExcess);
        return this.data.market.getCash();
      })
      .then((cash) => {
        this.cash = cash;
        return this.data.market.borrowRate;
      })
      .then((borrowRate) => {
        this.borrowRate = borrowRate;
        return this.data.market.price;
      })
      .then((price) => {
        this.price = price;
        return this.data.market.tokenBalance;
      })
      .then((tokenBalance) => {
        this.tokenBalance = tokenBalance;
        this.supplyOf = tokenBalance;
        return this.data.market.getMaxBorrowAllowed(this.account);
      })
      .then((maxBorrowAllowed) =>{
        this.maxBorrowAllowed = maxBorrowAllowed;
        const internalAddressOfToken = this.data.market.token?.internalAddress;
        return internalAddressOfToken
          ? this.$middleware.getWalletAccountBalance(
              this.account,
              this.data.market.token?.internalAddress
            )
          : this.$middleware.getWalletAccountBalanceForRBTC(this.account);
      })
      .then((balanceOfToken) => {
        this.maxAmountBalanceAllowed = balanceOfToken;
        return this.data.market.getCurrentExchangeRate();
      })
      .then((mantissa) => {
        this.mantissa = mantissa;
        return this.data.market.getCollateralFactorMantissa();
      })
      .then((collateralFactor) => {
        this.collateralFactor = collateralFactor;
      });
  },
};
</script>
