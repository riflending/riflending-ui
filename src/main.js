import Vue from 'vue'
import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Rbank from '@rsksmart/rbank'
import { Middleware } from './middleware/index'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './styles/main.scss'

require('./filters')

Vue.config.productionTip = false
// eslint-disable-next-line no-multi-assign
Vue.prototype.$rbank = Vue.rbank = new Rbank({
  [process.env.VUE_APP_NETWORK_ID]: {
    httpProvider: process.env.VUE_APP_HTTP_PROVIDER,
    wsProvider: process.env.VUE_APP_WSS_PROVIDER
  }
})
// eslint-disable-next-line no-multi-assign
Vue.prototype.$middleware = Vue.middleware = new Middleware()
// eslint-disable-next-line no-multi-assign
Vue.prototype.$rLogin = Vue.rLogin = new RLogin({
  cachedProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          // 30: 'https://public-node.rsk.co',
          31: 'https://public-node.testnet.rsk.co'
        }
      }
    }
  },
  supportedChains: [31] // 30
})

Vue.prototype.$provider = null
Vue.prototype.$web3Provider = null

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
