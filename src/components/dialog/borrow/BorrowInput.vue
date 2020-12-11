<template>
  <div>
    <template v-if="!waiting">
      <v-row class="inputBox">
        <v-col cols="10">
          <v-text-field class="inputText" full-width single-line solo flat
                        type="number" v-model="amount" required
                        :rules="[rules.required, rules.decimals,
                        rules.marketCash, rules.liquidity,rules.allowed]"/>
        </v-col>
        <v-col cols="2">
          <v-btn @click="maxAmount = true" class="mb-12" text color="#008CFF">max</v-btn>
        </v-col>
      </v-row>
      <v-row class="ma-0 my-5 d-flex justify-center">
        <p class="buyMoreTokens">Would you like to <a target="_blank" href="https://app.rskswap.com/">buy more tokens</a></p>
      </v-row>
      <div class="my-5 py-5">
        <v-row class="d-flex align-center">
          <v-col cols="2"/>
          <v-col cols="3" class="d-flex justify-end">
            <h3>Contract liquidity:</h3>
          </v-col>
          <v-col cols="4">
            <v-row class="ma-0 d-flex align-center">
              <v-col cols="7" class="d-flex justify-center">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <h1 v-bind="attrs" v-on="on">{{ cash | formatToken(data.token.decimals) | shortenDecimals }}</h1>
                  </template>
                  <span>{{ cash | formatToken(data.token.decimals) }}</span>
                </v-tooltip>
              </v-col>
              <v-col cols="5"/>
            </v-row>
          </v-col>
          <v-col cols="1">
            <span class="itemInfo">{{ data.token.symbol }}</span>
          </v-col>
          <v-col cols="2"/>
        </v-row>
        <v-row class="d-flex align-center">
          <v-col cols="2"/>
          <v-col cols="3" class="d-flex align-end justify-end">
            <h3>borrow limit:</h3>
          </v-col>
          <v-col cols="4">
            <v-row class="ma-0 d-flex align-center">
              <v-col cols="7" class="d-flex justify-center">
                <h1>{{ maxBorrowAllowed | formatNumber(data.token.decimals) }}</h1>
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
          <v-col cols="2"/>
        </v-row>
        <v-row class="d-flex align-center">
          <v-col cols="2"/>
          <v-col cols="3" class="d-flex justify-end">
            <h3>borrow balance:</h3>
          </v-col>
          <v-col cols="4">
            <v-row class="ma-0 d-flex align-center">
              <v-col cols="7" class="d-flex justify-center">
                <h1>{{ borrowBy | formatToken(data.token.decimals) }}</h1>
              </v-col>
              <v-col cols="5" class="itemInfo">
                <span class="text-center" v-if="borrowBalanceInfo">
                  (+{{ borrowBalanceInfo | formatToken(data.token.decimals) }})
                </span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1">
            <span class="itemInfo">{{ data.token.symbol }}</span>
          </v-col>
          <v-col cols="2"/>
        </v-row>
      </div>
      <v-row class="my-5 d-flex justify-center">
        <v-btn class="button" rounded color="#008CFF" @click="borrow" :disabled="!validForm">
          Borrow tokens
        </v-btn>
      </v-row>
    </template>
    <template v-else>
      <loader class="my-15"/>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loader from '@/components/common/Loader.vue';
import BigNumber from 'bignumber.js';

