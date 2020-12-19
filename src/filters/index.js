import Vue from 'vue'
import { Decimal } from 'decimal.js-light'

Vue.filter('formatPrice', (value) => {
  const val = (value / 1).toFixed(2).replace(',', '.')
  return `$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
})

function toSD(value, digits = 6) {
  Decimal.set({ rounding: Decimal.ROUND_UP, toExpNeg: -18, toExpPos: 36 })
  return new Decimal(Number(value).toFixed(digits)).toSignificantDigits(digits)
}

Vue.filter('formatToken', (value, decimals, digits = 6) => {
  const val = (value / 10 ** decimals).toFixed(decimals)
  return toSD(val, digits)
})

Vue.filter('formatNumber', toSD)

Vue.filter('formatPercentage', (value) => `${Number(value).toFixed(2)} %`)
