import Vue from 'vue'
import * as constants from '@/store/constants'

const state = {
  account: null,
  instance: null,
  isOwner: false,
}

const actions = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_CONNECT_WEB3]: ({ commit }) => {
    if (Vue.web3Provider) {
      Vue.web3Provider.listAccounts().then(([account]) => {
        commit(constants.SESSION_SET_PROPERTY, { account })
        commit(constants.SESSION_SET_PROPERTY, { isOwner: false })
      })
    }
  },
}

const mutations = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_SET_PROPERTY]: (state, data) => {
    const [[property, value]] = Object.entries(data)
    state[property] = value
  },
}

const getters = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_IS_LOGGED]: (state) => !!state.account,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