export default {
  name: 'BorrowInput',
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
      amount: '0',  // user generated input
      borrowBy: 0,  // borrowBalanceCurrent() The borrowed balance of current acount in this market with accrued interests
      borrowRate: 0,
      liquidity: 0, //users liquid assets in the protocol
      oldLiquidity: 0, //users liquid assets in the protocol
      supplyValue:0, // user's liquidity in underlying
      usdPrice:0,
      cash: 0, //current underlying balance stored in contract. AKA "CONTRACT LIQUIDITY"
      oldCash: 0, // balance of ctoken expressed in underlying
      tokenBalance: 0,    // getBalanceOfUnderlying(this.account) balance of this account in underlying
      isBorrowAllowed: false, // checks whether or not the Comptroller will allow the borrow
      oldMaxBorrowAllowed: 0,
      maxBorrowAllowed: 0,  // BORROW LIMIT getMaxBorrowAllowed() calculates the maximun borrow allowance. User should never borrow close to this amount, otherwise runs risk of getting automatically liquidated
      borrowAllowance:0,
      borrowBalanceInfo: null,
      borrowLimitInfo: null, //Borrow difference - gray number to be shown to the side
      collateralFactor: 0,  // getCollateralFactorMantissa()
      mantissa: 0,  // getCurrentExchangeRate() current exchange rate mantissa to convert underlying to ctoken
      rules: {
        required: () => !!Number(this.amount) || 'Required.',
        // TODO: fix bug: triggers when maxBorrowAllowed is inputed by MAX button
        allowed: () => Number(this.maxBorrowAllowed) > Number(this.amount)/* || 'You shouldn\'t borrow over the max allowed!'*/,
        decimals: () => this.decimalPositions || `Maximum ${this.data.token
          .decimals} decimal places for ${this.data.token.symbol}.`,
        marketCash: () => this.oldCash >= Number(this
          .tokenBalance) || `This market doesn't have enough ${this.data.token.symbol}`,
        liquidity: () => this.oldLiquidity >= (this.price * 2 * Number(this
          .tokenBalance)) || 'You don\'t have enough liquidity, supply more collateral.',
        enteredMarket: () => true || '',
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
    return (this.tokenBalance / 10 ** this.data.token.decimals).toFixed(
      this.data.token.decimals)
    },
    // balanceAsDouble() {
    //   return this.asDouble(this.tokenBalance);
    // },
    contractAmount() { //TODO: check, is this the right way to convert from user input to contract data
      return Number(this.amount).toFixed(this.data.token.decimals).replace('.', '');
    },
    validForm() {// TODO: double-check validations
      return typeof this.rules.enteredMarket() !== 'string'
        && typeof this.rules.allowed() !== 'string'
        && typeof this.rules.liquidity() !== 'string'
        && typeof this.rules.decimals() !== 'string'
        && typeof this.rules.required() !== 'string'
        && typeof this.rules.marketCash() !== 'string';
    },
    hasDecimals() {
      return !!Number(this.data.token.decimals);
    },
    numberOfDecimals() {
      const amount = this.amount.toString();
      return amount.includes('.') ? (amount.substring(amount.indexOf('.') + 1, amount.length)
        .length <= this.data.token.decimals) : true;
    },
    decimalPositions() {
      const amount = this.amount.toString();
      return this.hasDecimals ? this.numberOfDecimals : !amount.includes('.');
    },
  },
  methods: {
    borrow() {
  this.waiting = true;
      this.$emit("wait");
      this.data.market
        .borrow(this.amount, this.account)
        // .borrow(this.contractAmount)
        // .borrow(this.contractAmount, this.account)
        .then((res) => {
          this.waiting = false;
          console.log("transaction sent: ",res);
          this.$emit("succeed", {
            hash: res.transactionHash,
            borrowLimitInfo: this.borrowLimitInfo,
            borrowBalanceInfo: this.borrowBalanceInfo,
          });
        })
        .catch((error) => {
          console.log("ERROR borrow()", error);
          this.waiting = false;
          this.$emit("error");
        });
    },
    // borrow() {
    //   this.waiting = true;
    //   this.$emit('wait');
    //   this.data.market.borrow(this.contractAmount, this.account)
    //     .then((res) => {
    //       this.waiting = false;
    //       this.$emit('succeed', {
    //         hash: res.transactionHash,
    //         borrowLimitInfo: this.borrowLimitInfo,
    //         borrowBalanceInfo: this.borrowBalanceInfo,
    //       });
    //     })
    //     .catch(() => {
    //       this.waiting = false;
    //       this.$emit('error');
    //     });
    // },
    asDouble(value) {
      return (value / (10 ** this.data.token.decimals))
        .toFixed(this.data.token.decimals);
    },
    getMaxBorrowAllowed() { // TODO: double check, this might have a bug: under-calculating max
                            // TODO: fix bug: sometimes returns more than 18 decimals!
      // source: https://medium.com/compound-finance/borrowing-assets-from-compound-quick-start-guide-f5e69af4b8f4
      const res = this.price > 0 ? (this.liquidity/1e18) / (this.price/1e18) : -1;
      console.log("getMaxBorrowAllowed() maxBorrow ",res, "type ", typeof res);
      console.log("getMaxBorrowAllowed() this.amount ",this.amount, " type ", typeof this.amount);
      return res;
    //////// Original code ///////////////
    // getMaxBorrowAllowed(liquidity, cash) {
    //   const allowed = this.price > 0 ? Math.floor(liquidity / (this.price * 2)) : 0;
    //   return allowed >= cash ? cash : allowed;
    },
    async getValues() {
      await this.data.market.borrowBalanceCurrent(this.account)
        .then((borrowBy) => {
          // console.log("____borrowBy___",borrowBy," borrowBalanceCurrentAccount");
          this.borrowBy = Number(borrowBy) + Number(this.contractAmount);
          // console.log("____borrowBy___",borrowBy," borrowBalanceCurrentAccount + user input converted to uint");
          return this.$middleware.getAccountLiquidity(this.account);
          // return this.$rbank.controller.getAccountLiquidity(this.account);
        })
        .then((accountLiquidity) => {
          // console.log("getValues() liquidity:",accountLiquidity);
          this.oldLiquidity = accountLiquidity; // user's liquid assets in the protocol
          return this.data.market.getCash(); // gets underlying balance stored in contract
          // return this.data.market.eventualCash;
        })
        .then((cash) => {
          this.oldCash = cash; // balance of contract underlying AKA "CONTRACT LIQUIDITY"
          this.cash = cash - Number(this.contractAmount); // WHY ??? perhaps they're updating the underlying balance upon user input?
          // console.log("_______this.contractAmount____::::____",this.contractAmount,"user input converted to uint");
          // console.log("_______this.cash____::::____",cash,"current underlying balance stored in contract");
          // console.log("_______this.amount__________",this.amount, "literal user input");
          // return this.data.market.getAccountValues(this.account);
          return this.data.market.getBalanceOfUnderlying(this.account);
          // return this.$rbank.controller.getAccountValues(this.account);
        })
        .then((supplyValue) => {
          this.supplyValue = supplyValue;
          const newBorrowValue = ((this.borrowBy + (Number(this.contractAmount) * this.price)) * (this
            .collateralFactor + this.mantissa)) / this.mantissa;
          const newSupplyValue = supplyValue;
          this.liquidity = newBorrowValue < newSupplyValue ? newSupplyValue - newBorrowValue : 0;
          // console.log("__@@@@@@@@ user's liquidity @@@@@@@___",this.liquidity);
          // this.maxBorrowAllowed = this.getMaxBorrowAllowed(this.liquidity, this.cash);
          this.maxBorrowAllowed = this.getMaxBorrowAllowed();
          this.borrowAllowance = this.getMaxBorrowAllowed();
          // console.log("CALCULATED BORROW ALLOWANCE:",this.borrowAllowance);
          this.borrowBalanceInfo = Number(this.contractAmount);

          // this.borrowLimitInfo = Number(this //TODO enable this
          //   .getMaxBorrowAllowed(this.oldLiquidity, this.oldCash) - this.maxBorrowAllowed);
        });

        // await this.data.market.updatedBorrowBy(this.account)
        // .then((borrowBy) => {
        //   this.borrowBy = borrowBy + Number(this.contractAmount);
        //   return this.$rbank.controller.getAccountLiquidity(this.account);
        // })
        // .then((accountLiquidity) => {
        //   this.oldLiquidity = accountLiquidity;
        //   return this.data.market.eventualCash;
        // })
        // .then((cash) => {
        //   this.oldCash = cash;
        //   this.cash = cash - Number(this.contractAmount);
        //   return this.$rbank.controller.getAccountValues(this.account);
        // })
        // .then(({ supplyValue, borrowValue }) => {
        //   const newBorrowValue = ((borrowValue + (Number(this.contractAmount) * this.price)) * (this
        //     .collateralFactor + this.mantissa)) / this.mantissa;
        //   const newSupplyValue = supplyValue;
        //   this.liquidity = newBorrowValue < newSupplyValue ? newSupplyValue - newBorrowValue : 0;
        //   this.maxBorrowAllowed = this.getMaxBorrowAllowed(this.liquidity, this.cash);
        //   this.borrowBalanceInfo = Number(this.contractAmount);
        //   this.borrowLimitInfo = Number(this
        //     .getMaxBorrowAllowed(this.oldLiquidity, this.oldCash) - this.maxBorrowAllowed);
        // });
    },
  },
  watch: {
    amount() {
      this.getValues();
      if (this.maxAmount && this.amount !== this.oldMaxBorrowAllowed) this.maxAmount = false;
      if (this.amount === this.oldMaxBorrowAllowed){
        console.log("borrowInput amount() ", this.amount, " oldMaxBorrAll ", this.oldMaxBorrowAllowed);
        this.maxAmount = true;}
    },
    maxAmount() {
      if (this.maxAmount) this.amount = this.oldMaxBorrowAllowed;
      if (!this.maxAmount && this.amount === this.oldMaxBorrowAllowed) this.amount = null;
    },
  },
  components: {
    Loader,
  },
  created() {
    this.data.market
    .borrowBalanceCurrent(this.account)
      .then((borrowBy) => {
        // console.log("borrInput borrowBalanceCurrent",Number(borrowBy));
        this.borrowBy = Number(borrowBy);
        return this.$middleware.getAccountLiquidity(this.account);
        // return this.$rbank.controller.getAccountLiquidity(this.account);
      })
      .then((accountLiquidity) => {
        this.oldLiquidity = accountLiquidity; //liquid assets in the protocol
        this.liquidity = accountLiquidity; //liquid assets in the protocol
        // this.liquidity= this.data.market.tokenBalance;
        // console.log("borrowInput liquidity-------------------------------------------------------------",this.liquidity);
        return this.data.market.getCash();
        // return this.data.market.eventualCash;
      })
      .then((cash) => {
        // the amount of underlying stored in contract AKA "CONTRACT LIQUIDITY"
        // console.log("borrowInput cash",cash);
        this.oldCash = cash; // the amount of underlying stored in contract AKA "CONTRACT LIQUIDITY"
        this.cash = cash; // the amount of underlying stored in contract AKA "CONTRACT LIQUIDITY"
        return this.data.market.borrowRate;
        // return this.data.market.eventualBorrowRate;
      })
      .then((borrowRate) => { // TODO: double check, perhaps this is not being used
        // console.log("borrowInput rate per block",borrowRate);
        this.borrowRate = borrowRate;
        // return this.data.market.price;
        return this.data.market.getPrice(this.data.market.address);
        // return this.$rbank.controller.eventualMarketPrice(this.data.market.address);
      })
      .then((marketPrice) => {
        // console.log("borrowInput price",Number(marketPrice));
        this.price = marketPrice;
        /*return this.data.market.eventualToken;
      }) // we don't need this anymore
      .then((tok) => {*/
        return this.data.market.getBalanceOfUnderlying(this.account);
        //return this.data.market.tokenBalance;
        //tok.eventualBalanceOf(this.account)
      })
      .then((supplyValue) => {
        // console.log("borrowInput supplyValue-------getBalanceOfUnderlying(this.account)-----------",supplyValue);
        this.supplyValue = supplyValue;
        return this.data.market.getCurrentExchangeRate()
        // return this.$rbank.controller.eventualMantissa;
      })
      .then((mantissa) => {
        // console.log("borrowInput exchRate mantissa",mantissa);
        this.mantissa = mantissa;
        // this.maxBorrowAllowed = this.getMaxBorrowAllowed(this.liquidity, this.cash);
        this.maxBorrowAllowed = this.getMaxBorrowAllowed();
        //this.maxBorrowAllowed = this.tokenBalance*1e18; // this sortof works, but it actually doesn't
        // this.maxBorrowAllowed = (this.liquidity/1e18) * mantissa / (this.price/1e6); // \REVISAR CUENTA - CASI QUE ANDA
        // account's liquidity in usd, divided by (amount of token to be borrowed multiplied by usd price of token)
        // console.log("''''''''''''''''''''''''''''''''''''''''");
        // console.log("liquidity:",this.liquidity,"mantissa",mantissa,"tokenPrice",this.price);
        // console.log("maxborrowed",this.maxBorrowAllowed);
        // console.log("''''''''''''''''''''''''''''''''''''''''");
        // console.log("___liq___",this.liquidity,"___cash___",this.cash,"___maxBorrAll___",this.maxBorrowAllowed );
        // this.oldMaxBorrowAllowed = this.asDouble(this.getMaxBorrowAllowed(this.liquidity, this.cash));
        this.oldMaxBorrowAllowed = this.getMaxBorrowAllowed();
        // this.maxBorrowAllowed = this.getMaxBorrowAllowed();
        // console.log("asdjkahsdkjashdjkhasdjkhaskdhakjshdaksjdhjkahsdkjahsdkjahsdjkahsdkjahksdhj ",this.maxBorrowAllowed);
        return this.data.market.getCollateralFactorMantissa();
        //return this.$rbank.controller.eventualCollateralFactor;
      });
        //  console.log("borrowInput collateralfactorMantissa", collateralFactor);
        // this.collateralFactor = collateralFactor ;//* this.mantissa; /// WHY??
        // console.log("borrowInput collateralFactorMantissa ",collateralFactor," collateralfactor* mantissa ", this.collateralFactor);
        // // this.maxBorrowAllowed = this.getMaxBorrowAllowed(this.liquidity, this.cash);
        // this.maxBorrowAllowed = this.getMaxBorrowAllowed();
        // this.borrowAllowance = this.getMaxBorrowAllowed();
        //   console.log("CALCULATED BORROW ALLOWANCE:",this.borrowAllowance);
        // console.log("___liq___",this.liquidity,"___cash___",this.cash,"___maxBorrAll___",this.maxBorrowAllowed );
        // // this.oldMaxBorrowAllowed = this.asDouble(this.getMaxBorrowAllowed(this.liquidity, this.cash));
        // this.oldMaxBorrowAllowed = this.asDouble(this.getMaxBorrowAllowed());

    //       this.data.market
    // .updatedBorrowBy(this.account)
    //   .then((borrowBy) => {
    //     this.borrowBy = borrowBy;
    //     return this.$rbank.controller.getAccountLiquidity(this.account);
    //   })
    //   .then((accountLiquidity) => {
    //     this.oldLiquidity = accountLiquidity;
    //     this.liquidity = accountLiquidity;
    //     return this.data.market.eventualCash;
    //   })
    //   .then((cash) => {
    //     this.oldCash = cash;
    //     this.cash = cash;
    //     return this.data.market.eventualBorrowRate;
    //   })
    //   .then((borrowRate) => {
    //     this.borrowRate = borrowRate;
    //     return this.$rbank.controller.eventualMarketPrice(this.data.market.address);
    //   })
    //   .then((marketPrice) => {
    //     this.price = marketPrice;
    //     return this.data.market.eventualToken;
    //   })
    //   .then((tok) => tok.eventualBalanceOf(this.account))
    //   .then((tokenBalance) => {
    //     this.tokenBalance = tokenBalance;
    //     return this.$rbank.controller.eventualMantissa;
    //   })
    //   .then((mantissa) => {
    //     this.mantissa = mantissa;
    //     return this.$rbank.controller.eventualCollateralFactor;
    //   })
    //   .then((collateralFactor) => {
    //     this.collateralFactor = collateralFactor * this.mantissa;
    //     this.oldMaxBorrowAllowed = this.asDouble(this
    //       .getMaxBorrowAllowed(this.liquidity, this.cash));
    //     this.maxBorrowAllowed = this.getMaxBorrowAllowed(this.liquidity, this.cash);
    //   });
  },
};
</script>
