<template>
  <div class="my-activity">
    <div v-if="dataLoaded" class="upper-banner">
      <v-dialog v-model="showHealthWarning" width="450">
        <v-card class="container">
          <v-row class="ma-0 py-2 d-flex justify-center">
            <v-icon color="#000000" large>report_problem</v-icon>
          </v-row>
          <v-row class="ma-0 py-2 d-flex justify-center">
            <h1 class="blackish">Watch out!</h1>
          </v-row>
          <v-row class="ma-0 pt-6 d-flex justify-center">
            <p class="text-center">
              Your Health Factor has dropped to <span class="redish"> 0%</span>!
            </p>
          </v-row>
          <v-row class="ma-0 px-3 d-flex justify-center">
            <p class="text-center">
              All your collaterals will be liquidated. If you wish to continue trading on rLending,
              feel free to supply new markets on the network.
            </p>
          </v-row>
        </v-card>
      </v-dialog>
      <v-row class="d-flex justify-center">
        <h1 class="my-5">Investment Dashboard</h1>
      </v-row>
      <!-- account balance -->
      <v-row class="ma-0 py-2">
        <v-col class="pa-0">
          <v-row class="ma-0 py-0">
            <v-col class="pa-0 d-flex justify-center">
              <v-card class="graphics-card container" width="94%">
                <v-row class="ma-0">
                  <v-col cols="12" class="py-0">
                    <v-row
                      v-for="item in totalBalance"
                      :key="item.toString().concat('balance')"
                      class="d-flex align-center"
                    >
                      <v-col cols="6" class="ma-0 d-flex align-center px-0"
                        ><h2>Account balance:</h2></v-col
                      >
                      <v-col cols="5" class="px-0">
                        <h2 class="text-center">
                          $
                          <number
                            ref="tweenedTotalBalance"
                            class="tweened-number-blue"
                            :from="item"
                            :to="item"
                            :format="tweenedFormat"
                            :duration="5"
                            :delay="1"
                            easing="Power0.easeIn"
                          />
                        </h2>
                      </v-col>
                      <v-col cols="1" class="pa-0"><span class="text-left">USD</span></v-col>
                    </v-row>
                    <v-row class="d-flex align-center mt-0 pt-1">
                      <v-divider />
                    </v-row>
                    <v-row v-for="(item, index) in totalSupplied" :key="`totalSupplied-${index}`">
                      <v-col cols="6" class="px-0">
                        <router-link :to="{ name: 'SupplyBorrow', params: { tab: 'supply' } }">
                          <h4 :style="{ textDecoration: 'underline' }">Total Supplied:</h4>
                        </router-link>
                      </v-col>
                      <v-col cols="5" class="px-0">
                        <h4 class="text-center">
                          $
                          <number
                            ref="tweenedTotalSupply"
                            class="tweened-number"
                            :from="item"
                            :to="item"
                            :format="tweenedFormat"
                            :duration="5"
                            :delay="1"
                            easing="Power0.easeIn"
                          />
                        </h4>
                      </v-col>
                      <v-col cols="1" class="pa-0"><span class="text-left">USD</span></v-col>
                    </v-row>
                    <v-row v-for="item in totalBorrowed" :key="item">
                      <v-col cols="6" class="px-0">
                        <router-link :to="{ name: 'SupplyBorrow', params: { tab: 'borrow' } }">
                          <h4 :style="{ textDecoration: 'underline' }">Total Borrowed:</h4>
                        </router-link>
                      </v-col>
                      <v-col cols="5" class="px-0">
                        <h4 class="text-center">
                          $
                          <number
                            ref="tweenedTotalBorrow"
                            class="tweened-number"
                            :from="item"
                            :to="item"
                            :format="tweenedFormat"
                            :duration="5"
                            :delay="1"
                            easing="Power0.easeIn"
                          />
                        </h4>
                      </v-col>
                      <v-col cols="1" class="pa-0"><span class="text-left">USD</span></v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="ma-0 py-2">
            <!-- halth factor -->
            <v-col class="pa-0 d-flex justify-center">
              <v-card class="graphics-card d-flex align-center" width="94%">
                <v-row class="ma-0">
                  <v-col cols="7">
                    <v-row class="ma-0 d-flex align-center">
                      <h2>Health Factor:</h2>
                      <v-tooltip top color="#E5E5E5">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon small class="mx-5" v-bind="attrs" v-on="on">info</v-icon>
                        </template>
                        <div class="tooltip">
                          Your Health Factor represents <br />
                          the state of your loans.
                          <span class="boldie">
                            Don't <br />
                            let it drop to
                            <span class="redish"> 0% </span></span
                          >
                          or your <br />
                          collateral might be liquidated!
                        </div>
                      </v-tooltip>
                    </v-row>
                    <v-row class="ma-0 pt-1">
                      <v-divider />
                    </v-row>
                    <v-row class="ma-0 pt-3">
                      <p>
                        Your account has a <b>{{ risk }}</b> risk of liquidation
                      </p>
                    </v-row>
                  </v-col>
                  <v-col cols="5" class="d-flex justify-center">
                    <v-progress-circular
                      :rotate="270"
                      :size="150"
                      :width="25"
                      :value="healthFactor"
                      :color="healthColor"
                    >
                      {{ accountHealth }}%
                    </v-progress-circular>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pa-0">
          <!-- supply borrow graph -->
          <v-card class="graphics-card container" width="94%">
            <SupplyBorrowGraph />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-0 py-2">
        <!-- markets prices -->
        <v-col class="pa-0 d-flex justify-center">
          <v-card class="graphics-card container" width="94%">
            <v-row class="ma-0 d-flex align-center">
              <v-col cols="12" class="py-0">
                <v-row class="d-flex align-center">
                  <v-col cols="9" class="ma-0 d-flex align-center"><h2>Markets Prices:</h2></v-col>
                </v-row>
                <v-row class="ma-0 pt-1">
                  <v-divider />
                </v-row>
                <v-row v-for="item in markets" :key="item.symbol" class="ma-0 d-flex align-center">
                  <v-col cols="3" class="px-0 text-center market-price-icon">
                    <v-list-item-avatar tile size="30">
                      <v-img
                        :src="require(`@/assets/tokens/${item.logo}.png`)"
                      /> </v-list-item-avatar
                  ></v-col>
                  <v-col cols="3" class="px-0 text-center market-price-icon">
                    <v-list-item-avatar tile size="30">
                      <v-img
                        v-if="item.priceUp > 0"
                        :src="require(`@/assets/myActivity/arrow_circle_up.svg`)"
                      />
                      <v-img
                        v-else-if="item.price < 0"
                        :src="require(`@/assets/myActivity/arrow_circle_down.svg`)"
                      />
                      <v-img
                        v-else
                        :src="require(`@/assets/myActivity/equal_circle.svg`)"
                      /> </v-list-item-avatar
                  ></v-col>
                  <v-col cols="3" class="px-0 text-no-wrap text-left market-price">
                    <h4 class="text-left">
                      $
                      <number
                        ref="number1"
                        class="tweened-number"
                        :from="item.oldPrice"
                        :to="item.price"
                        :format="tweenedFormat"
                        :duration="5"
                        :delay="1"
                        easing="Power0.easeIn"
                      />
                    </h4>
                  </v-col>
                  <v-col cols="2" class="pa-0 ml-2"><span class="text-left">USD</span></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- history tx  -->
        <v-col class="pa-0">
          <v-card class="graphics-card container" width="94%">
            <TransactionList />
          </v-card>
        </v-col>
      </v-row>

      <v-row class="ma-0"> </v-row>
    </div>
    <template v-else>
      <v-card flat class="loader d-flex align-center justify-center">
        <div class="container">
          <v-row class="my-5 d-flex justify-center">
            <v-progress-circular indeterminate :size="80" color="#008CFF" />
          </v-row>
        </div>
      </v-card>
    </template>
  </div>
