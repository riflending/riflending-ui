<template>
  <v-navigation-drawer v-model="show" absolute temporary>
    <v-list nav dense>
      <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
        <FaqItems v-if="isFaq" />
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import * as constants from '@/store/constants'
import FaqItems from '@/components/common/FaqItems.vue'

export default {
  name: 'Snackbar',
  components: {
    FaqItems,
  },
  data() {
    return {
      show: false,
      group: null,
      isFaq: false,
      isDoc: false,
    }
  },
  watch: {
    group() {
      this.show = false
    },
  },
  created() {
    this.$store.watch(
      (state) => state.Drawer.drawer,
      () => {
        this.cleanSnack()
        this.show = true
        this.isFaq = this.$store.state.Drawer.isFaq
        this.isDoc = this.$store.state.Drawer.isDoc
        this.$store.commit(constants.SNACK_SET, null)
      },
    )
  },
  methods: {
    cleanSnack() {
      this.show = false
      this.group = null
      this.isDoc = false
      this.isFaq = false
    },
  },
}
</script>
