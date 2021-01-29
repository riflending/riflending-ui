# Smart Contracts

## Architecture:
[LALALALALA.IMAGEN.LALALALALA]
[LALALALALA.IMAGEN.LALALALALA]
[LALALALALA.TABLA DE ADDRESS.LALALALALA]

# cTokens:

cTokens are the primary means of interacting with the **rLending** Protocol; when a user mints, redeems, borrows, repays a borrow, liquidates a borrow, or transfers cTokens, she will do so using the cToken contract.

There are currently two types of cTokens: CErc20 and CEther. Though both types expose the EIP-20 interface, CErc20 wraps an underlying ERC-20 asset, while CEther simply wraps Ether itself. As such, the core functions which involve transferring an asset into the protocol have slightly different interfaces depending on the type, each of which is shown below.

Remember that the amount of ETH that can be exchanged for cETH increases every Ethereum block, which is about every 30 seconds. This means that the exchange rate of underlying to cToken increases over time. There is no minimum or maximum amount of time that suppliers need to keep their asset in the protocol. See the varying exchange rate for each cToken by clicking on one at (rlending)[rlending.com]markets.
For more information on cToken concepts see the cToken documentation.


# Risk Management:
the risk management layer of the **rLending** protocol is comprised of **Comptroller**, **Unitroller** and the interest rate models. **Comptroller** being the main contract, that determines how much collateral a user is required to maintain, and whether (and by how much) a user can be liquidated. Each time a user interacts with a cToken, the **Comptroller** is asked to approve or deny the transaction.

The **Comptroller** maps user balances to prices (via the Price Oracle) to risk weights (called Collateral Factors) to make its determinations. Users explicitly list which assets they would like included in their risk scoring, by calling Enter Markets and Exit Market.

The **Comptroller** is implemented as an upgradeable proxy. The **Unitroller** proxies all logic to the **Comptroller** implementation, but storage values are set on the **Unitroller**.

