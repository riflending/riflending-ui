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
  name: 'ToggleButton',
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
    this.value = await this.market.checkMembership()
  },
  methods: {
    async toggle() {
      const message = this.value
        ? 'Are you sure you want to exit the market?'
        : 'Are you sure you want to enter the market?'
      const result = confirm(message)
      if (result) {
        try {
          this.$emit('wait')
          if (this.value) {
            // Exit the market
            await this.market.exitMarket()
          } else {
            // Enter the market
            await this.market.enterMarket()
          }
          this.$emit('succeed')
          this.value = !this.value
          this.$emit('input', !this.value)
        } catch (err) {
          this.$emit('error')
        }
      }
    },
  },
}
</script>