</template>

<script>
import SupplyBorrowGraph from '@/components/dashboard/SupplyBorrowGraph.vue'
import TransactionList from '@/components/dashboard/TransactionList.vue'
import { mapState } from 'vuex'
import { cTokensDetails } from '../middleware/constants'
import Vue from 'vue'
import VueNumber from 'vue-number-animation'

Vue.use(VueNumber)

export default {
  name: 'MyActivity',
  components: {
    SupplyBorrowGraph,
    TransactionList,
  },
  data() {
    return {
      healthFactor: 0,
      totalBalance: [],
      totalSupplied: [],
      totalBorrowed: [],
      showHealthWarning: null,
      polling: null,
      markets: [],
      accountStorage: '',
      dataLoaded: false,
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    accountHealth() {
      return this.healthFactor.toFixed(2)
    },
    healthColor() {
      if (this.risk === 'high') return '#EB5757'
      if (this.risk === 'medium') return '#F2994A'
      return '#24BD6B'
    },
    risk() {
      if (this.healthFactor >= 30) {
        if (this.healthFactor >= 60) {
          return 'low'
        }
        return 'medium'
      }
      return 'high'
    },
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  async created() {
    for (const market of cTokensDetails) {
      this.$middleware.getAdapterPrice(market.adapter).then((price) => {
        this.markets.push({
          symbol: market.underlying.symbol,
          logo: market.logo,
          adapter: market.adapter,
          price: price.toNumber(),
          oldPrice: price.toNumber(),
          priceUp: 0,
        })
      })
    }
    await this.fetchData()
    this.dataLoaded = true
    this.pollData()
  },
  methods: {
    pollData() {
      this.polling = setInterval(async () => {
        await this.fetchData()
      }, 20000)
    },
    async fetchData() {
      const { borrowValue, supplyValue } = await this.$middleware.getTotalSupplysAndBorrows(
        this.account,
      )
      //refact this totals for int var and set in last hook
      this.totalBorrowed[0] = borrowValue.toNumber()
      this.totalSupplied[0] = supplyValue.toNumber()
      this.totalBalance[0] = supplyValue.minus(borrowValue).toNumber()
      const health = await this.$middleware.getAccountHealth(this.account)
      this.healthFactor = health > 1 ? 100 : health * 100
      this.showHealthWarning = Number(this.healthFactor) === 0
      this.getMarketsPrices()
    },
    async getMarketsPrices() {
      if (this.markets.length < 1) return
      for (const indice in this.markets) {
        this.$middleware.getAdapterPrice(this.markets[indice].adapter).then((price) => {
          this.markets[indice].price = price.toNumber()
          this.markets[indice].priceUp = this.markets[indice].price - this.markets[indice].oldPrice
          this.markets[indice].oldPrice = this.markets[indice].price
        })
      }
    },
    tweenedFormat(number) {
      return number.toFixed(3)
    },
  },
}
</script>
