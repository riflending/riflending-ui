<template>
  <div>
    <DocsNav />
    <v-container>
      <v-row class="d-flex align-center justify-left">
        <v-col cols="12">
          <h1>Oracles:</h1>
          <p>
            A Price Oracle maintains the current exchange rate of each supported asset. These values
            are used to determine borrowing capacity, collateral requirements and for all functions
            which require calculating the value equivalent of an account.
          </p>
          <p>
            Although interest rates are determined by the balance between supply and demand,
            <strong>rLending</strong> relies partially on market prices. Since the protocol has the
            ability of listing dozens of markets, each requiring it&#39;s own Oracle with it&#39;s
            own set of rules, <strong>we created a customizable Oracle subsystem</strong> as part of
            the <strong>rLending Protocol</strong>.
          </p>

          <h1 id="architecture">Architecture:</h1>

          <p>
            <strong>rLending</strong>&#39;s Oracle subsystem is comprised by a set of
            <a href="https://github.com/riflending/rlending-protocol/tree/master/contracts"
              >smart contracts</a
            >.
          </p>

          <p>
            The main smart contract is the
            <a
              href="https://github.com/riflending/rlending-protocol/tree/master/contracts/PriceOracleProxy.sol"
              >PriceOracleProxy</a
            >. This contract acts as the single point of price consultation for the entire platform.
          </p>
          <p>
            Since there is no standard on how Oracles report their values and each market listed in
            the protocol requires an independent interaction with an oracle that provides its
            current exchange rate, we included an &quot;Adapter&quot; layer that acts as a
            middle-man between the
            <em>PriceProxyOracle</em> and the actual Oracle Contracts providing rates for each
            market.
          </p>
          <p>
            In order to preserve decentralization,
            <strong>rLending</strong> does not manage any of the oracles the protocol is currently
            using. We will talk in detail about this in the next section
            <a href="#security">Security and Audits</a>.
          </p>
          <p>Here is a diagram on the current state of the Oracle subsystem:</p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/oracles.png"
              alt="Oracles Subsystem Graph"
            />
          </p>
          <hr />
          <div class="pan-container">
            <a href="/docs/contracts">&laquo; Contracts</a>
            <a href="#">Back to top</a>
            <a href="/docs/securityAudits">Security and audits &raquo;</a>
          </div>
          <hr />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DocsNav from '@/components/layouts/base/DocsNav.vue'

export default {
  name: 'Oracles',
  components: {
    DocsNav,
  },
}
</script>
