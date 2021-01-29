# Financial aspects and Math

## Collateral and Collateral Factor:
Collateral — In order to borrow crypto from the **rLending** protocol, users need to first supply another type of crypto as collateral. This is provided using the same mint function used for supplying assets. Supplied collateral assets earn interest while in the protocol, but users cannot redeem or transfer assets while they are being used as collateral.

Collateral Factor — The maximum amount users can borrow is limited by the collateral factors of the assets they have supplied. For example, if a user supplies 100 DAI as collateral, and the posted collateral factor for DAI is 75\%, then the user can borrow at most 75 DAI worth of other assets at any given time. Each asset on **rLending** can have a different collateral factor. Collateral factors for each asset can be fetched using the Comptroller contract. They can also be changed by **rLending** Governance, with a minimum waiting period of five days.

A cToken's collateral factor can range from 0-90\%, and represents the proportionate increase in liquidity (borrow limit) that an account receives by minting the cToken.

Generally, large or liquid assets have high collateral factors, while small or illiquid assets have low collateral factors. If an asset has a 0\% collateral factor, it can't be used as collateral (or seized in liquidation), though it can still be borrowed.


# Exchange Rates:

# Calculating Interests:

# Annual Percentage Yield:

# Loan to Value":

# Liquidation Incentive:

# Reserve Factor:
