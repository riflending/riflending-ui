<template>
  <div id="top" class="docs">
    <v-list>
      <v-list-item>
        <v-row>
          <v-col>
            <v-btn
              :class="[currentComponent === 'Introduction' ? 'selected' : 'notSelected']"
              @click="currentComponent = 'Introduction'"
              >Introduction
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              :class="[currentComponent === 'KeyConcepts' ? 'selected' : 'notSelected']"
              @click="currentComponent = 'KeyConcepts'"
              >KeyConcepts
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              :class="[currentComponent === 'HowTo' ? 'selected' : 'notSelected']"
              @click="currentComponent = 'HowTo'"
              >How To
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              title="Loan to Value"
              :class="[currentComponent === 'Financial' ? 'selected' : 'notSelected']"
              @click="currentComponent = 'Financial'"
              >Financial
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              :class="[currentComponent === 'Contracts' ? 'selected' : 'notSelected']"
              @click="currentComponent = 'Contracts'"
              >Smart Contracts
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              :class="[currentComponent === 'Oracles' ? 'selected' : 'notSelected']"
              @click="currentComponent = 'Oracles'"
              >Oracles
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              :class="[currentComponent === 'Audits' ? 'selected' : 'notSelected']"
              @click="currentComponent = 'Audits'"
              >Security and Audits
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider />
      <v-container>
        <component :is="currentComponent" />
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
  data() {
    return {
      currentComponent: 'Introduction',
    }
  },
}
</script>

<style>
.selected {
  border-radius: 35px;
  background-color: #008cff !important;
}
.notSelected {
  background-color: #ffffff !important;
}
</style>
