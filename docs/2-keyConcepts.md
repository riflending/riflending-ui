# Key Concepts

## Account:
In **rLending**, each account is represented by the **rBTC** address that holds the assets and administers the transactions.

---
## Markets:
**Markets** are the method **rLending** uses for representing each asset listed in the protocol. They are essentially _a large pool of liquidity_ that is formed by users providing liquidity and at the same time it is available for other users to borrow. Borrowers pay back their interests to the pool and they share in the interest with suppliers.

**Each underlying market is internally represented with a cToken**

---
## cTokens:
Each asset supported by the [**rLending Protocol**](https://github.com/riflending/rlending-protocol) is integrated through a **cToken Smart Contract subsystem**, which is an **EIP-20** compliant representation of balances supplied to the protocol. By minting cTokens, users may:
1) Earn interest through the cToken's exchange rate, which increases in value relative to the underlying asset, and
2) Gain the ability to use cTokens as collateral for borrowing assets.

---
## Collateral:
**Collateral** is the guarantee that users provides that allows them to borrow on a given market. In order to supply collateral, users must first activate the _Enter Market_ toggle.
[ IMAGEN DEL TOGGLE ]

**Note that a user cannot borrow without having supplied collateral first.**

---
## Contract Liquidity:
The amount of underlying asset currently stored in the contract.

---
## Supply Balance:
The account's supply balance is given by **the amount of cTokens the account has**, converted to underlying by the current exchange rate.
Remember that when users supply assets, they receive cTokens from **rLending** in exchange. cTokens are ERC20 tokens that can be redeemed for their underlying assets at any time.

---
## Exchange Rate:
The rate at which the protocol is currently converting between **cToken** and **Underlying assets**. This rate is ever increasing with each new block passing and this is how suppliers earn they interests.

---
## Borrow Balance:
**The amount of cTokens the account has borrowed** in a Connectinggiven market, converted to underlying by the current exchange rate.

---
## Debt:
Debt is calculated to be **the sum of all borrowed balances**, represented in **USD** by converting it through the current cToken-Underlying exchange rate and multiplying by the market price.

---
## Market Price:
The current price in **USD** for a given asset, as provided by the Oracles subsystem.

---
## Withdrawals:
Users that have non-negative health factor are able to withdraw their liquidity at any time. This action performs a transaction that redeems available cTokens for an the equivalent amount of underlying asset according to the current **Exchange Rate**.

---
## Repay:
Users that have **Borrow Balance** are able to **Repay** their debt in order to partially reduce it or cancel it.

---
## Liquidity:
Account Liquidity **represents the USD value borrowable** by a user, before it reaches liquidation. Users with a shortfall (_negative liquidity_) are subject to liquidation and can’t withdraw or borrow assets until their Account Liquidity is positive again.

For each market the user has entered into, their supplied balance is multiplied by the market’s **collateral factor**, and summed; borrow balances are then subtracted, to equal Account Liquidity. In other words: _Borrowing an asset reduces Account Liquidity for each USD borrowed_.
At the same time, withdrawing an asset reduces Account Liquidity by the asset’s **collateral factor** times each USD withdrawn.

---
## Collateral Factor:
The percentage of supplied assets that is required to be collateralized when a user enters a market for borrowing purposes.

---
## Health Factor:
**Health Factor** is the result of a formula that calculates how close an account is to being liquidated. If an account becomes under-collateralized (_negative Health Factor_) it runs the risk of having it's shortfall liquidated. This would be bad.

---
## Earning Interests:
When users and applications supply an asset to the **rLending Protocol**, they begin **earning a variable interest rate instantly**. Interest accrues every block (currently ~30 seconds), and users can withdraw their principal plus interest anytime.
Under the hood, users are contributing their assets to a large pool of liquidity (a “market”) that is available for other users to borrow, and they share in the interest that borrowers pay back to the pool.
When users supply assets, they receive cTokens from **rLending** in exchange. cTokens are ERC20 tokens that can be redeemed for their underlying assets at any time. As interest accrues to the assets supplied, cTokens are redeemable at an exchange rate (relative to the underlying asset) that constantly increases over time, based on the rate of interest earned by the underlying asset.

---
## How do tokens earn interests?:
Each market has its own Supply interest rate (APR).
Interest isn't distributed; instead, **simply by holding cTokens, you'll earn interest!**

**cTokens** accumulates interest through their exchange rate — over time, each cToken **becomes convertible into an increasing amount of it's underlying asset**, even while the number of cTokens in your wallet stays the same.

Let’s say you supply **1,000 RIF** to the **rLending** protocol, when the exchange rate is **0.020070**; you would receive **49,825.61 cRIF** (1,000/0.020070).

A few months later, you decide it’s time to withdraw your RIF from the protocol; suppose the exchange rate is now **0.021591**:

Your **49,825.61 cRIF** is now equal to **1,075.78 RIF** (49,825.61 * 0.021591)

You could withdraw **1,075.78 RIF**, which would redeem all **49,825.61 cRIF**

You could also withdraw a portion, such as your original **1,000 RIF**, which would redeem **46,315.59 cRIF** (keeping **3,510.01 cRIF** in your wallet)
or you could transfer your cTokens, effectively transferring your balance of underlying asset.

If you send your cTokens to a friend, your **rLending** balance will decline and your friend's will increase. **A cToken transfer will fail if the account has entered that cToken market and the transfer would have put the account into a state of negative liquidity.**