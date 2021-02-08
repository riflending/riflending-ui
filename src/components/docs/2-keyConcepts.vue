<template>
  <div>
    <v-container>
      <v-row class="d-flex align-center justify-left">
        <v-col cols="12">
          <h1 id="account">Account:</h1>
          <p>
            In <strong>rLending</strong>, each account is represented by the
            <strong>rBTC</strong> address that holds the assets and administers the transactions.
          </p>
          <p></p>
          <hr />
          <h1 id="markets">Markets:</h1>
          <p>
            The smart contracts that power the <strong>rLending Protocol</strong> are deployed to
            the RSK blockchain. This means that at the time of this guide’s writing, the only types
            of assets that <strong>rLending</strong> can support are rBTC and ERC-20 tokens deployed
            on RSK.
          </p>
          <p>
            <strong>Markets</strong> are the internal architecture <strong>rLending</strong> uses
            for representing each asset listed in the protocol. They are essentially
            <em>a large pool of liquidity</em> that is formed by users providing liquidity and at
            the same time it is available for other users to borrow. Borrowers pay back their
            interests to the pool as they share in the interest with suppliers. In other words:
            Every supply earns interests and in order to borrow an asset, users must first supply
            collateral to a market.
          </p>
          <p><strong>Each underlying market is internally represented with a cToken</strong></p>
          <p></p>
          <hr />
          <h1 id="supplyingAssets">Supplying Assets:</h1>
          <p>
            Unlike an exchange or peer-to-peer platform, where a user’s assets are matched and lent
            to another user, the <strong>rLending Protocol</strong> aggregates the supply of each
            account, effectively generating a pool from each listed market. In other words:
            <strong>when a user supplies an asset, it becomes a fungible resource</strong>. This
            approach offers <em>significantly</em> more liquidity than direct lending; unless every
            asset in a market is borrowed (see below: <a href="#liquidity">liquidity</a>), users can
            <a href="#withdrawal">withdraw</a> their assets at any time, without waiting for a
            specific loan to mature.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/components/docs/pictures/supplyCycle.png"
              alt="supplyCycle"
            />
          </p>
          <p>
            Assets supplied to a market are represented by an ERC-20 token balance (<a
              href="#ctokens"
              >cToken</a
            >), which entitles the owner to an increasing quantity of the underlying asset. As the
            money market accrues interest, which is a function of borrowing demand, cTokens become
            convertible into an increasing amount of the underlying asset.
            <strong>In this way, earning interest is as simple as holding a ERC-20 cToken.</strong>
          </p>
          <p></p>
          <hr />
          <h1 id="borrowingAssets">Borrowing Assets:</h1>
          <p>
            <strong>rLending</strong> allows users to frictionlessly borrow from the protocol, using
            cTokens as collateral, <em>for use anywhere in the RSK ecosystem</em>. Unlike
            peer-to-peer protocols, borrowing from <strong>rLending</strong> simply requires a user
            to specify a desired asset; there are no terms to negotiate, maturity dates, or funding
            periods; <strong>borrowing is instant and predictable</strong>.
          </p>
          <p>
            <v-img
              contain
              max-height="650"
              max-width="850"
              src="@/components/docs/pictures/borrowCycle.png"
              alt="borrowCycle"
            />
          </p>
          <p>
            to supplying an asset, each listed market has a floating interest rate, set by market
            forces, which determines the borrowing cost for each asset.
          </p>
          <p></p>
          <hr />
          <h1 id="ctokens">cTokens:</h1>
          <p>
            Each asset supported by the
            <a href="https://github.com/riflending/rlending-protocol"
              ><strong>rLending Protocol</strong></a
            >
            is integrated through a <strong>cToken Smart Contract subsystem</strong>, which is an
            <strong>EIP-20</strong> compliant representation of balances supplied to the protocol.
            By minting cTokens, users may: 1) Earn interest through the cToken&#39;s exchange rate,
            which increases in value relative to the underlying asset, and 2) Gain the ability to
            use cTokens as collateral for borrowing assets.
          </p>
          <p></p>
          <hr />
          <h1 id="earningInterests">Earning Interests:</h1>
          <p>
            When users and applications supply an asset to the <strong>rLending Protocol</strong>,
            they begin <strong>earning a variable interest rate instantly</strong>. Interest accrues
            every block (currently ~30 seconds) and users can
            <a href="#withdrawal">withdraw</a> their principal plus interest anytime. Under the
            hood, users are contributing their assets to a large pool of liquidity (a “<a
              href="#markets"
              >market”</a
            >) that is available for other users to borrow, and they share in the interest that
            borrowers pay back to the pool.
          </p>
          <p>
            When users supply assets, they receive cTokens from <strong>rLending</strong> in
            exchange. cTokens are ERC20 tokens that can be redeemed for their underlying assets at
            any time. As interest accrues to the assets supplied, cTokens are redeemable at an
            exchange rate (relative to the underlying asset) that constantly increases over time,
            based on the rate of interest earned by the underlying asset.
          </p>
          <p></p>
          <hr />
          <h1 id="collateral">Collateral:</h1>
          <p>
            Assets held by the protocol (represented by ownership of a
            <a href="#ctokens">cToken</a>) are used as collateral to borrow from the protocol. Each
            <a href="#markets">market</a> has a collateral factor, ranging from 0 to 1, that
            represents the portion of the underlying asset value that can be borrowed.
            <strong
              >The sum of the value of an accounts underlying token balances, multiplied by the
              collateral factors, equals a user’s borrowing capacity.</strong
            >
          </p>
          <p>
            Users are able to borrow up to, <em>but not exceeding</em>, their borrowing capacity,
            and an account can take no action (e.g. borrow, transfer cToken collateral, or redeem
            cToken collateral) that would raise the total value of borrowed assets above their
            borrowing capacity (<a href="#borrowlimit">borrow limit</a>); this protects the protocol
            from default risk.
          </p>
          <p>
            <strong>Collateral</strong> is the guarantee that users provide that allows them to
            borrow on any given market. In order to supply collateral, users must first activate the
            <em>Enter Market</em> toggle.
          </p>
          <p>
            <strong
              >Note that a user cannot borrow without having supplied collateral first.</strong
            >
          </p>
          <p></p>
          <hr />
          <h1 id="borrowLimit">Borrow Limit:</h1>
          <p>
            The max borrowable amount an account has on a given market. This is calculated to be the
            account&#39;s <a href="#liquidity">liquidity</a> divided by the
            <a href="#marketPrice">market price</a> of the asset.
          </p>
          <p></p>
          <hr />
          <h1 id="contractLiquidity">Contract Liquidity:</h1>
          <p>
            The amount of underlying asset currently stored in the
            <a href="#cTokens">cToken</a> contract representing the market.
          </p>
          <p></p>
          <hr />
          <h1 id="supplyBalance">Supply Balance:</h1>
          <p>
            The account&#39;s supply balance is given by
            <strong>the amount of cTokens the account has</strong>, converted to underlying by the
            current <a href="#exchangeRate">exchange rate</a>.
          </p>
          <p>
            Remember that when users supply assets, they receive cTokens from
            <strong>rLending</strong> in exchange. cTokens are ERC20 tokens that can be redeemed (<a
              href="#withdrawal"
              >withdrawed</a
            >) for their underlying assets at any time.
          </p>
          <p></p>
          <hr />
          <h1 id="exchangeRate">Exchange Rate:</h1>
          <p>
            The rate at which the protocol is currently converting between
            <strong>cToken</strong> and <strong>Underlying assets</strong>. This rate is ever
            increasing with each new block passing and this is how suppliers earn they interests.
          </p>
          <p></p>
          <hr />
          <h1 id="borrowBalance">Borrow Balance:</h1>
          <p>
            <strong>The amount of cTokens the account has borrowed</strong> on a given market,
            converted to underlying by the current <a href="#exchangeRate">exchange rate</a>.
          </p>
          <p></p>
          <hr />
          <h1 id="debt">Debt:</h1>
          <p>
            Debt is calculated to be <strong>the sum of all borrowed balances</strong>, represented
            in <strong>USD</strong> by converting it through the current cToken-Underlying
            <a href="#exchangeRate">exchange rate</a> and multiplying by the
            <a href="#marketPrice">market price</a>.
          </p>
          <p></p>
          <hr />
          <h1 id="liquidation">Liquidation:</h1>
          <p>
            A borrowing account becomes insolvent when the Borrow Balance exceeds the amount allowed
            by the collateral factor. When an account becomes insolvent, other users can repay a
            portion of its outstanding borrow in exchange for a portion of its collateral, with a
            liquidation incentive — currently set at 8\% but subject to change through
            <strong>rLending</strong>’s governance system. The liquidation incentive means that
            liquidators receive the borrower’s collateral at a 8\% discount to market price. Having
            your account liquidated is bad because you lose some of your collateral.
          </p>
          <p>
            A user who has negative account liquidity is subject to liquidation by other users of
            the protocol to return his/her account liquidity back to positive (i.e. above the
            collateral requirement). When a liquidation occurs, a liquidator may repay some or all
            of an outstanding borrow on behalf of a borrower and in return receive a discounted
            amount of collateral held by the borrower; this discount is defined as the liquidation
            incentive.
          </p>
          <p>
            A liquidator may close up to a certain fixed percentage (i.e. close factor) of any
            individual outstanding borrow of the underwater account. Liquidators must interact with
            each cToken contract in which they wish to repay a borrow and seize another asset as
            collateral. When collateral is seized, the liquidator is transferred cTokens, which they
            may redeem the same as if they had supplied the asset themselves. Users must approve
            each cToken contract before calling liquidate (i.e. on the borrowed asset which they are
            repaying), as they are transferring funds into the contract.
          </p>
          <p></p>
          <hr />
          <h1 id="closeFactor">Close Factor:</h1>
          <p>
            The percent, ranging from 0% to 100%, of <a href="#debt">debt</a> eligible to be closed
            in a single liquidate transaction, after an account has gone underwater. Accounts go
            underwater when they run out of <a href="#liquidity">liquidity</a> or their
            <a href="#healthFactor">Health Factor</a> becomes negative. If a user has multiple
            borrowed assets, the Close Factor applies to any single borrowed asset, not the
            aggregated value of a user’s outstanding borrowing.
          </p>
          <p></p>
          <hr />
          <h1 id="liquidationIncentive">Liquidation Incentive:</h1>
          <p>
            The additional collateral given to liquidators as an incentive to perform liquidation of
            underwater accounts. For example, if the liquidation incentive is 1.1, liquidators
            receive an extra 10% of the borrowers collateral for every unit they close.
          </p>
          <p></p>
          <hr />
          <h1 id="marketPrice">Market Price:</h1>
          <p>
            The current price in <strong>USD</strong> for a given asset, as provided by the Oracles
            subsystem.
          </p>
          <p></p>
          <hr />
          <h1 id="withdrawal">Withdrawals:</h1>
          <p>
            Users that have non-negative health factor are able to withdraw their liquidity at any
            time. This action performs a transaction that redeems available cTokens for an the
            equivalent amount of underlying asset according to the current
            <strong>Exchange Rate</strong>.
          </p>
          <p></p>
          <hr />
          <h1 id="repay">Repay:</h1>
          <p>
            Users that have <strong>Borrow Balance</strong> are able to <strong>Repay</strong> their
            debt in order to partially reduce it or cancel it.
          </p>
          <p></p>
          <hr />
          <h1 id="liquidity">Liquidity:</h1>
          <p>
            Account Liquidity <strong>represents the USD value borrowable</strong> by a user, before
            it reaches liquidation. Users with a shortfall (<em>negative liquidity</em>) are subject
            to liquidation and can’t withdraw or borrow assets until their Account Liquidity is
            positive again.
          </p>
          <p>
            For each market the user has entered into, their supplied balance is multiplied by the
            market’s <strong>collateral factor</strong>, and summed; borrow balances are then
            subtracted, to equal Account Liquidity. In other words:
            <em>Borrowing an asset reduces Account Liquidity for each USD borrowed</em>. At the same
            time, withdrawing an asset reduces Account Liquidity by the asset’s
            <strong>collateral factor</strong> times each USD withdrawn.
          </p>
          <p></p>
          <hr />
          <h1 id="collateralFactor">Collateral Factor:</h1>
          <p>
            The percentage of supplied assets that is required to be collateralized when a user
            enters a market for borrowing purposes.
          </p>
          <p></p>
          <hr />
          <h1 id="healthFactor">Health Factor:</h1>
          <p>
            <strong>Health Factor</strong> is the result of a formula that calculates how close an
            account is to being liquidated. If an account becomes under-collateralized (<em
              >negative Health Factor</em
            >) it runs the risk of having it&#39;s shortfall liquidated. This would be bad.
          </p>
          <p></p>
          <hr />
          <h1 id="governance">Governance and Administrators:</h1>
          <p>
            The <strong>rLending protocol</strong> does not support specific tokens by default;
            instead, markets must be whitelisted. This is accomplished with an admin function,
            supportMarket(address market, address interest rate model) that allows users to begin
            interacting with the asset. In order to borrow an asset, there must be a valid price
            from the Price Oracle; in order to use an asset as collateral, there must be a valid
            price and a collateralFactor. Each function call is validated through a policy layer,
            referred to as <em>the Comptroller</em> ; this contract validates collateral and
            liquidity, before allowing a user action to proceed.
          </p>
          <p>
            <strong>rLending</strong> started with partially decentralized control of the protocol
            (such as choosing the interest rate model per asset). The protocol is protected by a
            multi-signature smart contract, requiring the agreement of several accounts in order to
            perform changes to the protocol.
          </p>
          <p>The following rights in the protocol are controlled by the Multi-sig:</p>
          <ul>
            <li>The ability to list a new cToken market</li>
            <li>The ability to update the interest rate model per market</li>
            <li>The ability to update the oracle or any adapter address</li>
            <li>The ability to withdraw the reserve of a cToken</li>
            <li>The ability to update the Comptroller contract</li>
            <li>The ability to choose a new admin</li>
          </ul>
          <p></p>
          <hr />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'KeyConcepts',
}
</script>
