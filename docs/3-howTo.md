# How To

## How to connect to the platform:
In order to use **rLending** you will need metamask connected to the **RSK network**
[LALALALALA.GRAFICO.LALALALALA]

## How to make a deposit:
**rLending** deposits are easy! After you have _*connected your Metamask wallet_ you will be logged in and ready to supply funds.
[LALALALALA.GRAFICO.LALALALALA]
When you are ready to make a deposit, you will have to click on the **Supply / Borrow** tab, where you will be able to see the current status of your supplied assets.
[LALALALALA.GRAFICO.LALALALALA]
Click on the asset you wish to supply (in this example, we're supplying RIF).
[LALALALALA.GRAFICO.LALALALALA]
Select the amount you wish to provide, and then click on **Supply Tokens**


## How to make a borrow:
All right, when a user supplies balance they immediately start earning interests... but where do those interests come from? Short answer: Borrowers! Those that borrow crypto assets from the **rLending** protocol pay a varying interest rate every Ethereum block. The interest that borrowers pay produces the interest that suppliers earn.

Before you can borrow you need to collateralize your account!  An asset that is supplied to the protocol is not usable as collateral initially. In order to inform the protocol that you wish to use an asset as collateral, you must “enter the market” for that asset. An account can enter multiple markets at one time. You can do this by toggling the [LALALALALA.GRAFICO.LALALALALA]

# How to make a withdrawal:
\textbf{rLending} withdrawal

# How to repay debt:
Borrows can be repaid using a function on the respective cToken contract. Once a borrow has been repaid, the account’s collateral can be entirely redeemed or transferred. There are also functions in the cToken contracts to repay a borrow on behalf of another account.


# How to liquidate underwater accounts:
A borrowing account becomes insolvent when the Borrow Balance exceeds the amount allowed by the collateral factor. When an account becomes insolvent, other users can repay a portion of its outstanding borrow in exchange for a portion of its collateral, with a liquidation incentive — currently set at 8\% but subject to change through **rLending**’s governance system. The liquidation incentive means that liquidators receive the borrower’s collateral at a 8\% discount to market price. Having your account liquidated is bad because you lose some of your collateral.

A user who has negative account liquidity is subject to liquidation by other users of the protocol to return his/her account liquidity back to positive (i.e. above the collateral requirement). When a liquidation occurs, a liquidator may repay some or all of an outstanding borrow on behalf of a borrower and in return receive a discounted amount of collateral held by the borrower; this discount is defined as the liquidation incentive.

A liquidator may close up to a certain fixed percentage (i.e. close factor) of any individual outstanding borrow of the underwater account. Unlike in v1, liquidators must interact with each cToken contract in which they wish to repay a borrow and seize another asset as collateral. When collateral is seized, the liquidator is transferred cTokens, which they may redeem the same as if they had supplied the asset themselves. Users must approve each cToken contract before calling liquidate (i.e. on the borrowed asset which they are repaying), as they are transferring funds into the contract.

# How to interpret market data:
\textbf{rLending} markets!
The **rLending** Protocol enables developers to build innovative products on DeFi. So far, we’ve seen crypto wallets equipped with savings APRs, a no-loss lottery system, an interest-earning system for donation income, and more.
The smart contracts that power the protocol are deployed to the Ethereum blockchain. This means that at the time of this guide’s writing, the only types of assets that **rLending** can support are Ether and ERC-20 tokens.
The currently supported assets are listed here (rlending market)[www.rlending.com]. Based on the different implementation of Ether (ETH) and ERC-20 tokens, we have to utilize two similar processes:
The ETH supply method
The ERC20 token supply method
Like mentioned earlier, when someone supplies an asset to the protocol, they are given cTokens in exchange. The method for getting cETH is different from the method for getting cDAI, cUNI, or any other cToken for an ERC-20 asset. We’ll run through code examples and explanations for the two different asset supply methods.
When supplying Ether to the **rLending** protocol, an application can send ETH directly to the payable mint function in the cEther contract. Following that mint, cEther is minted for the wallet or contract that invoked the mint function. Remember that if you are calling this function from another smart contract, that contract needs a payable function in order to receive ETH when you redeem the cTokens later.
The operation is slightly different for cERC20 tokens. In order to mint cERC20 tokens, the invoking wallet or contract needs to first call the approve function on the underlying token’s contract. All ERC20 token contracts have an approve function.
The approval needs to indicate that the corresponding cToken contract is permitted to take up to the specified amount from the sender address. Subsequently, when the mint function is invoked, the cToken contract retrieves the indicated amount of underlying tokens from the sender address, based on the prior approve call.
