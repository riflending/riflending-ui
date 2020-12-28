<template>
  <div class="succeed-success">
    <div class="successBox">
      <v-row class="my-5 d-flex justify-center">
        <h1 class="blueish">Success!</h1>
      </v-row>
      <v-row class="my-5 d-flex justify-center">
        <div class="text-center">
          Transaction successfully finished.
        </div>
      </v-row>
    </div>
    <TransactionHash :hash="data.hash" />
    <v-row class="my-5 d-flex justify-center">
      <v-btn class="button" rounded color="#008CFF" @click="closeDialog">
        Close
      </v-btn>
    </v-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TransactionHash from '@/components/common/TransactionHash.vue'

  export default {
    name: 'SucceedDialog',
    components: {
      TransactionHash,
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    computed: {
      ...mapState({
        account: (state) => state.Session.account,
      }),
    },
    methods: {
      closeDialog() {
        this.$emit('closeDialog')
      },
    },
  }
</script>
