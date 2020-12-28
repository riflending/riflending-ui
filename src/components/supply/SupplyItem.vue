<template>
  <div class="dialog">
    <v-list-item>
      <v-row class="my-5 mx-0 d-flex align-center">
        <v-col cols="2">
          <v-row class="d-flex align-center">
            <v-col cols="6" class="pa-0 d-flex justify-end">
              <v-list-item-avatar tile size="40">
                <v-img src="../../assets/rif.png" />
              </v-list-item-avatar>
            </v-col>
            <v-col cols="6" class="pa-0 d-flex justify-start">
              <v-list-item-subtitle class="item d-flex justify-start">
                {{ token.symbol }}
              </v-list-item-subtitle>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-list-item-subtitle class="item">
            {{ price | formatPrice }}<span class="ml-2 itemInfo">usd</span>
          </v-list-item-subtitle>
        </v-col>
        <v-col cols="2">
          <v-list-item-subtitle class="item"> {{ apr }}% </v-list-item-subtitle>
        </v-col>
        <v-col cols="3" class="px-0">
          <v-row class="ma-0">
            <v-col cols="9" class="pa-0 d-flex align-center">
              <v-list-item-subtitle class="item">
                {{ tokenBalance | formatNumber }}
              </v-list-item-subtitle>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2" class="px-0">
          <v-row class="ma-0">
            <v-col cols="9" class="pa-0 d-flex align-center">
              <v-list-item-subtitle class="item">
                <ToggleButton :market="market" />
              </v-list-item-subtitle>
            </v-col>
            <v-col cols="3" class="pa-0">
              <v-btn class="pa-0" icon @click="dialog = !dialog">
                <svg
                  width="11"
                  height="32"
                  viewBox="0 0 11 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L9 16L1 31"
                    stroke="#008CFF"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-list-item>
    <v-divider />
    <template v-if="dialog">
      <SupplyDialog :data="dataObject" @closed="reset" />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SupplyDialog from '@/components/dialog/supply/SupplyDialog.vue'
import ToggleButton from '@/components/common/ToggleButton.vue'

export default {
  name: 'SupplyItem',
  components: {
    SupplyDialog,
    ToggleButton,
  },
  props: {
    market: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      token: {
        name: null,
        symbol: null,
        decimals: 0,
      },
      price: 0,
      borrowRate: 0,
      dialog: false,
      tokenBalance: 0,
      currentComponent: 'SupplyList',
      supplyValue: 0,
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    apr() {
      return this.borrowRate.toFixed(2)
    },
    dataObject() {
      return {
        flag: this.dialog,
        borrowRate: this.borrowRate,
        price: this.price,
        token: this.token,
        market: this.market,
      }
    },
  },
  mounted() {
    this.$parent.$parent.$parent.$on('reload', this.reset)
  },
  created() {
    // set data token
    this.token = this.market.token
    console.log('A', this.market)
    this.market
      .getUserBalanceOfUnderlying()
      .then((balance) => {
        this.tokenBalance = balance
        return this.market.getPriceInDecimals()
      })
      // set price
      .then((price) => {
        this.price = price
        return this.market.getBorrowRate()
      })
      // set borrow rate block
      .then((borrowRatePerBlock) => {
        this.borrowRate = borrowRatePerBlock
      })
    // set supply of TODO
    this.supplyOf = this.market.supplyOf

    this.market.eventualEvents.then((events) => {
      events.allEvents().on('data', this.reset)
    })

    // let bla = this.market.token.balance.then(async (balance) => {
    //   console.log("BALANCE", balance);
    // });

    // this.market.instance
    //   .then((results) => Promise.all(results))
    //   .then(() => {
    //     return this.market.balance;
    //   })
    //   .then((balan) => {
    //     console.log(balan);
    //   });
    // this.market.eventualToken
    //   .then((tok) => [
    //     tok.eventualName,
    //     tok.eventualSymbol,
    //     tok.eventualDecimals,
    //     tok.eventualBalanceOf(this.account),
    //   ])
    //   .then((results) => Promise.all(results))
    //   .then(async ([name, symbol, decimals, balance]) => {
    //     console.log("name", name);
    //     // this.token.name = name;
    //     // this.token.symbol = symbol;
    //     // this.token.decimals = decimals;
    //     // this.tokenBalance = balance;
    //     return this.$rbank.controller.eventualMarketPrice(this.market.address);
    //   })
    //   .then((marketPrice) => {
    //     // this.price = marketPrice;
    //     return this.market.eventualBorrowRate;
    //   })
    //   .then((borrowRate) => {
    //     this.borrowRate = borrowRate;
    //     return this.market.updatedSupplyOf(this.account);
    //   })
    //   .then((supplyOf) => {
    //     this.supplyOf = supplyOf;
    //   });
  },
  methods: {
    reset() {
      this.dialog = false
      this.market
        .getUserBalanceOfUnderlying()
        .then((balance) => {
          this.tokenBalance = balance
          return this.market.getPriceInDecimals()
        })
        // set price
        .then((price) => {
          this.price = price
          return this.market.getBorrowRate()
        })
        // set borrow rate block
        .then((borrowRatePerBlock) => {
          this.borrowRate = borrowRatePerBlock
        })

      // this.$rbank.controller
      //   .eventualMarketPrice(this.market.address)
      //   .then((marketPrice) => {
      //     this.price = marketPrice;
      //     return this.market.eventualBorrowRate;
      //   })
      //   .then((borrowRate) => {
      //     this.borrowRate = borrowRate;
      //     return this.market.eventualToken;
      //   })
      //   .then((tok) => tok.eventualBalanceOf(this.account))
      //   .then((tokenBalance) => {
      //     this.tokenBalance = tokenBalance;
      //   });
      this.$emit('dialogClosed')
    },
  },
}
</script>
