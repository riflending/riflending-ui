<template>
  <div>
    <span
      class="toggle-wrapper"
      role="checkbox"
      :aria-checked="value.toString()"
      tabindex="0"
      @click="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="toggle-background" :class="backgroundStyles" />
      <span class="toggle-indicator" :style="indicatorStyles" />
    </span>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'ToggleMarketButton',
  props: {
    market: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      value: false,
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    backgroundStyles() {
      return {
        'gold-mid': this.value,
        'gray-lighter': !this.value,
      }
    },
    indicatorStyles() {
      return { transform: this.value ? 'translateX(14px)' : 'translateX(0)' }
    },
  },
  async created() {
    this.value = await this.market.checkMembership(this.account)
    console.log(`Market membership:`, this.market.symbol, `"${this.value}"`)
  },
  methods: {
    async toggle() {
      const message = this.value
        ? 'Are you sure you want to exit the market?'
        : 'Are you sure you want to enter the market?'
      const result = confirm(message)
      if (result) {
        try {
          this.$root.$emit('toggleMarketStatusTransaction', {
            status: 'waiting',
            value: this.value,
            message: '',
          })

          if (this.value) {
            // Exit the market
            const { events } = await this.market.exitMarket()
            if (events.length > 0 && events[0]?.event === 'Failure') {
              throw new Error(
                'There was a problem trying to exit the market, please try again later',
              )
            }
          } else {
            // Enter the market
            const { events } = await this.market.enterMarket()
            if (events.length > 0 && events[0]?.event === 'Failure') {
              throw new Error(
                'There was a problem trying to enter the market, please try again later',
              )
            }
          }
          this.value = !this.value
          const message = this.value
            ? 'You have successfully entered the market!'
            : 'You successfully exit the market!'

          this.$root.$emit('toggleMarketStatusTransaction', {
            status: 'success',
            value: this.value,
            message,
          })
        } catch (err) {
          this.$root.$emit('toggleMarketStatusTransaction', {
            status: 'error',
            value: this.value,
            message: err.message,
          })
        }
      }
    },
  },
}
</script>
