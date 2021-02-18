<template>
  <Fragment>
    <v-app-bar class="app-bar ma-5" color="transparent" flat>
      <router-link class="title ml-lg-16" :to="{ name: 'Landing' }">
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col class="align-center">
              <h1>rLending</h1>
              <h1 v-show="isTestnet" class="subtitle-1 red--text text--darken-1">Testnet</h1>
            </v-col>
            <v-col>
              <v-img :src="require(`@/assets/rlending.png`)" alt="rLending logo" max-width="80" />
            </v-col>
          </v-row>
        </v-container>
      </router-link>
      <h2>{{ title }}</h2>
      <v-spacer />

      <div v-if="isLogged">
        <router-link class="mx-5" :to="{ name: 'MyActivity' }"> Dashboard </router-link>
        <router-link class="mx-5" :to="{ name: 'SupplyBorrow' }"> Supply/Borrow </router-link>
        <!-- <template v-if="isOwner"> -->
        <router-link class="mx-5" :to="{ name: 'Status' }"> Market Status </router-link>
        <!-- </template> -->
        <router-link class="mx-5" :to="{ name: 'Docs' }"> Docs </router-link>
        <router-link class="mx-5" :to="{ name: 'FAQ' }"> FAQs</router-link>
        <v-btn class="mx-5" rounded outlined color="#008CFF">
          {{ accountCutOff }}
        </v-btn>
      </div>
      <div v-else>
        <router-link class="mx-5" :to="{ name: 'Landing' }"> Home </router-link>
        <router-link class="mx-5" :to="{ name: 'Docs' }"> Docs </router-link>
        <router-link class="mx-5" :to="{ name: 'FAQ' }"> FAQs </router-link>
        <v-btn id="connectButton" class="ml-5 button" rounded color="#008CFF" @click="connect">
          <span class="mx-5">Connect wallet</span>
        </v-btn>
      </div>
    </v-app-bar>
    <v-alert
      border="right"
      colored-border
      type="error"
      elevation="2"
      :value="shouldDisplayWarningValidNetwork"
    >
      The network you are trying to connect is not supported...
    </v-alert>
  </Fragment>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import * as constants from '@/store/constants'
import Vue from 'vue'
import { ethers } from 'ethers'
import { Fragment } from 'vue-fragment'
import { NETWORK_ID } from '../../../config/constants'

export default {
  name: 'AppBar',
  components: {
    Fragment,
  },
  data() {
    return {
      shouldDisplayWarningValidNetwork: false,
      isTestnet: false,
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
      if (this.$route.path === '/supplyBorrow') return 'Supply / Borrow'
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
  methods: {
    ...mapActions({
      connectToWeb3: constants.SESSION_CONNECT_WEB3,
    }),
    validateNetwork(chainId) {
      this.shouldDisplayWarningValidNetwork = NETWORK_ID != parseInt(chainId)
      this.isTestnet = parseInt(chainId) == 31
      // Close the alert in 5 seconds
      setTimeout(() => {
        this.shouldDisplayWarningValidNetwork = false
      }, 5000)
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
