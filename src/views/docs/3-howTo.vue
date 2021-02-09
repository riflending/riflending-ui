<template>
  <div>
    <DocsNav />
    <v-container>
      <v-row class="d-flex align-center justify-left">
        <v-col cols="12">
          <h1 id="howPlatform-">How to connect to the platform:</h1>
          <p>
            In order to use <strong>rLending</strong> you will need your <em>Metamask</em> wallet
            connected to the <strong>RSK network</strong> Direct your browser towards the
            <a href="www.rlending.app"><strong>rLending</strong> website</a> and click
            <strong>Connect Wallet</strong>. The screen will let you connect your
            <em>Metamask/Nifty</em> wallet.
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/connecting.jpg"
              alt="Connecting"
            />
          </p>
          <p>
            This will prompt you to choose your account within <em>Metamask/Nifty</em>. After you
            have accepted the connection, you will be redirected to the <em>Home Dashboard</em>.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/dashboard.jpg"
              alt="Dashboard"
            />
          </p>
          <p>
            In this screen you will have an overview of the status of your account (Totals supplied,
            borrowed, available liquidity and health factor)
          </p>
          <p>&nbsp;</p>
          <hr />
          <h1 id="howDeposit">How to make a deposit:</h1>
          <p>
            <strong>rLending</strong> deposits are easy! After you have
            <em>connected your Metamask or Nifty wallet</em> you will be logged in and ready to
            supply funds.
          </p>
          <p>
            When you are ready to make a deposit, you will have to click on the
            <strong>Supply / Borrow</strong> tab, where you will be able to see the current status
            of your supplied assets.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/supplyList-0.jpg"
              alt="Supply List"
            />
          </p>
          <p>
            If this is the first time supplying, you might see a notice that lets you know how the
            toggle button works. We will go over it on the next section, in order to
            <strong>Borrow assets</strong>.
          </p>
          <p>
            For now, click on the asset you wish to supply (in this example, we are supplying rBTC).
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/supplyInput-2.jpg"
              alt="Supply Input"
            />
          </p>
          <p>
            At the top of this screen you will find the asset&#39;s data, current price and the
            amount of this token you have supplied <strong>converted to USD</strong>.
          </p>
          <p>
            Select the amount you wish to provide, and then click on
            <strong>Supply Tokens</strong> This will promtp your <em>Metamask/Nifty</em> for
            validation on the transaction.
          </p>
          <p>
            After the transaction has been broadcasted you will recieve confirmation and your funds
            will be credited to your account.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/supplySuccess.jpg"
              alt="Supply Success"
            />
          </p>
          <p>
            In this last screen we double check the amount we have supplied in
            <strong>Supply Balance</strong>. We can also see the current liquidity the contract is
            holding in <strong>Supplied to contract</strong>. The <strong>Borrow Limit</strong> will
            not show unless the account has provided collateral. We will do this in the next
            section.
          </p>
          <p>
            When a user supplies balance they immediately start earning interests, so
            <strong>Congratulations! You are already earning interests!!</strong>
          </p>
          <p>&nbsp;</p>
          <hr />
          <h1 id="howBorrow">How to make a borrow:</h1>
          <p>
            All right, when a user supplies balance they immediately start earning interests... but
            where do those interests come from? Short answer: <em>Borrowers</em>! Those accounts
            that borrow crypto assets from the <strong>rLending</strong> protocol pay a varying
            interest rate every rBTC block. The interest that borrowers pay produces the interest
            that suppliers earn.
          </p>
          <p>
            Before you can borrow you need to collateralize your account! An asset that is supplied
            to the protocol is not usable as collateral initially. In order to inform the protocol
            that you wish to use an asset as collateral, you must “enter the market” for that asset.
          </p>
          <p>
            <strong>Toggle the Collateral column to enter your supplied funds as collateral</strong>
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/toggle.jpg"
              alt="Toggling Market"
            />
          </p>
          <p>
            This will promtp you for confirmation. If you confirm, this will then prompt your
            <em>Metamask/Nifty</em> for confirmation, since this is a transaction that requires GAS.
          </p>
          <p>
            If successful, you will receive confirmation and the borrowing warning will dissapear
            from the background.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/enteredMarket.jpg"
              alt="Entered Market"
            />
          </p>
          <p>
            An account can enter multiple markets at one time. You can do this by toggling each one
            you would like to operate with.
            <strong
              >It is important to notice that in order to borrow from a market, you also need to
              enter that market, even if your account hasn&#39;t supplied balance to that
              market.</strong
            >
          </p>
          <p>In this example we will be borrowing <strong>RIF</strong></p>
          <p>&nbsp;</p>
          <hr />
          <h1 id="howWithdraw">How to make a withdrawal:</h1>
          <p>
            If at some point you decide you want to withdraw your funds, you should know you will be
            reedming your cToken balance in exchange for their respective underlying assets.
            Withdrawals are accessed through the Supply menu, in the Supply/Borrow page.
          </p>
          <p>First, log in. Then go to the Supply/Borrow market list.</p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/supplyList.jpg"
              alt="Supply/Borrow list"
            />
          </p>
          <p>There you will need to select the market that you wish to withdraw from.</p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/withdrawInput.jpg"
              alt="Withdraw Input"
            />
          </p>
          <p>
            After you&#39;ve chosen the amount you with to withdraw, click
            <em>Withdraw my tokens</em> and <em>Metamask/Nifty</em> will prompt you with the
            transaction.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/withdrawMetamask.jpg"
              alt="Withdraw Aproval"
            />
          </p>
          <p>
            After the withdrawal has been broadcasted you will recieve confirmation and your funds
            will be credited to your account.
          </p>
          <p><em>Note that big withdrawals may considerably reduce your health factor!!</em></p>
          <p>&nbsp;</p>
          <hr />
          <h1 id="howRepay">How to repay debt:</h1>
          <p>
            Borrows can be repaid using a function on the respective cToken contract. Once a borrow
            has been repaid, the account’s collateral can be entirely redeemed or transferred. There
            are also functions in the cToken contracts to repay a borrow on behalf of another
            account.
          </p>
          <p>&nbsp;</p>
          <hr />
          <h1 id="howLiquidate">How to liquidate underwater accounts:</h1>
          <p>
            In order to check the accounts that are prone to liquidation, go to the Supply dialog
            and then open up the Liquidation tab.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/liquidateInput.jpg"
              alt="Liquidation list"
            />
          </p>
          <p>
            It might take a while for the accounts to appear. When they do, you should be able to
            select one and select the asset in which you wish to cover the debt.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/liquidateInput2.jpg"
              alt="Liquidation list"
            />
          </p>
          <p>&nbsp;</p>
          <hr />
          <h1 id="howData">How to view market data:</h1>
          <p>
            Like mentioned earlier, markets represent each asset listed in the
            <strong>rLending Protocol</strong>. Every market evolves as supply and demand for an
            asset changes. This impacts several aspects of the protocol (liquidity, price, indexes,
            etc). If you want to check the current status of a market, you should go to the
            <a href="www.rlending.app/status">Status tab</a>.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/marketList.jpg"
              alt="Market List"
            />
          </p>
          <p>
            Here you will find the market list overview. More detailed information is found by
            clicking on the right arrow:
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/marketData.jpg"
              alt="Market Data"
            />
          </p>
          <p>&nbsp;</p>
          <hr />
          <h1 id="howInterest">How do tokens earn interests?:</h1>
          <p>
            Each market has its own Supply interest rate (APR). Interest isn&#39;t distributed;
            instead,
            <strong>simply by holding cTokens, you&#39;ll earn interest!</strong>
            <strong>cTokens</strong> accumulates interest through their exchange rate — over time,
            each cToken
            <strong
              >becomes convertible into an increasing amount of it&#39;s underlying asset</strong
            >, even while the number of cTokens in your wallet stays the same.
          </p>
          <p>
            Let’s say you supply <strong>1,000 RIF</strong> to the
            <strong>rLending</strong> protocol, when the exchange rate is <strong>0.020070</strong>;
            you would receive <strong>49,825.61 cRIF</strong> (1,000/0.020070).
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/aliceSupply.png"
              alt="Supply"
            />
          </p>
          <p>
            A few months later, you decide it’s time to withdraw your RIF from the protocol; suppose
            the exchange rate is now <strong>0.021591</strong>: Your
            <strong>49,825.61 cRIF</strong> is now equal to <strong>1,075.78 RIF</strong> (49,825.61
            <em>
              0.021591) You could withdraw <strong>1,075.78 RIF</strong>, which would redeem all
              <strong>49,825.61 cRIF</strong>. You could also withdraw a portion, such as your
              original <strong>1,000 RIF</strong>, which would redeem
              <strong>46,315.59 cRIF</strong> (keeping <em>*3,510.01 cRIF</em></em
            >
            in your wallet) or you could transfer your cTokens, effectively transferring your
            balance of underlying asset.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/aliceWithdraw.png"
              alt="Withdraw"
            />
          </p>
          <p>
            If you send your cTokens to a friend, your <strong>rLending</strong> balance will
            decline and your friend&#39;s will increase.
            <strong
              >A cToken transfer will fail if the account has entered that cToken market and the
              transfer would have put the account into a state of negative liquidity.</strong
            >
          </p>
          <h1 id="integration">rLending and the RSK ecosystem</h1>
          <p>
            <strong>rLenbding</strong> runs on the <a href="https://www.rsk.co/">RSK Network</a> but
            it is not an isolated application. The network has a
            <a href="https://tokenbridge.rsk.co/">Token Bridge</a> that allows bidirectional
            transfers betweenth RSK and the Ethereum Network. With this resource, users of the
            <strong>rLenbding Protocol</strong> are able to interact with assets from the Ethereum
            network.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/docs/integration.png"
              alt="Market Data"
            />
          </p>
          <p>
            For example, let's say a user holding rBTC wants to buy USDT. This is possible, by
            supplying rBTC as collateral and borrowing rKovUSDT(the pegged token in the RSK network)
            from the <strong>rLending Protocol</strong> Then it would be possible to use the
            <a href="https://tokenbridge.rsk.co/">Token Bridge</a>
            to exchange rKovUSDT for USDT.
          </p>
          <p>
            It would also be possible to interact with tokens though the
            <a href="https://rskswap.com/">RSK Swap</a> Dapp which allows for instant exchange
            between assets in the network.
          </p>
          <hr />
          <div class="pan-container">
            <a href="/docs/keyConcepts">&laquo; Key concepts</a>
            <a href="#">Back to top</a>
            <a href="/docs/financialMath">Financial Math &raquo;</a>
          </div>
          <hr />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DocsNav from '@/components/layouts/base/DocsNav.vue'

export default {
  name: 'HowTo',
  components: {
    DocsNav,
  },
}
</script>
