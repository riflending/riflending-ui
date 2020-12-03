<template>
  <v-card width="50%" flat>
    <v-list>
      <v-list-item>
        <v-row>
          <v-col cols="3">
            <v-list-item-subtitle class="listTitle">Market</v-list-item-subtitle>
          </v-col>
          <v-col cols="3">
            <v-list-item-subtitle class="listTitle">Price</v-list-item-subtitle>
          </v-col>
          <v-col cols="2">
            <v-list-item-subtitle class="listTitle">APR</v-list-item-subtitle>
          </v-col>
          <v-col cols="4">
            <v-list-item-subtitle class="listTitle">Current Cash</v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider/>
      <borrow-item v-for="(market, idx) in markets"
                   :key="`market-${idx}`" :market="market" @dialogClosed="reset"/>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import BorrowItem from '@/components/borrow/BorrowItem.vue';

export default {
  name: 'BorrowList',
  data() {
    return {
      markets: [],
    };
  },
  methods: {
    reset() {
      this.$emit('listChange');
    },
    reloadItems() {
      this.$emit('reload');
    },
  },
  computed: {
  ...mapState({
      account: (state) => state.Session.account,
    }),
  },
  components: {
    BorrowItem,
  },
  created() {
    //get all markets
    this.markets = this.$middleware.getMarkets(this.account);

    this.markets.forEach((market) =>
      market.eventualEvents.then((events) =>
        events.liquidateBorrow().on("data", this.reloadItems)
      )
    );
    // this.$rbank.eventualMarkets
    //   .then((mkts) => {
    //     this.markets = mkts;
    //     this.markets.forEach((market) => market.eventualEvents
    //       .then((events) => events.liquidateBorrow().on('data', this.reloadItems)));
    //   });
  },
};
</script>
