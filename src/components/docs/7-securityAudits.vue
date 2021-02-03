<template>
  <div>
    <v-container>
      <v-row class="d-flex align-center justify-left">
        <h1 id="security">Security and Audits</h1>
        <p>
          <strong>rLending</strong> is a decentralized investment and finance (<em>DEFI</em>)
          platform that takes advantage on <strong>Bitcoin</strong>&#39;s stability and the
          <strong>RSK ecosystem</strong> to allow users to invest in a safe way.
          <strong>rLenbding</strong> is bases upon our own core
          <a href="https://github.com/riflending/rlending-protocol"><em>Smart Contracts</em></a>
          which originated forked from (Compound)[<a href="https://compound.finance"
            >https://compound.finance</a
          >] and built up on key features that were later audited.
        </p>
        <p>
          <strong
            >Security is our top priority and we are constantly auditing and improving the
            <em>rLending Protocol</em>. Funds are stored on a non-custodial smart contract on the
            RSK blockchain. You control your wallet and you decide when and how to interact with the
            protocol.</strong
          >
        </p>
        <h2 id="audits-">Audits:</h2>
        <p>
          As Compound is recognized to be one of the most audited and secure DEFI platforms deployed
          to the Ethereum Network, we decided to build up on it&#39;s basis and improve on the key
          aspects required in order to deploy on the RSK Network. Our development team, alongside
          third-party auditors and consultants, has invested considerable effort to create a
          protocol that we believe is safe and dependable. All contract code and balances are
          publicly verifiable. Developers and security researchers are eligible for a bug bounty for
          reporting undiscovered vulnerabilities.
        </p>
        <p>
          If you are interested in reading the auditor&#39;s report, you can find it
          <a href="">here</a>
        </p>
        <hr />
        <h2 id="eventualities-">Eventualities:</h2>
        <p>
          In the eventual case that any of the smart contracts malfunction, the protocol has a
          fail-safe: a multi-signature smart contract (that requires several accounts to verify a
          transaction) that acts as a guardian and is able to pause the protocol, preventing abuses.
        </p>
        <p>
          <strong>rLending</strong> started with partially decentralized control of the protocol. In
          effect, the multi-signature smart contract protects the <strong>rLending</strong>,
          requiring the agreement of several accounts in order to perform significant changes that
          affect the platform.
        </p>
        <p>
          The following rights in the protocol are controlled by the Multi-signature smart contract:
        </p>
        <ul>
          <li>The ability to list a new cToken market</li>
          <li>The ability to update the interest rate model per market</li>
          <li>The ability to update the oracle or any adapter address</li>
          <li>The ability to withdraw the reserve of a cToken</li>
          <li>The ability to update the Comptroller contract</li>
          <li>The ability to choose a new admin</li>
        </ul>
        <p>
          Here is a list of the current addresses listed in the
          <a
            href="https://explorer.testnet.rsk.co/address/0x9760d4a155058f6bec8d9fd8d50222073e57083e"
            >Multi Signature Smart Contract</a
          >
        </p>
        <ul>
          <li>
            <a
              href="https://explorer.testnet.rsk.co/address/0x9760d4a155058f6bec8d9fd8d50222073e57083e"
              >0x9760d4A155058F6BeC8d9fD8D50222073e57083e</a
            >
          </li>
          <li>
            <a
              href="https://explorer.testnet.rsk.co/address/0x9760d4a155058f6bec8d9fd8d50222073e57083e"
              >0x9760d4A155058F6BeC8d9fD8D50222073e57083e</a
            >
          </li>
          <li>
            <a
              href="https://explorer.testnet.rsk.co/address/0x9760d4a155058f6bec8d9fd8d50222073e57083e"
              >0x9760d4A155058F6BeC8d9fD8D50222073e57083e</a
            >
          </li>
          <li>
            <a
              href="https://explorer.testnet.rsk.co/address/0x9760d4a155058f6bec8d9fd8d50222073e57083e"
              >0x9760d4A155058F6BeC8d9fD8D50222073e57083e</a
            >
          </li>
        </ul>
        <p>&nbsp;</p>
        <hr />
        <a href="#top">Back to top</a>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Audits',
}
</script>
