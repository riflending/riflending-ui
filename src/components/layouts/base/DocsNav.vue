<template>
  <div id="top" class="docs">
    <v-app-bar class="items">
      <v-row>
        <v-col>
          <v-btn :to="{ name: 'Introduction' }">Introduction </v-btn>
        </v-col>
        <v-col>
          <v-btn :to="{ name: 'KeyConcepts' }">Key Concepts </v-btn>
        </v-col>
        <v-col>
          <v-btn :to="{ name: 'HowTo' }">How To </v-btn>
        </v-col>
        <v-col>
          <v-btn :to="{ name: 'FinancialMath' }" title="Loan to Value">Financial </v-btn>
        </v-col>
        <v-col>
          <v-btn :to="{ name: 'Contracts' }">Smart Contracts </v-btn>
        </v-col>
        <v-col>
          <v-btn :to="{ name: 'Oracles' }">Oracles </v-btn>
        </v-col>
        <v-col>
          <v-btn :to="{ name: 'SecurityAudits' }">Security and Audits </v-btn>
        </v-col>
        <vcol>
          <v-btn
            href="https://github.com/riflending/rlending-protocol/tree/master/whitepaper/rLending-Whitepaper-v1.0.pdf"
            target="_blank"
          >
            Whitepaper</v-btn
          >
        </vcol>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'DocsNav',
}
</script>
