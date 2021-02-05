import Vue from 'vue'
import { Decimal } from 'decimal.js-light'

Vue.filter('formatPrice', (value) => {
  const castedValue = value.isBigNumber ? value : Number(value)
  const val = castedValue.toFixed(2).replace(',', '.')
  return `$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
})

function toSD(value, digits = 6) {
  const castedValue = value.isBigNumber ? value : Number(value)
  Decimal.set({ rounding: Decimal.ROUND_UP, toExpNeg: -18, toExpPos: 36 })
  return new Decimal(castedValue.toFixed(digits)).toSignificantDigits(digits)
}

Vue.filter('formatToken', (value, decimals, digits = 6) => {
  const val = (value / 10 ** decimals).toFixed(decimals)
  return toSD(val, digits)
})

Vue.filter('formatNumber', toSD)

Vue.filter('formatPercentage', (value) => {
  const castedValue = value.isBigNumber ? value : Number(value)
  return `${castedValue.toFixed(2)} %`
})
