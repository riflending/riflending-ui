import Vue from 'vue'
import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Middleware, User } from './middleware/index'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './styles/main.scss'
import VueGtag from 'vue-gtag'
import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import { NETWORK_ID } from './config/constants'
import Hotjar from 'vue-hotjar'

require('./filters')

Vue.config.productionTip = false

// eslint-disable-next-line no-multi-assign
Vue.prototype.$middleware = Vue.middleware = new Middleware()
// eslint-disable-next-line no-multi-assign
Vue.prototype.$user = Vue.user = new User()
// eslint-disable-next-line no-multi-assign
Vue.prototype.$rLogin = Vue.rLogin = new RLogin({
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          30: 'https://public-node.rsk.co',
          31: 'https://public-node.testnet.rsk.co',
        },
      },
    },
  },
  supportedChains: [NETWORK_ID],
})

Vue.prototype.$provider = null
Vue.prototype.$web3Provider = null

if (process.env.VUE_APP_SENTRY_DSN) {
  // Sentry log error service configuration
  Sentry.init({
    Vue,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    release: 'rlending-ui@' + process.env.npm_package_version,
    logErrors: true,
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  })
}

if (
  process.env.VUE_APP_GOOGLE_ANALYTICS_ID &&
  process.env.VUE_APP_GOOGLE_ANALYTICS_APPLICATION_NAME
) {
  Vue.use(
    VueGtag,
    {
      config: { id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID },
      appName: process.env.VUE_APP_GOOGLE_ANALYTICS_APPLICATION_NAME,
      pageTrackerScreenviewEnabled: true,
    },
    router,
  )
}

if (process.env.VUE_APP_HOTJAR_ID) {
  Vue.use(Hotjar, {
    id: process.env.VUE_APP_HOTJAR_ID, // Hotjar Site ID,
    isProduction: process.env.NODE_ENV == 'production' ? true : false,
  })
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
