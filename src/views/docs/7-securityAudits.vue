<template>
  <div>
    <v-container>
      <v-row class="d-flex align-center justify-left">
        <v-col cols="12">
          <h1>Security and audits:</h1>
          <p>
            <strong>rLending</strong> is a decentralized investment and finance (<em>DEFI </em>)
            platform that takes advantage on <strong>Bitcoin</strong>&#39;s stability and the
            <strong>RSK ecosystem</strong> to allow users to invest in a safe way.
            <strong>rLending</strong> is based upon our own core of
            <a href="https://github.com/riflending/rlending-protocol"><em>Smart Contracts</em></a>
            which originally forked from the
            <a href="https://compound.finance">Compound</a> project and built up on key features we
            designed and were later audited by third party independent companies.
          </p>
          <p>
            <strong
              >Security is our top priority and we are constantly auditing and improving the
              <em>rLending Protocol</em>. Funds are stored on a non-custodial smart contract on the
              RSK blockchain.
              <br />
              You control your wallet and you decide when and how to interact with the
              protocol.</strong
            >
          </p>
          <hr />
          <h1 id="audits">Audits:</h1>
          <p>
            As Compound is recognized to be one of the most audited and secure DEFI platforms
            deployed to the Ethereum Network, we decided to build up on it&#39;s basis and improve
            on the key aspects required in order to deploy on the RSK Network. Our development team,
            alongside third-party auditors and consultants, has invested considerable effort to
            create a protocol that we believe is safe and dependable. All contract code and balances
            are publicly verifiable. Developers and security researchers are eligible for a bug
            bounty for reporting undiscovered vulnerabilities.
          </p>
          <p>
            If you are interested in reading the auditor&#39;s report, you can find it
            <a href="">here</a>
          </p>
          <hr />
          <h1 id="eventualities">Eventualities:</h1>
          <p>
            In the eventual case that any of the smart contracts malfunction, the protocol has a
            fail-safe: a multi-signature smart contract (that requires several accounts to verify a
            transaction) that acts as a guardian and is able to pause the protocol, preventing
            abuses.
          </p>
          <p>
            <strong>rLending</strong> started with partially decentralized control of the protocol.
            In effect, the multi-signature smart contract protects the <strong>rLending</strong>,
            requiring the agreement of several accounts in order to perform significant changes that
            affect the platform.
          </p>
          <p>
            The following rights in the protocol are controlled by the Multi-signature smart
            contract:
          </p>
          <ul>
            <li>The ability to list a new cToken market</li>
            <li>The ability to update the interest rate model per market</li>
            <li>The ability to update the oracle or any adapter address</li>
            <li>The ability to withdraw the reserve of a cToken</li>
            <li>The ability to update the Comptroller contract</li>
            <li>The ability to choose a new admin</li>
          </ul>
          <hr />
          <div class="pan-container">
            <a href="/docs/oracles">&laquo; Oracles</a>
            <a href="#">Back to top</a>
            <a>- &raquo;</a>
          </div>
          <hr />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Audits',
}
</script>
