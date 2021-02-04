<template>
  <div>
    <v-container>
      <v-row class="d-flex align-center justify-left">
        <h1 id="howTo">How To</h1>
        <h2 id="howPlatform-">How to connect to the platform:</h2>
        <p>
          In order to use <strong>rLending</strong> you will need your <em>Metamask</em> wallet
          connected to the <strong>RSK network</strong> Direct your browser towards the
          <a href="www.rlending.com"><strong>rLending</strong> website</a> and click
          <strong>Connect Wallet</strong>. The screen will let you connect your
          <em>Metamask</em> wallet.
          <v-img
            contain
            max-height="650"
            max-width="850"
            src="@/components/docs/pictures/connecting.jpg"
            alt="Connecting"
          />
        </p>
        <p>
          This will prompt you to choose your account within <em>Metamask</em>. After you have
          accepted the connection, you will be redirected to the <em>Home Dashboard</em>.
        </p>
        <p>
          <v-img
            contain
            max-height="650"
            max-width="850"
            src="@/components/docs/pictures/dashboard.jpg"
            alt="Dashboard"
          />
        </p>
        <p>
          In this screen you will have an overview of the status of your account (Totals supplied,
          borrowed, available liquidity and health factor)
        </p>
        <p>&nbsp;</p>
        <hr />
        <h2 id="howDeposit">How to make a deposit:</h2>
        <p>
          <strong>rLending</strong> deposits are easy! After you have
          <em>connected your Metamask wallet</em> you will be logged in and ready to supply funds.
        </p>
        <p>
          When you are ready to make a deposit, you will have to click on the
          <strong>Supply / Borrow</strong> tab, where you will be able to see the current status of
          your supplied assets.
        </p>
        <p>
          <v-img
            contain
            max-height="650"
            max-width="850"
            src="@/components/docs/pictures/supplyList-0.jpg"
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
            src="@/components/docs/pictures/supplyInput-2.jpg"
            alt="Supply Input"
          />
        </p>
        <p>
          At the top of this screen you will find the asset&#39;s data, current price and the amount
          of this token you have supplied <strong>converted to USD</strong>.
        </p>
        <p>
          Select the amount you wish to provide, and then click on
          <strong>Supply Tokens</strong> This will promtp your <em>Metamask</em> for validation on
          the transaction.
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
            src="@/components/docs/pictures/supplySuccess.jpg"
            alt="Supply Success"
          />
        </p>
        <p>
          In this last screen we double check the amount we have supplied in
          <strong>Supply Balance</strong>. We can also see the current liquidity the contract is
          holding in <strong>Supplied to contract</strong>. The <strong>Borrow Limit</strong> will
          not show unless the account has provided collateral. We will do this in the next section.
        </p>
        <p>
          When a user supplies balance they immediately start earning interests, so
          <strong>Congratulations! You are already earning interests!!</strong>
        </p>
        <p>&nbsp;</p>
        <hr />
        <h2 id="howBorrow">How to make a borrow:</h2>
        <p>
          All right, when a user supplies balance they immediately start earning interests... but
          where do those interests come from? Short answer: <em>Borrowers</em>! Those accounts that
          borrow crypto assets from the <strong>rLending</strong> protocol pay a varying interest
          rate every rBTC block. The interest that borrowers pay produces the interest that
          suppliers earn.
        </p>
        <p>
          Before you can borrow you need to collateralize your account! An asset that is supplied to
          the protocol is not usable as collateral initially. In order to inform the protocol that
          you wish to use an asset as collateral, you must “enter the market” for that asset.
        </p>
        <p>
          <strong>Toggle the Collateral column to enter your supplied funds as collateral</strong>
        </p>
        <p>
          <v-img
            contain
            max-height="650"
            max-width="850"
            src="@/components/docs/pictures/toggle.jpg"
            alt="Toggling Market"
          />
        </p>
        <p>
          This will promtp you for confirmation. If you confirm, this will then prompt your
          <em>Metamask</em> for confirmation, since this is a transaction that requires GAS.
        </p>
        <p>
          If successful, you will receive confirmation and the borrowing warning will dissapear from
          the background.
        </p>
        <p>
          <v-img
            contain
            max-height="650"
            max-width="850"
            src="@/components/docs/pictures/enteredMarket.jpg"
            alt="Entered Market"
          />
        </p>
        <p>
          An account can enter multiple markets at one time. You can do this by toggling each one
          you would like to operate with.
          <strong
            >It is important to notice that in order to borrow from a market, you also need to enter
            that market, even if your account hasn&#39;t supplied balance to that market.</strong
          >
        </p>
        <p>In this example we will be borrowing <strong>RIF</strong></p>
        <p>&nbsp;</p>
        <hr />
        <h2 id="howWithdraw">How to make a withdrawal:</h2>
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
            src="@/components/docs/pictures/supplyList.jpg"
            alt="Supply/Borrow list"
          />
        </p>
        <p>There you will need to select the market that you wish to withdraw from.</p>
        <p>
          <v-img
            contain
            max-height="650"
            max-width="850"
            src="@/components/docs/pictures/withdrawInput.jpg"
            alt="Withdraw Input"
          />
        </p>
        <p>
          After you&#39;ve chosen the amount you with to withdraw, click
          <em>Withdraw my tokens</em> and <em>Metamask</em> will prompt you with the transaction.
        </p>
        <p>
          <v-img
            contain
            max-height="650"
            max-width="850"
            src="@/components/docs/pictures/withdrawMetamask.jpg"
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
        <h2 id="howRepay">How to repay debt:</h2>
        <p>
          Borrows can be repaid using a function on the respective cToken contract. Once a borrow
          has been repaid, the account’s collateral can be entirely redeemed or transferred. There
          are also functions in the cToken contracts to repay a borrow on behalf of another account.
        </p>
        <p>&nbsp;</p>
        <hr />
        <h2 id="howLiquidate">How to liquidate underwater accounts:</h2>
        <p>
          In order to check the accounts that are prone to liquidation, go to the Supply dialog and
          then open up the Liquidation tab.
        </p>
        <p>
          <v-img
            contain
            max-height="650"
            max-width="850"
            src="@/components/docs/pictures/liquidateInput.jpg"
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
            src="@/components/docs/pictures/liquidateInput2.jpg"
            alt="Liquidation list"
          />
        </p>
        <p>&nbsp;</p>
        <hr />
        <h2 id="howData">How to view market data:</h2>
        <p>
          Like mentioned earlier, markets represent each asset listed in the
          <strong>rLending Protocol</strong>. Every market evolves as supply and demand for an asset
          changes. This impacts several aspects of the protocol (liquidity, price, indexes, etc). If
          you want to check the current status of a market, you should go to the
          <a href="www.rlending.com/status">Status tab</a>.
        </p>
        <p>
          <v-img
            contain
            max-height="650"
            max-width="850"
            src="@/components/docs/pictures/marketList.jpg"
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
            src="@/components/docs/pictures/marketData.jpg"
            alt="Market Data"
          />
        </p>
        <p>&nbsp;</p>
        <hr />
        <h2 id="howInterest">How do tokens earn interests?:</h2>
        <p>
          Each market has its own Supply interest rate (APR). Interest isn&#39;t distributed;
          instead,
          <strong>simply by holding cTokens, you&#39;ll earn interest!</strong>
          <strong>cTokens</strong> accumulates interest through their exchange rate — over time,
          each cToken
          <strong>becomes convertible into an increasing amount of it&#39;s underlying asset</strong
          >, even while the number of cTokens in your wallet stays the same.
        </p>
        <p>
          Let’s say you supply <strong>1,000 RIF</strong> to the <strong>rLending</strong> protocol,
          when the exchange rate is <strong>0.020070</strong>; you would receive
          <strong>49,825.61 cRIF</strong> (1,000/0.020070). A few months later, you decide it’s time
          to withdraw your RIF from the protocol; suppose the exchange rate is now
          <strong>0.021591</strong>: Your <strong>49,825.61 cRIF</strong> is now equal to
          <strong>1,075.78 RIF</strong> (49,825.61
          <em>
            0.021591) You could withdraw <strong>1,075.78 RIF</strong>, which would redeem all
            <strong>49,825.61 cRIF</strong>. You could also withdraw a portion, such as your
            original <strong>1,000 RIF</strong>, which would redeem
            <strong>46,315.59 cRIF</strong> (keeping <em>*3,510.01 cRIF</em></em
          >
          in your wallet) or you could transfer your cTokens, effectively transferring your balance
          of underlying asset.
        </p>
        <p>
          If you send your cTokens to a friend, your <strong>rLending</strong> balance will decline
          and your friend&#39;s will increase.
          <strong
            >A cToken transfer will fail if the account has entered that cToken market and the
            transfer would have put the account into a state of negative liquidity.</strong
          >
        </p>
        <p>&nbsp;</p>
        <hr />
        <a href="#top">Back to top</a>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HowTo',
}
</script>
