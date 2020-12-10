import Vue from 'vue';

Vue.filter('formatPrice', (value) => {
  const val = (value / 1).toFixed(2)
    .replace(',', '.');
  return `$ ${val.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
});

Vue.filter('formatToken', (value, decimals) => {
  const val = (value / (10 ** decimals)).toFixed(decimals);
  const int = decimals > 0 ? val.substring(0, val.indexOf('.')) : val;
  const decimalZeros = val.substring(val.indexOf('.') + 1, val.length);
  const decimal = Number(decimalZeros) === 0 ? Number(decimalZeros)
    .toString() : decimalZeros.replace(/\.?0+$/, '');
  return decimals > 0 ? `${int
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimal}` : `${int
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
});

Vue.filter('shortenDecimals', (value) => {
  const decimals = 6
  const separatorIndex = value.indexOf('.')
  const int = decimals > 0 ? value.substring(0, separatorIndex) : value;
  const decimal = value.substring(separatorIndex + 1, separatorIndex + 1 + 6);
  return `${int}.${decimal}`;
});

Vue.filter('formatNumber', (value, decimals = 6) => value.toFixed(decimals));

Vue.filter('formatPercentage', (value) => `${Number(value).toFixed(2)} %`);
