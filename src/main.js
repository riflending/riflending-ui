import Vue from 'vue'
import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Middleware } from './middleware/index'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './styles/main.scss'
import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

require('./filters')

Vue.config.productionTip = false

// eslint-disable-next-line no-multi-assign
Vue.prototype.$middleware = Vue.middleware = new Middleware()
// eslint-disable-next-line no-multi-assign
Vue.prototype.$rLogin = Vue.rLogin = new RLogin({
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          // 30: 'https://public-node.rsk.co',
          31: 'https://public-node.testnet.rsk.co',
        },
      },
    },
  },
  supportedChains: [31], // 30
})

Vue.prototype.$provider = null
Vue.prototype.$web3Provider = null

// Sentry log error service configuration
Sentry.init({
  Vue,
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
