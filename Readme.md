# ethers-js-permit

Ethers-js-permit is a support library for [ethers-js](https://github.com/ethers-io/ethers.js) that allows for easy generation of signatures for ERC20Permit.

# Install

```bash
yarn add ethers-js-permit
```

# USAGE

```ts
  import { signPermitSigature } from 'ethers-js-permit'

  const wallet = Wallet.createRandom()
  const nonce = await erc20Permit.nonce(wallet.address)
  const name = await erc20Permit.name()
  const permitConfig = {
    nonce, // this should be take
    name,
    chainId: 1, // -> this should be 1 for ethereum.
    version: '1'
  }
  const deadline = 60 * 60 * 24

  const result = await signPermitSigature(
    wallet,
    wallet.address,
    erc20Permit.address,
    targetContract,
    BigNumber.from('100'),
    deadline,
    permitConfig
  )

  await targetContract.removeLiquidity( // contract call with permit
    ...,
    deadline,
    false,
    result.v,
    result.r,
    result.s
  )
```
