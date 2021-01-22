<template>
  <div class="supply-borrow-graph">
    <div>
      <v-row class="ma-0">
        <h1>My Supply-Borrow Factor:</h1>
      </v-row>
      <v-row class="ma-0 pt-1">
        <v-col cols="5" class="pa-0">
          <v-divider />
        </v-col>
        <v-col />
      </v-row>
    </div>
    <v-row class="ma-0 d-flex align-center">
      <v-col cols="3">
        <v-row class="d-flex justify-end">
          <h2 class="text-center">Supplied</h2>
        </v-row>
        <v-row class="d-flex justify-end">
          <p class="blackish">{{ totalSupplied | formatPrice }}</p>
        </v-row>
      </v-col>
      <v-col cols="6" class="d-flex justify-center">
        <GChart
          v-if="supplyBorrow"
          type="PieChart"
          :data="chartData"
          :options="chartOptions"
          :resize-debounce="500"
        />
        <GChart
          v-else
          type="PieChart"
          :data="emptyChart"
          :options="chartOptions"
          :resize-debounce="500"
        />
      </v-col>
      <v-col cols="3">
        <v-row class="d-flex justify-start">
          <h3 class="text-center">Borrowed</h3>
        </v-row>
        <v-row class="d-flex justify-start">
          <p class="blackish text-center">
            {{ totalBorrowed | formatPrice }}
          </p>
        </v-row>
      </v-col>
    </v-row>
    <div>
      <v-row class="d-flex justify-center">
        <h4>
          Overall Borrow limit<v-tooltip top color="#E5E5E5">
            <template v-slot:activator="{ on, attrs }">
              <v-icon small class="mx-5" v-bind="attrs" v-on="on">info</v-icon>
            </template>
            <div class="tooltip">
              Your <span class="boldie">Borrow Limit</span> <br />
              follows a complex formula <br />
              that involves your supplied<br />
              balance, market prices and <br />
              the state of your loans.<br />
              <span class="boldie">
                For more information<br />
                regarding this value<br />
                check the official documentation<br /><br />
              </span>
              <span class="boldie"> <span class="redish"> Don't let it become negative </span></span
              ><br />
              or your collateral might be liquidated!
            </div>
          </v-tooltip>
        </h4>
      </v-row>
      <v-row class="borrow-limit d-flex justify-center">
        {{ totalBorrowLimit | formatPrice }}
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GChart } from 'vue-google-charts'
import { ethers } from 'ethers'

export default {
  name: 'SupplyBorrowGraph',
  components: {
    GChart,
  },
  data() {
    return {
      totalBorrowed: 0,
      totalSupplied: 0,
      totalBorrowLimit: 0,
      emptyChart: [
        ['Type', 'Value'],
        ['data', 1],
      ],
      chartData: [
        ['Type', 'Value'],
        ['Supplied', 0],
        ['Borrowed', 0],
      ],
      chartOptions: {
        width: 200,
        height: 200,
        legend: 'none',
        pieSliceText: 'none',
        fontName: 'Rubik',
        colors: ['#008CFF', '#828282'],
        pieHole: 0.7,
        chartArea: {
          width: '100%',
          height: '100%',
        },
      },
      rBTCPrice: 0,
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    supplyBorrow() {
      return !!this.totalBorrowed || !!this.totalSupply
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$middleware.getTotals(this.account).then(({ supplyValue, borrowValue }) => {
        this.totalSupplied = supplyValue
        this.totalBorrowed = borrowValue
        this.getBorrowLimit()
        this.updateDiagramData()
      })
    },
    getBorrowLimit() {
      this.$middleware
        .getAccountLiquidity(this.account)
        .then(({ err, accountLiquidityInExcess, accountShortfall }) => {
          if (err != 0) console.log('ERROR IN ACCOUNT LIQUIDITY. Code:', err)
          if (accountLiquidityInExcess != 0) {
            this.totalBorrowLimit = ethers.utils.formatEther(accountLiquidityInExcess)
          } else {
            this.totalBorrowLimit = ethers.utils.formatEther(accountShortfall) * -1
          }
        })
    },
    updateDiagramData() {
      this.chartData = [
        ['Type', 'Value'],
        ['Supplied', +this.totalSupplied],
        ['Borrowed', +this.totalBorrowed],
      ]
    },
  },
}
</script>

<style scoped></style>
