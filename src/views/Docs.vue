<template>
  <div class="docs">
    <v-list>
      <v-list-item>
        <v-row>
          <v-col>
            <v-list-item-subtitle class="listTitle">Introduction</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">Key Concepts</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">How To</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle" title="Loan to Value"
              >Financial and Maths</v-list-item-subtitle
            >
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">Smart Contracts</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">Oracles</v-list-item-subtitle>
          </v-col>
          <v-col>
            <v-list-item-subtitle class="listTitle">Security and Audits</v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider />
      <Introduction />
      <KeyConcepts />
      <HowTo />
    </v-list>
  </div>
</template>

<script>
import Introduction from '@/components/docs/1-introduction.vue'
import KeyConcepts from '@/components/docs/2-keyConcepts.vue'
import HowTo from '@/components/docs/3-howTo.vue'

export default {
  name: 'Docs',
  components: {
    Introduction,
    KeyConcepts,
    HowTo,
  },
}
</script>
