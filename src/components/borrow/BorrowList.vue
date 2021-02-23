<template>
  <v-card class="borrow-list" width="50%" flat>
    <v-list>
      <v-list-item>
        <v-row>
          <v-col cols="2">
            <v-list-item-subtitle class="listTitle">Market</v-list-item-subtitle>
          </v-col>
          <v-col cols="3">
            <v-list-item-subtitle class="listTitle">Price</v-list-item-subtitle>
          </v-col>
          <v-col cols="2">
            <v-list-item-subtitle class="listTitle">APR</v-list-item-subtitle>
          </v-col>
          <v-col cols="2">
            <v-list-item-subtitle class="listTitle">Borrow Balance</v-list-item-subtitle>
          </v-col>
          <v-col cols="2">
            <v-list-item-subtitle class="listTitle">Collateral</v-list-item-subtitle>
          </v-col>
          <v-col cols="1"> </v-col>
        </v-row>
      </v-list-item>
      <v-divider />
      <BorrowItem
        v-for="(market, idx) in markets"
        :key="`market-${idx}`"
        :market="market"
        @dialogClosed="reset"
        v-on="$listeners"
      />
    </v-list>
    <template v-if="toggleMarketTransactionStatus === 'success'">
      <SuccessDialog
        :message="toggleMarketTransactionMessage"
        :is-open="toggleMarketTransactionStatus === 'success'"
      />
    </template>
    <template v-if="toggleMarketTransactionStatus === 'waiting'">
      <WaitingDialog :is-open="toggleMarketTransactionStatus === 'waiting'" />
    </template>
    <template v-if="toggleMarketTransactionStatus === 'error'">
      <ErrorDisplayDialog
        :message="toggleMarketTransactionMessage"
        :is-open="toggleMarketTransactionStatus === 'error'"
      />
    </template>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import BorrowItem from '@/components/borrow/BorrowItem.vue'
import SuccessDialog from '@/components/dialog/SuccessDialog.vue'
import WaitingDialog from '@/components/dialog/WaitingDialog.vue'
import ErrorDisplayDialog from '@/components/dialog/ErrorDisplayDialog.vue'
import * as constants from '@/store/constants'

export default {
  name: 'BorrowList',
  components: {
    BorrowItem,
    SuccessDialog,
    WaitingDialog,
    ErrorDisplayDialog,
  },
  data() {
    return {
      markets: [],
      toggleMarketTransactionStatus: null,
      toggleMarketTransactionMessage: '',
      unsubscribeStore: null,
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
  },
  mounted() {
    this.$root.$on('toggleMarketStatusTransaction', ({ status, message }) => {
      this.toggleMarketTransactionStatus = status
      this.toggleMarketTransactionMessage = message
      if (status === 'success') {
        this.$emit('reload')
      }
    })
  },
  beforeDestroy() {
    if (typeof this.unsubscribeStore === 'function') this.unsubscribeStore()
  },
  async created() {
    // get all markets
    this.markets = await this.$middleware.getMarkets(this.account)
    this.unsubscribeStore = this.$store.subscribe((mutation) => {
      if (mutation.type === constants.SNACK_SET_SUCCESS_TX) {
        this.reloadItems()
      }
    })
  },
  methods: {
    reset() {
      this.$emit('listChange')
    },
    reloadItems() {
      this.$emit('reload')
    },
  },
}
</script>
