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
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Docs',
}
</script>

<style>
.items {
  display: inline-table !important;
  padding: 0 60px;
  left: 45px !important;
  width: 95%;
  text-align: center;
}
</style>
