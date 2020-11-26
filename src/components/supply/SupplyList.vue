<template>
  <v-card width="50%" flat>
    <v-list>
      <v-list-item>
        <v-row>
          <v-col cols="3">
            <v-list-item-subtitle class="listTitle"
              >Market</v-list-item-subtitle
            >
          </v-col>
          <v-col cols="3">
            <v-list-item-subtitle class="listTitle">Price</v-list-item-subtitle>
          </v-col>
          <v-col cols="2">
            <v-list-item-subtitle class="listTitle">APR</v-list-item-subtitle>
          </v-col>
          <v-col cols="4">
            <v-list-item-subtitle class="listTitle"
              >Wallet</v-list-item-subtitle
            >
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider />
      <supply-item
        v-for="(market, idx) in markets"
        :key="`market-${idx}`"
        :market="market"
        @dialogClosed="reset"
      />
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import SupplyItem from "@/components/supply/SupplyItem.vue";

export default {
  name: "SupplyList",
  data() {
    return {
      markets: [],
    };
  },
  methods: {
    reset() {
      this.$emit("listChange");
    },
    reloadItems() {
      this.$emit("reload");
    },
  },
  components: {
    SupplyItem,
  },
  created() {
    this.markets=this.$middleware.getMarkets;

    this.markets.forEach((market) =>
      market.eventualEvents.then((events) =>
        events.liquidateBorrow().on("data", this.reloadItems)
      )
    );

    // this.$rbank.eventualMarkets.then((mkts) => {
    //   this.markets = mkts;
    //   // console.log("this.markets",  marketHelper.getMarkets);
    //   console.log("eventualMarket HELPER", middlewareHelper.getMarkets[0].eventualEvents);
    //   // console.log("eventualMarket HELPER out", marketHelper.eventualEvents);
    //   // console.log("mkts", mkts);
    //   // console.log("eventualMarket", mkts[0].eventualEvents);

    //   // this.markets.forEach((market) =>
    //   mkts.forEach((market) =>
    //     market.eventualEvents.then((events) =>
    //       events.liquidateBorrow().on("data", this.reloadItems)
    //     )
    //   );
    // });
  },
};
</script>
