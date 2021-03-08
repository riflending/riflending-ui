<template>
  <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        :class="$route.path.startsWith('/docs') ? 'is-active' : ''"
        v-bind="attrs"
        v-on="on"
      >
        Docs
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item
        v-for="(item, index) in docsSubsections"
        :key="index"
        :class="item.path === $route.path ? 'highlight' : ''"
        @click="item.method"
      >
        <v-list-item-action>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'DocsMenu',
  data() {
    return {
      docsSubsections: [
        {
          title: 'About',
          path: '/docs/introduction',
          method: () => this.$router.push({ name: 'Introduction' }),
        },
        {
          title: 'Glossary',
          path: '/docs/keyConcepts',
          method: () => this.$router.push({ name: 'KeyConcepts' }),
        },
        {
          title: 'How to',
          path: '/docs/howTo',
          method: () => this.$router.push({ name: 'HowTo' }),
        },
        {
          title: 'Financial',
          path: '/docs/financialMath',
          method: () => this.$router.push({ name: 'FinancialMath' }),
        },
        {
          title: 'Contracts',
          path: '/docs/contracts',
          method: () => this.$router.push({ name: 'Contracts' }),
        },
        {
          title: 'Oracles',
          path: '/docs/oracles',
          method: () => this.$router.push({ name: 'Oracles' }),
        },
        {
          title: 'Security',
          path: '/docs/securityAudits',
          method: () => this.$router.push({ name: 'SecurityAudits' }),
        },
        {
          title: 'Whitepaper',
          method: () =>
            window.open(
              'https://github.com/riflending/rlending-protocol/blob/master/whitepaper/rLending-Whitepaper-v1.0.pdf',
              '_blank',
            ),
        },
      ],
    }
  },
}
</script>
