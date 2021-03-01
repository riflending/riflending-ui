<template>
  <div class="borrow-item dialog">
    <v-list-item>
      <v-row class="my-5 mx-0 d-flex align-center">
        <v-col cols="2">
          <v-row class="d-flex align-center">
            <v-col cols="6" class="pa-0 d-flex justify-end">
              <v-list-item-avatar tile size="40">
                <v-img
                  :src="require(`@/assets/tokens/${token.logo}.png`)"
                  :alt="`token ${token.logo} icon`"
                />
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
          <v-list-item-subtitle class="item">
            {{ borrowRate | formatPercentage }}
          </v-list-item-subtitle>
        </v-col>
        <v-col cols="2" class="px-0">
          <v-row class="ma-0">
            <v-list-item-subtitle class="item">
              {{ borrowBalance | formatToken(token.decimals) }}
            </v-list-item-subtitle>
          </v-row>
        </v-col>
        <v-col cols="2" class="px-0">
          <v-row class="ma-0">
            <v-list-item-subtitle class="item">
              <ToggleMarketButton :market="market" />
            </v-list-item-subtitle>
          </v-row>
        </v-col>
        <v-col cols="1">
          <v-btn class="pa-0" icon @click="dialog = !dialog">
            <svg
              width="11"
              height="32"
              viewBox="0 0 11 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L9 16L1 31" stroke="#008CFF" stroke-width="2" stroke-linecap="round" />
            </svg>
          </v-btn>
        </v-col>
      </v-row>
    </v-list-item>
    <v-divider />
    <template v-if="dialog">
      <BorrowDialog :data="dataObject" @closed="reset" v-on="$listeners" />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BorrowDialog from '@/components/dialog/borrow/BorrowDialog.vue'
import ToggleMarketButton from '@/components/common/ToggleMarketButton.vue'

export default {
  name: 'BorrowItem',
  components: {
    BorrowDialog,
    ToggleMarketButton,
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
        logo: null,
      },
      price: 0,
      borrowRate: 0,
      dialog: false,
      borrowBalance: 0,
      hasEnteredTheMarket: true,
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
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
    this.$parent.$parent.$parent.$on('reload', this.reload)
  },
  async created() {
    // set data token
    this.token = this.market.token
    this.borrowBalance = await this.market.borrowBalanceCurrent(this.account)
    this.price = await this.market.getPriceInDecimals()
    this.borrowRate = await this.market.getBorrowRate()
    this.hasEnteredTheMarket = await this.market.checkMembership(this.account)
  },
  methods: {
    async reset() {
      this.dialog = false
      this.token = this.market.token
      this.reload()
      this.$emit('dialogClosed')
    },
    async reload() {
      this.borrowBalance = await this.market.borrowBalanceCurrent(this.account)
      this.price = await this.market.getPriceInDecimals()
      this.borrowRate = await this.market.getBorrowRate()
      this.hasEnteredTheMarket = await this.market.checkMembership(this.account)
    },
  },
}
</script>
