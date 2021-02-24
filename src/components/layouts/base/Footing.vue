<template>
  <div>
    <v-footer class="footering" color="black lighten-1" padless>
      <v-container fluid>
        <v-row class="text-center">
          <v-col cols="4">
            <div class="my-1">
              <v-img src="../../../assets/footing/logo_black.png" height="75" contain />
            </div>
            <div class="my-1">
              <v-btn color="blue" text rounded href="https://test.rlending.app"> rLending </v-btn>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="my-1">
              <h1>Company</h1>
              <v-btn color="white" text rounded href="docs/introduction"> About rLending </v-btn>
              <v-btn color="white" text rounded href="privacy"> Privacy Policy </v-btn>
              <v-btn color="white" text rounded href="terms"> Terms &#38; Conditions </v-btn>
              <v-btn color="white" text rounded href="mailto:contact@rlending.app"> Contact </v-btn>
            </div>
          </v-col>
          <v-col cols="2">
            <div class="my-1">
              <h1>Protocol</h1>
              <v-btn
                color="white"
                text
                rounded
                href="https://github.com/riflending/rlending-protocol/tree/master/whitepaper/rLending-Whitepaper-v1.0.pdf"
                target="_blank"
              >
                Whitepaper
              </v-btn>
              <v-btn color="white" text rounded href="doc"> Documentation </v-btn>
              <v-btn color="white" text rounded href="faq"> F.A.Q.s </v-btn>
              <v-btn color="white" text rounded> Contribute </v-btn>
            </div>
          </v-col>
          <v-col cols="2">
            <div class="mx-14">
              <v-row>
                <a href="" target="_blank">
                  <v-img light width="50" :src="require(`@/assets/footing/Telegram-512.png`)" />
                </a>
              </v-row>
              <v-row>
                <a href="https://twitter.com/r_lending" target="_blank">
                  <v-img light width="50" :src="require(`@/assets/footing/twitter.png`)" />
                </a>
              </v-row>
              <v-row>
                <a href="https://github.com/riflending/" target="_blank">
                  <v-img light width="40" :src="require(`@/assets/footing/github.png`)" />
                </a>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <v-row class="licence">
          <v-col cols="12">
            <p class="text-left black--text text--lighten-2">&#169; 2021 rLending</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footing',
}
</script>
