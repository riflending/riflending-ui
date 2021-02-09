<template>
  <div id="top" class="faq">
    <v-container>
      <v-row class="d-flex align-center justify-left">
        <v-col cols="12">
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
          <h2 id="wallet">How do I get a wallet?</h2>
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
          <p></p>
          <h2 id="earnings">How do users earn money with rLending?</h2>
          <p></p>
          <h2 id="howMuchEarnings">How much earnings can I expect?</h2>
          <p></p>
          <h2 id="howBorrow">How does borrowing work?</h2>
          <p></p>
          <h2 id="whatFees">What are the fees for borrowing?</h2>
          <p></p>
          <h2 id="howColFact">How does Collateral Factor work?</h2>
          <p></p>
          <h2 id="crossBorrow">Can I borrow from a market I have not supplied to?</h2>
          <p></p>
          <h2 id="whatDebt">What happens if someone doesn't pay their debt?</h2>
          <p></p>
          <h2 id="reserves">
            What's preventing someone from withdrawing all of the balance in the contracts?
          </h2>
          <p></p>
          <h2 id="priceVariation">How can I have more debt than before?</h2>
          <p></p>
          <h2 id="healthFactor">What is a Health Factor?</h2>
          <p></p>
          <h2 id="liquidation">What happens if my Health Factor becomes negative?</h2>
          <p></p>
          <hr />
          <center><h1 id="dev">I am a developer</h1></center>
          <h2 id="contracts">How do I interact with the smart contracts?</h2>
          <p></p>
          <h2 id="docs">Where can I find more info on...</h2>
          <p></p>
          <h2 id="howToDev">How can I contribute?</h2>
          <p></p>
          <hr />
          <center><h1 id="help">Troubleshooting</h1></center>
          <h2>The website looks weird on my mobile phone:</h2>
          <p></p>
          <h2>I can't connect:</h2>
          <p></p>
          <h2>Transaction Reverted:</h2>
          <p></p>
          <h2>Why my health factor low?:</h2>
          <p></p>
          <h2>Can't see accounts when liquidate:</h2>
          <p></p>
          <hr />
          <h1 id="support">How do I contact Support?</h1>
          <p></p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
