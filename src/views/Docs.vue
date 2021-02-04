<template>
  <div id="top" class="docs">
    <v-list>
      <v-list-item>
        <v-row>
          <v-col>
            <a href="#introduction">
              <v-list-item-subtitle class="listTitle">Introduction</v-list-item-subtitle>
            </a>
          </v-col>
          <v-col>
            <a href="#keyConcepts">
              <v-list-item-subtitle class="listTitle">Key Concepts</v-list-item-subtitle>
            </a>
          </v-col>
          <v-col>
            <a href="#howTo">
              <v-list-item-subtitle class="listTitle">How To</v-list-item-subtitle>
            </a>
          </v-col>
          <v-col>
            <a href="#financial">
              <v-list-item-subtitle class="listTitle" title="Loan to Value"
                >Financial and Maths</v-list-item-subtitle
              >
            </a>
          </v-col>
          <v-col>
            <a href="#smartContracts">
              <v-list-item-subtitle class="listTitle">Smart Contracts</v-list-item-subtitle>
            </a>
          </v-col>
          <v-col>
            <a href="#oracles">
              <v-list-item-subtitle class="listTitle">Oracles</v-list-item-subtitle>
            </a>
          </v-col>
          <v-col>
            <a href="#security">
              <v-list-item-subtitle class="listTitle">Security and Audits</v-list-item-subtitle>
            </a>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider />
      <v-container>
        <v-expansion-panels focusable inset>
          <v-expansion-panel>
            <v-expansion-panel-header> Introduction</v-expansion-panel-header>
            <v-expansion-panel-content><Introduction /> </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header> Key Concepts</v-expansion-panel-header>
            <v-expansion-panel-content><KeyConcepts /> </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header> How to</v-expansion-panel-header>
            <v-expansion-panel-content><HowTo /> </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header> Financial aspects and Math</v-expansion-panel-header>
            <v-expansion-panel-content><Financial /> </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header> Contracts</v-expansion-panel-header>
            <v-expansion-panel-content><Contracts /> </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header> Oracles</v-expansion-panel-header>
            <v-expansion-panel-content><Oracles /> </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header> Security and Audits</v-expansion-panel-header>
            <v-expansion-panel-content><Audits /> </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-list>
  </div>
</template>

<script>
import Introduction from '@/components/docs/1-introduction.vue'
import KeyConcepts from '@/components/docs/2-keyConcepts.vue'
import HowTo from '@/components/docs/3-howTo.vue'
import Financial from '@/components/docs/4-financialMath.vue'
import Contracts from '@/components/docs/5-contracts.vue'
import Oracles from '@/components/docs/6-oracles.vue'
import Audits from '@/components/docs/7-securityAudits.vue'

export default {
  name: 'Docs',
  components: {
    Introduction,
    KeyConcepts,
    HowTo,
    Financial,
    Contracts,
    Oracles,
    Audits,
  },
}
</script>
