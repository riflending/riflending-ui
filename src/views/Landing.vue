<template>
  <div class="landing container">
    <v-row class="d-flex align-center justify-center">
      <v-col cols="6">
        <v-row>
          <h1>Join the DeFi revolution on the RSK Network</h1>
        </v-row>
        <v-row class="my-3 simple-text-2">
          Enjoy the possibilities that Open Finance offers in a safe, clear and understandable way
        </v-row>
        <!-- <v-row class="d-flex align-start">
          <v-btn class="ma-0 button" rounded color="#008CFF" @click="scrollToTop">
            Go to rLending Dapp</v-btn>
        </v-row> -->
      </v-col>
      <v-col cols="6" class="hidden-sm-and-down justify-center align-center">
        <img class="landing-1" src="../assets/landing/Ellipse_20.png" alt="" />
      </v-col>
    </v-row>
    <v-row class="my-6 d-flex justify-center">
      <div class="my-6 divider"></div>
    </v-row>
    <v-row class="d-flex align-center">
      <v-col class="d-flex justify-center">
        <img src="../assets/landing/stats_and_graphs.png" alt="" />
      </v-col>
      <v-col>
        <v-row class="text-right">
          <h2>Experience the basics of lending and borrowing assets</h2>
        </v-row>
        <v-row class="my-6 text-right simple-text-2">
          Explore what you can do with your crypto assets and be part of the change to a more
          financially inclusive world
        </v-row>
        <!--<v-row class="d-flex flex-row-reverse">
          <v-btn class="ma-0 button" rounded color="#008CFF" @click="scrollToTop">
           Go to top and Connect!
          </v-btn>
        </v-row> -->
      </v-col>
    </v-row>
    <v-row class="my-6 d-flex justify-center">
      <div class="my-6 divider"></div>
    </v-row>
    <v-row class="ma-0 text-center">
      <v-col>
        <v-row class="d-flex justify-center">
          <h2>As easy as 1, 2, 3</h2>
        </v-row>
        <v-row class="my-6 simple-text-2 d-flex justify-center">
          Connect your wallet and start earning money in a few steps
        </v-row>
      </v-col>
    </v-row>
    <v-row class="my-6 text-center">
      <v-col>
        <v-row class="d-flex justify-center mx-6">
          <h4>1. Connect</h4>
        </v-row>
        <v-row class="d-flex justify-center mx-6">
          We support Metamask and Nifty Wallet. More coming soon!
        </v-row>
      </v-col>
      <v-col>
        <v-row class="d-flex justify-center mx-6">
          <h4>2. Supply and Borrow</h4>
        </v-row>
        <v-row class="d-flex justify-center mx-6">
          Use our simple interface to supply or borrow from markets in a few clicks
        </v-row>
      </v-col>
      <v-col>
        <v-row class="d-flex justify-center mx-6">
          <h4>3. Earn</h4>
        </v-row>
        <v-row class="d-flex justify-center mx-6">
          Supply tokens to earn interest with no risk, you can withdraw them whenever you want
        </v-row>
      </v-col>
    </v-row>
    <v-row class="my-6 py-6 d-flex justify-center">
      <div class="divider"></div>
    </v-row>
    <v-row class="my-6 text-center">
      <v-col>
        <v-row class="d-flex justify-center">
          <h2>Say goodbye to unexpected collateral liquidations</h2>
        </v-row>
        <v-row class="my-4 d-flex justify-center" :style="{ whiteSpace: 'pre-wrap' }">
          Introducing <strong>Health Factor</strong>, a way for you to keep an eye on the state of
          your loans
        </v-row>
        <v-row class="my-6 py-6 d-flex justify-center">
          <v-card class="health-card">
            <v-row>
              <v-col class="mx-3 px-6">
                <v-row class="health-card-title"> Health Factor: </v-row>
                <v-row>
                  <div class="divider-card"></div>
                </v-row>
                <v-row class="health-card-text"> Your account has a low risk of liquidation </v-row>
              </v-col>
              <v-col class="d-flex justify-center">
                <v-progress-circular
                  :rotate="270"
                  :size="100"
                  :width="15"
                  :value="95"
                  color="#6FCF97"
                >
                  <span>95%</span>
                </v-progress-circular>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-btn class="button" rounded color="#008CFF" @click="scrollToTop">
            Go to top and connect!
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  methods: {
    toMyActivity() {
      this.$router.push({ name: 'MyActivity' })
    },
    toGithub() {
      window.location.href = 'https://github.com/riflending/'
      this.$router.push('https://github.com/riflending/')
    },
    scrollToTop() {
      window.scrollTo(0, 0)
      const button = document.getElementById('connectButton')
      if (button.click) {
        button.click()
      }
    },
  },
}
</script>
