<template>
  <div id="top" class="faq">
    <div>
      <v-container>
        <v-navigation-drawer absolute permanent expand-on-hover>
          <p>FAQs</p>
          <p><a href="#whatIs">What exactly is rLending?</a></p>
          <p><a href="#canTrade">is rLending a DEX?</a></p>
          <p><a href="#howWorks">How does rLending work?</a></p>
          <p><a href="#howCost">Can I try it for free?</a></p>
          <p><a href="#getWallet">How do I get a wallet?</a></p>
          <p><a href="#howProfit">How does rLending profit?</a></p>
          <p><a href="#wallet">How to install a wallet</a></p>
          <p><a href="#testnet">Connecting to Testnet</a></p>
          <p><a href="#mainnet">Connecting to Mainnet</a></p>
          <p><a href="#gasPrice">Why Is Gas Price So High?</a></p>
          <p><a href="#earnings">How do accounts earn interests?</a></p>
          <p><a href="#howMuchEarnings">How much earnings can I expect?</a></p>
          <p><a href="#canBorrow">Can I borrow without a deposit? </a></p>
          <p><a href="#howBorrow">How does Borrowing work? </a></p>
          <p>
            <a href="#borrowFee"
              >What fees are involved inexpand-on-hoverll Of The Balance In The Contracts?
            </a>
          </p>
          <p><a href="#howColFact">How does Collateral Factor work?</a></p>
          <p><a href="#crossBorrow">Can I borrow from a market I have not supplied to?</a></p>
          <p><a href="#whatDebt">What happens if someone doesn't pay their debt?</a></p>
          <p>
            <a href="#reserves"
              >What's preventing someone from withdrawing all of the balance in the contracts?</a
            >
          </p>
          <p><a href="#priceVariation">How Can I Have More Debt Than Before? </a></p>
          <p><a href="#healthFactor">What Is A Health Factor? </a></p>
          <p><a href="#liquidation">What Happens If My Health Factor Becomes Negative?</a></p>
          <p><a href="#security">How Secure Is RLending? </a></p>
          <p><a href="#dev">I am a Developer </a></p>
          <p><a href="#help">General Troubleshooting </a></p>
          <p><a href="#support">How do I contact Support?</a></p>
        </v-navigation-drawer>
      </v-container>
    </div>
    <v-container>
      <v-row class="d-flex align-center justify-left">
        <v-col cols="10" class="flex-grow-0 flex-shrink-0">
          <center><h1 id="faq">FAQs</h1></center>
          <h2 id="whatIs">What exactly is rLending?</h2>
          <p>
            <strong>rLending</strong> is a decentralized investment and finance (better known as
            <em>DEFI</em>) platform. rLending is predicated on the tenants of non-custodial,
            trustless and secure systems with 100% uptime.
          </p>
          <p>This means:</p>

          <ul>
            <li>No single entity stores funds on behalf of the users.</li>
            <li>
              Users are not required to wait long times for someone to process their transactions.
            </li>
            <li>
              Transactions are highly secure (thanks to open protocols and independent auditors).
            </li>
            <li>24/7 accessibility from anywhere in the world.</li>
          </ul>
          <p>
            In other words, there is no central bank or government authority imposing rules on how
            to operate. Instead, the platform was designed to be completely self-regulating. This
            was achieved by programming the protocol using distributed
            <a href="https://en.wikipedia.org/wiki/Smart_contract">Smart Contracts</a> deployed on
            the <a href="">RSK Network</a>. Smart contracts handle the majority of logic that has
            historically been handled by human inputs, vastly optimizing transaction time and cost.
          </p>
          <p>
            <strong
              >With all this in mind, our main motivation is to allow users to lend crypto assets as
              collateral and to borrow them based on interest rates set by real-time supply and
              demand.</strong
            >
          </p>
          <h2 id="canTrade">Is rLending a Distributed Exchange (DEX)?</h2>
          <p>
            <strong>No.</strong> <em>Distributed Exchanges</em> allow users to exchange one
            cryptocurrency for another. On the other hand, at a high level, rLending is a financial
            permissionless lending system built on the <a href="https://www.rsk.co">RSK Network</a>.
            rLending enables users to lend and borrow popular cryptocurrencies like
            <a href="https://coinmarketcap.com/currencies/tether/">USDT</a> in exchange for interest
            or debt.
          </p>
          <h2 id="howWorks">How does it work?</h2>
          <p>
            rLending leverages audited
            <a href="https://en.wikipedia.org/wiki/Smart_contract">Smart Contracts</a> which are
            responsible for the storage, management and facilitation of all funds. This means that
            users do not have a rLending login, but rather connect to the
            <a href="https://www.rsk.co">RSK Network</a> and its benefits through web3 wallets.
            rLending Markets are always on, meaning that anyone can lend or borrow their assets in
            minutes without any intervention or permission request, since the
            <em>Smart Contracts</em> are self-regulating.
          </p>
          <p>
            <strong
              >Users supply their cryptoassets, which can either earn interest or act as collateral
              for loans. This creates a shared pool of liquidity. Traders can take short positions
              in tokens (Markets) supported by rLending.
            </strong>
          </p>
          <p>
            If you wish to know more about how the
            <a href="https://www.rsk.co">RSK Network</a> works, we recommend you take a closer look
            at
            <a href="https://blog.rsk.co/noticia/the-cutting-edge-of-sidechains-liquid-and-rsk/"
              >this article</a
            >.
          </p>
          <h2 id="howCost">How much does it cost? Can I try it for free?</h2>
          <p>
            All of the <a href="https://github.com/riflending/">rLending platform</a> is open
            sourced. The only costs involved in using the platform are related to the
            <a href="https://www.investopedia.com/terms/g/gas-ethereum.asp"> GAS price</a> and they
            vary for each transaction.
          </p>
          <p>
            You can always try rLending for free, since there is a
            <a href="http://test.rlending.app"> test-net deploy </a> of the protocol. To access it,
            follow the steps in the <a href="#testnet">section below</a>
          </p>
          <p>
            If you wish to know more about what a Test Network is and how it works, you might find
            <a href="https://cryptodefinitions.com/dictionary/testnet/"> this article</a> helpful.
          </p>
          <h2 id="howProfit">How does rLending make money?</h2>
          <p>
            The protocol takes no fees! So
            <strong>rLending doesn't generate any profit by itself.</strong> The project was funded
            by private investors in the hopes of building the basis for a stronger, smarter,
            non-custodial, trustless distributed ecosystem in the
            <a href="https://www.rsk.co">RSK Network</a>.
          </p>
          <p>
            As more projects like rLending emerge, it becomes easier and more secure to transition
            from a classic Centralized Financial System (<em>CEFI</em>) to a decentralized one
            (<em>DEFI</em>). See the <a href="docs#integration">Integration Section</a> in the
            <a href="docs">Documentation</a> to learn more about this.
          </p>
          <h2 id="getWallet">How do I get a wallet?</h2>
          <p>
            rLending supports both
            <a href="https://www.poa.network/for-users/nifty-wallet">Nifty</a> and
            <a href="https://metamask.io/">Metamask</a> wallets.
            <a href="https://www.rsk.co">RSK</a> has created a nice tutorial on how to configure
            both of them!
          </p>
          <p>
            For Nifty, click <a href="https://developers.rsk.co/wallet/use/nifty/">here</a>. For
            Metamask, click
            <a href="https://developers.rsk.co/wallet/use/metamask/">here</a>
          </p>
          <p>
            Remember: wallets are just a tool that allows the user to interact with the network. To
            read more about wallets and how they work, visit
            <a href="https://developers.rsk.co/wallet/">this article</a>
          </p>
          <h2 id="testnet">How do I connect to rlending in Test Network?</h2>
          <p>
            If you wish to try the platform and get comfortable with the features it provides but at
            the same time you are hessitant about moving valued cryptocurrencies, you can always
            connect through Testnet. Asuming you have your wallet extension installed, you will have
            to make certain you have it switched to <strong>RSK Testnet</strong>
          </p>
          <p align="center">
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/faq/niftyrsk.png"
              alt="nifty wallet connect"
            />
          </p>
          <p>
            Users of the RSK Network are able to request Testnet funds through the
            <a href="https://faucet.rsk.co/">RSK Testnet Faucet</a>. This faucet will provide your
            account with 0.05 T-rBTC to get you started on testing applications. There is also a
            <a href="https://faucet.rifos.org/"> Testnet tRIF faucet</a> if you wish to try it as
            well.
          </p>
          <p>
            Once you have your testnet funds (T-rBTC or t-RIF), head over to
            <a href="https://test.rlending.app">https://test.rlending.app</a>. Click on the blue
            boton at the top right corner. From here, users are prompted to connect with their
            <a href="#wallet">web3 wallet of choice.</a> (in this example we are using Nifty but
            Metamask is also supported)
          </p>
          <p>
            Once connected, you will see the
            <a href="http://test.rlending.app/myActivity">Main Screen</a> showing your account's
            <strong>Investment Dashboard</strong>. You are now connected to rLending in Testnet.
          </p>
          <p align="center">
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/faq/dashboard1.png"
              alt="new account dashboard"
            />
          </p>
          <p>
            <em>
              In case you need help configuring your wallet. For Nifty, click
              <a href="https://developers.rsk.co/wallet/use/nifty/">here</a>. For Metamask, click
              <a href="https://developers.rsk.co/wallet/use/metamask/">here</a>
            </em>
          </p>
          <h2 id="mainnet">How do I connect to rLending in main net?</h2>
          <p>
            Asuming you have your wallet extension installed (in this example we are using
            <em>Metamask</em>, but Nifty is also supported), you will have to make certain you have
            it switched to <strong>RSK Network</strong>
          </p>
          <p align="center">
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/faq/metamaskrsk.png"
              alt="metamask wallet connect"
            />
          </p>
          <p>
            head over to <a href="https://rlending.app">https://rlending.app</a>. Click on the blue
            boton at the top right corner. From here, users are prompted to connect with their
            <a href="#wallet">web3 wallet of choice.</a>
          </p>
          <p>
            Once connected, you will see the
            <a href="http://rlending.app/myActivity">Main Screen</a> showing your account's
            <strong>Investment Dashboard</strong>. You are now connected to rLending in Mainnet.
          </p>
          <p align="center">
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/assets/faq/dashboard1.png"
              alt="new account dashboard"
            />
          </p>
          <p>
            <em>
              In case you need help configuring your wallet. For Nifty, click
              <a href="https://developers.rsk.co/wallet/use/nifty/">here</a>. For Metamask, click
              <a href="https://developers.rsk.co/wallet/use/metamask/">here</a>
            </em>
          </p>
          <h2 id="gasPrice">Why is gas price so high?</h2>
          <p>
            The gas usage of the protocol functions may fluctuate by market and user. External
            calls, such as to underlying ERC-20 tokens, may use an arbitrary amount of gas. Any
            calculations that involve checking account liquidity, have gas costs that increase with
            the number of entered markets. Thus, while it can be difficult to provide any guarantees
            about costs, we provide the table below for guidance:
          </p>

          <ul>
            <li>Function Typical Gas Cost Mint &lt; 150K</li>
            <li>cUSDT &lt; 300k</li>
            <li>Redeem, Transfer &lt; 250K if borrowing, otherwise &lt; 90K</li>
            <li>Borrow &lt; 300K</li>
            <li>Repay Borrow &lt; 90K</li>
            <li>Liquidate Borrow &lt; 400K</li>
          </ul>
          <p>
            <em
              >If you wish to know more about what GAS is and how it works, you might find
              <a href="https://www.investopedia.com/terms/g/gas-ethereum.asp">
                this link educational</a
              >
            </em>
          </p>
          <h2 id="earnings">How do users earn money with rLending?</h2>
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
            We encourage you to read through <a href="docs">the documentation</a> where you will
            find <a href="docs#howInterests">a good example</a> on how this works.
          </p>
          <h2 id="howMuchEarnings">How much earnings can I expect?</h2>
          <p>
            Earnings depend upon many factors and it is always impossible to predict the future, but
            a good starting point is to run your own predictions based upon the
            <a href="docs#howInterest">APR</a> and <a href="docs#howData">Market Data</a> before
            performing any transaction
          </p>
          <h2 id="canBorrow">Can I borrow without a deposit?</h2>
          <p>
            <strong> No.</strong> In order to manage the risk factor, the platform does not allow
            for users to borrow funds without providing collateral. This is a common practice among
            <em>DEFI</em> implementations. We encourage you to read more about this topic in
            <a href="docs">the documentation</a>.
          </p>
          <h2 id="howBorrow">How does borrowing work?</h2>
          <p>
            In order to borrow you will be required to <a href="#whyDeposit">provide liquidity</a>.
            The percentage of liquidity of an asset required to borrow another is given by the
            market’s<a href="docs#collateralFactor"> Collateral Factor</a>. If you borrow, your
            <a href="docs#ctoken">CTokens</a> will act as collateral for your account, and your
            wallet will receive the <a href="docs#underlying"> underlying asset</a>.
          </p>

          <h2 id="borrowFee">What are the fees for borrowing?</h2>
          <p>
            You can check the current borrowing fees in the
            <a href="https://rlending.app/status">Market Data</a>. If you wish to know more about
            these values, we encourage you to check <a href="docs#howData">the documentation</a>.
          </p>
          <h2 id="howColFact">How does Collateral Factor work?</h2>
          <p>
            <strong>Collateral Factor</strong> is the percentage of supplied assets in a market that
            is locked as collateral for borrowing. If you wish to know more about these values, we
            encourage you to check <a href="docs#howData">the documentation</a>.
          </p>
          <h2 id="crossBorrow">Can I borrow from a market I have not supplied to?</h2>
          <p><strong>Yes!</strong>This is one of the most used transactions.</p>
          <h2 id="whatDebt">What happens if someone doesn't pay their debt?</h2>
          <p>
            Users incur in debt by borrowing assets. In order to borrow they have to
            <a href="#howBorrow">provide collateral</a> first. In the event that user's liquidity
            runs out, the account incurs in shortfall and becomes prone to liquidation.
          </p>
          <p>
            When an account is liquidated by another account, the liquidator buys a portion of the
            liquidated's underlying at a discount given by the
            <a href="docs#liquidation">Close Factor</a> (currently set to 8%).
          </p>
          <p>
            Getting liquidated is very bad, because the liquidated user looses a part of their
            underlying collateral provided.
          </p>
          <h2 id="reserves">
            What's preventing someone from withdrawing all of the balance in the contracts?
          </h2>
          <p>
            Even though rLending is self-regulating and it has mechanisms in place to prevent
            abuses. Self-regulating means there is an automated balance that runs the interest
            ratios for each market: if there is too much supply and not enough borrows to pay for
            them, the borrowing fees will automatically drop, becoming a more attractive investment
            opportunity. If on the other hand, demand is heavy on the borrows but supply is short,
            then the Supply Rate will rise to attract suppliers.
          </p>
          <p>
            In short: <em>supply and demand</em> automatically dictate the balance of each market.
          </p>
          <p>
            As for security measures, we encourage you to read up on them in
            <a href="docs#security">the documentation</a>. For example: the
            <a href="docs#reserveFactor">Reserve Factor</a> and the
            <a href="docs#multiSig">Multi-Sig system</a>.
          </p>
          <h2 id="priceVariation">How can I have more debt than before?</h2>
          <p>
            <a href="docs#debt">Debt and liquidity</a>are calculated in USD. This means that if a
            user supplies collateral on an asset with a volatile
            <a href="docs#marketPrice">market price </a>, the user's collateral provided becomes
            volatile as well.
          </p>
          <p>
            To mitigate this, the protocol tends to have higher
            <a href="#howColFact">collateral factor</a> for markets that are more volatile and lower
            for those with more stability.
          </p>
          <h2 id="healthFactor">What is a Health Factor?</h2>
          <p>
            <em>Health Factor</em> is the result of a formula that is used to predict how close to
            liquidation an account is.
          </p>
          <ul>
            Generally speaking:
            <li>HealthFactor &gt; 50% means your account is safe</li>
            <li>
              HealthFactor &gt; 15% and &lt; 50% means you should keep an eye on your collaterals
            </li>
            <li>HealthFactor &lt; 15% means you should probably provide more collateral</li>
            <li>
              HealthFactor &lt; 0% means you are prone to liquidation, because you have incured in
              more debt than collateral provided.
            </li>
          </ul>
          <h2 id="liquidation">What happens if my Health Factor becomes negative?</h2>
          <p>
            <strong
              >This is serious, but nothing happens immediately. You are still able to correct the
              situation.
            </strong>
            If this happens, your account is prone to liquidation. You should deposit more
            collateral and repay your borrows before another account liquidates your underlying.
          </p>
          <h2 id="security">How secure is rLending?</h2>
          <p>
            <strong>The r-Lending Protocol is compliant with modern security practices. </strong>
            This means the <a href="docs#contract">smart contracts</a> have been
            <a href="docs#audits">audited</a> both by internal and external third party
            professionals.
          </p>
          <p>
            <strong>
              The rLending app (<em> front end</em>) does not store any user information.</strong
            >
            It just provides the web services and functionalities to easily interact with the
            <a href="docs#contract">smart contracts</a> running in the back-end.
          </p>
          <p>
            rLending also has a <a href="docs#bugBounty">Bug Bounty program</a> with several open
            challenges to ethical hackers who wish to audit the source-code and find any
            vulnerability.
          </p>
          <hr />
          <center><h1 id="dev">I am a developer</h1></center>
          <h2 id="contracts">How do I interact with the smart contracts?</h2>
          <p>
            All of the smart contracts are listed and verified. You may find a list in
            <a href="docs#contracts">the documentation</a>, both for testnet and mainnet.
          </p>
          <h2 id="docs">Where can I find more info on...</h2>
          <p>
            We are currently working on building the social media communities, to create a hub
            connecting users. For now, you will find most technical information by reading
            <a href="docs">the documentation</a>.
          </p>
          <h2 id="howToDev">How can I contribute?</h2>
          <p>
            The <a href="https://github.com/riflending/rlending-protocol">rLending Protocol</a> is
            open source and publicly available, hosted on GitHub. We encourage developers and
            independent auditors to contribute by cloning the repository and creating Pull Requests.
          </p>
          <p>
            rLending also has a <a href="docs#bugBounty">Bug Bounty program</a> with several open
            challenges to ethical hackers who wish to audit the source-code and find any
            vulnerability.
          </p>
          <hr />
          <center><h1 id="help">Troubleshooting</h1></center>
          <h2>The website looks weird on my mobile phone:</h2>
          <p>
            Yes, while in Beta, the rLending platform is not designed to be used on mobile phones or
            tablets. A PC with a web browser is recomended.
          </p>
          <h2>I can't connect:</h2>
          <p>
            This is most likely due to a missconfiguration of the web3 wallet. We recomend you
            follow <a href="mainnet">these steps</a>. If you are still unable to connect, feel free
            to <a href="">contact us</a> or <a href="">join the Discord community</a>.
          </p>
          <h2>Transaction Reverted:</h2>
          <p>
            This means the blockchain has not been able to process your transaction. Whether you
            were trying to supply, withdraw, borrow or enter market, this is a common error that is
            most likely not going to repeat if you retry the action you were attempting to make. If
            the error persists, feel free to <a href="">contact us</a> or
            <a href="">join the Discord community</a>.
          </p>
          <h2>Why my health factor low?:</h2>
          <p>
            See <a href="#healthFactor"> Health Factor</a> and
            <a href="#priceVariation"> How can I have more debt than before?</a>
          </p>
          <h2>Can't see accounts when trying to liquidate:</h2>
          <p>
            The liquidation tab is not yet optimized and it will take a couple of minutes to load
            the proper data. Keep in mind that we are still in Beta, and there is a chance no
            account is prone to liquidation yet. Liquidations are very rare.
          </p>
          <hr />
          <h1 id="support">How do I contact Support?</h1>
          <p>
            You can reach out to us on any of our social media. You can join
            <a href="">join the Discord community hub</a> or <a href="">join us in telegram</a>.
          </p>
          <hr />
          <div class="pan-container" align="right">
            <a href="#">Back to top</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
