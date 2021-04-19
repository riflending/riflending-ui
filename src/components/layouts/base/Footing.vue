<template>
  <div>
    <v-footer class="footer" color="lighten-1" padless>
      <v-container fluid>
        <v-row justify="center" class="black-footer">
          <v-col lg="3" sm="4" cols="12" class="pl-5">
            <a href="/" class="text-center">
              <v-img src="@/assets/footing/logo_black.png" class="logo" contain alt="rLending logo">
                rLending
              </v-img>
            </a>
          </v-col>
          <v-col lg="3" sm="4" cols="12" class="pl-5">
            <h1>Organization</h1>
            <a class="mt-3" href="docs/introduction"> About rLending </a>
            <a href="terms"> Terms &#38; Conditions </a>
            <a href="privacy"> Privacy Policy </a>
            <a href="mailto:contact@rlending.app"> Contact rLending</a>
          </v-col>
          <v-col lg="3" sm="4" cols="12" class="pl-5">
            <h1>Protocol</h1>
            <a class="mt-3" href="doc"> Docs </a>
            <a href="faq"> FAQs </a>
            <a
              href="https://github.com/riflending/rlending-protocol/tree/master/whitepaper/rLending-Whitepaper-v1.0.pdf"
              target="_blank"
            >
              Whitepaper
            </a>
            <a
              href="https://github.com/riflending/rlending-protocol/blob/master/audit/rLending_Security_Audit_Final_Report_v210303.pdf"
              target="_blank"
            >
              Audits
            </a>
          </v-col>
        </v-row>

        <v-row class="grey-footer">
          <v-col lg="5" sm="6" cols="12" offset-lg="1" align-self="center">
            <div class="copyright text-left">&#169; 2021 rLending. Beta version</div>
          </v-col>
          <v-col sm="6" cols="12" align-self="center" class="text-right pr-16">
            <a href="https://t.me/rLendingCommunity" target="_blank">
              <v-icon class="social-icon" large>mdi-telegram</v-icon>
            </a>
            <a href="https://github.com/riflending" target="_blank">
              <v-icon class="social-icon" large>mdi-github</v-icon>
            </a>
            <a href="https://twitter.com/r_lending" target="_blank">
              <v-icon class="social-icon" large>mdi-twitter</v-icon>
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
import { COMMIT_HASH } from '@/config/constants'

export default {
  name: 'Footing',
  data() {
    return {
      commitHash: COMMIT_HASH,
    }
  },
}
</script>
