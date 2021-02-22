import * as constants from '@/store/constants'
import * as Sentry from '@sentry/browser'

const state = () => ({
  snack: null,
  color: 'info',
  tx: 0,
  loader: false,
  subSnack: '',
})

const mutations = {
  [constants.SNACK_SET]: (state, snack) => {
    state.snack = snack
    state.color = 'info'
    state.loader = false
    state.subSnack = ''
    state.tx = 0
  },
  [constants.SNACK_SET_FAIL_TX]: (state, objSuccess) => {
    state.snack = 'Fail !'
    state.color = 'error'
    state.tx = 0
    state.loader = false
    state.subSnack = objSuccess.error
    Sentry.captureException(new Error(objSuccess.error))
  },
  [constants.SNACK_SET_SUCCESS_TX]: (state, objSuccess) => {
    state.snack = 'Success !'
    state.color = 'success'
    state.tx = objSuccess.tx
    state.loader = false
    state.subSnack = `You have successfully ${objSuccess.action} ${objSuccess.token} with ${objSuccess.amount}`
  },
  [constants.SNACK_SET_WAIT_TX]: (state) => {
    state.snack = ''
    state.color = 'info'
    state.loader = true
    state.subSnack = 'Awaiting transaction approval'
    state.tx = 0
  },
}

const getters = {
  getSnack() {
    return state.snack
  },
}

export default {
  state,
  mutations,
  getters,
}
