<template>
  <Fragment>
    <div class="system-var-beta">
      <v-system-bar dark color="black">
        <v-spacer></v-spacer>
        <span class="d-none d-sm-none d-md-flex">
          This website is still in BETA. This means rLending is in a testing phase and it is likely
          to contain errors</span
        >
        <span class="d-sm-flex d-md-none d-lg-none d-xl-none d-xl-flex">
          This website is still in BETA.
        </span>
      </v-system-bar>
      <br />
    </div>
    <v-app-bar class="app-bar ma-5" color="transparent" flat clipped-left>
      <v-toolbar flat fill-height align-center m-0 p-0>
        <v-btn large text class="title-button" @click="gotToLanding">
          <v-app-bar-title>
            <h1 class="pr-2">rLending</h1>
            <h2 v-show="isTestnet" class="red--text text--darken-1">Testnet</h2>
          </v-app-bar-title>
          <v-img class="title-logo" :src="require(`@/assets/rlending.png`)" alt="rLending logo" />
        </v-btn>
        <v-spacer></v-spacer>

        <v-toolbar-items v-if="isLogged" class="hidden-sm-and-down align-center">
          <v-btn text to="/myActivity" active-class="is-active" exact>Dashboard</v-btn>
          <v-btn text to="/supplyBorrow" active-class="is-active" exact>Supply/Borrow</v-btn>
          <v-btn text to="/status" active-class="is-active" exact>Markets</v-btn>
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
          <v-btn text to="/faq" active-class="is-active" exact>FAQs</v-btn>
          <v-btn rounded outlined class="disconnected-btn">
            {{ accountCutOff }}
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items v-if="!isLogged" class="hidden-sm-and-down align-center">
          <v-btn text to="/" active-class="is-active" exact>Home</v-btn>
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
          <v-btn text to="/faq" active-class="is-active" exact>FAQs</v-btn>
          <v-btn
            id="connectButton"
            ref="connectButton"
            rounded
            class="connected-btn"
            @click="connect"
          >
            Connect wallet
          </v-btn>
        </v-toolbar-items>

        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-toolbar>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary hide-overlay right>
      <v-list nav dense>
        <v-list-item-group v-if="!isLogged" active-class="text--accent-4">
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/docs/introduction">
            <v-list-item-icon>
              <v-icon>mdi-book-open-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Docs</v-list-item-title>
          </v-list-item>

          <v-list-item to="/faq">
            <v-list-item-icon>
              <v-icon>mdi-frequently-asked-questions</v-icon>
            </v-list-item-icon>
            <v-list-item-title>FAQs</v-list-item-title>
          </v-list-item>
          <v-list-item @click="connect">
            <v-list-item-icon>
              <v-icon>mdi-wallet</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Connect</v-list-item-title>
          </v-list-item>
        </v-list-item-group>

        <v-list-item-group v-if="isLogged" active-class="text--accent-4">
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/myActivity">
            <v-list-item-icon>
              <v-icon>mdi-chart-bar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item to="/supplyBorrow">
            <v-list-item-icon>
              <v-icon>mdi-bank</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Supply/Borrow</v-list-item-title>
          </v-list-item>

          <v-list-item to="/status">
            <v-list-item-icon>
              <v-icon>mdi-frequently-asked-questions</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Markets</v-list-item-title>
          </v-list-item>

          <v-list-item to="/docs/introduction">
            <v-list-item-icon>
              <v-icon>mdi-book-open-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Docs</v-list-item-title>
          </v-list-item>

          <v-list-item to="/faq">
            <v-list-item-icon>
              <v-icon>mdi-frequently-asked-questions</v-icon>
            </v-list-item-icon>
            <v-list-item-title>FAQs</v-list-item-title>
          </v-list-item>

          <v-list-item to="/faq">
            <v-list-item-icon>
              <v-icon>mdi-wallet-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ accountCutOff }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-alert
      border="right"
      colored-border
      type="error"
      elevation="2"
      :value="shouldDisplayWarningValidNetwork"
    >
      The network you are trying to connect is not supported...
    </v-alert>
    <template>
      <Snackbar />
    </template>
  </Fragment>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import * as constants from '@/store/constants'
import Vue from 'vue'
import { ethers } from 'ethers'
import { Fragment } from 'vue-fragment'
import { NETWORK_ID } from '@/config/constants'
import Snackbar from '@/components/common/Snackbar.vue'

export default {
  name: 'AppBar',
  components: {
    Fragment,
    Snackbar,
  },
  data() {
    return {
      shouldDisplayWarningValidNetwork: false,
      isTestnet: false,
      drawer: null,
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
  computed: {
    ...mapGetters({
      isLogged: constants.SESSION_IS_LOGGED,
    }),
    ...mapState({
      account: (state) => state.Session.account,
      isOwner: (state) => state.Session.isOwner,
    }),
    title() {
      if (this.$route.path === '/supplyBorrow') return 'Supply/Borrow'
      if (this.$route.path === '/myActivity') return 'My Activity'
      if (this.$route.path === '/status') return 'Status'
      return ''
    },
    accountCutOff() {
      return `${this.account.substring(0, 4)}...${this.account.substring(
        this.account.length - 4,
        this.account.length,
      )}`
    },
  },
  watch: {
    isOwner(val) {
      if (val) this.$router.push({ name: 'Status' })
    },
    isLogged() {
      this.$router.push({ name: 'MyActivity' })
    },
  },
  created() {
    this.isTestnet = NETWORK_ID === 31
  },
  methods: {
    ...mapActions({
      connectToWeb3: constants.SESSION_CONNECT_WEB3,
    }),
    validateNetwork(chainId) {
      this.shouldDisplayWarningValidNetwork = NETWORK_ID != parseInt(chainId)
      // Close the alert in 5 seconds
      setTimeout(() => {
        this.shouldDisplayWarningValidNetwork = false
      }, 5000)
    },
    gotToLanding() {
      if (this.$route.path !== '/') this.$router.push({ name: 'Landing' })
    },
    async connect() {
      try {
        // eslint-disable-next-line no-undef
        // await ethereum.enable();
        this.validateNetwork(window?.ethereum?.chainId ?? 0)

        this.$provider = await this.$rLogin.connect()
        this.$provider.on('accountsChanged', () => {
          window.location.reload(false)
        })

        this.$provider.on('error', (error) => {
          throw error
        })

        this.$provider.on('chainChanged', () => {
          window.location.reload(false)
        })

        Vue.provider = this.$provider

        this.$web3Provider = new ethers.providers.Web3Provider(this.$provider)
        // Fix transaction format from etherjs getTransactionReceipt as transactionReceipt format
        // checks root to be a 32 bytes hash when on RSK its 0x01
        const format = this.$web3Provider.formatter.formats
        format.receipt.root = format.receipt.logsBloom
        Object.assign(this.$web3Provider.formatter, { format })
        Vue.web3Provider = this.$web3Provider
      } catch (e) {
        this.$rLogin.clearCachedProvider()
      }
      this.connectToWeb3()
    },
  },
}
</script>
