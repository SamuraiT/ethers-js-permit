import { expect } from "chai"
import { BigNumber, ethers, Wallet } from "ethers"
import { signPermitSigature } from "../src/app"

describe("createPermitSignature", () => {

  it("check signature", async () => {
    const nemonic = {
      phrase: 'village dignity insect mass potato match track organ electric auction where private',
    }
    const wallet = Wallet.fromMnemonic(nemonic.phrase)
    const tokenAddress = '0x29C087132Ae893DFACDacc9De9CBD7777C45B202'
    const contractAddress = '0x4bf5c8a103B4e6782FA84769A378a708B76893BB'

    const permitConfig = {
      nonce: 0,
      name: 'TokenNAME',
      chainId: 31337,
      version: '1'
    }

    const result = await signPermitSigature(
      wallet,
      wallet.address,
      tokenAddress,
      contractAddress,
      BigNumber.from('100'),
      60 * 60 * 24,
      permitConfig
    )

    expect(result).to.eqls(
      {
        r: '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf',
        s: '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb',
        _vs: '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb',
        recoveryParam: 0,
        v: 27,
        yParityAndS: '0x3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb',
        compact: '0xa2bb2d8c933493773d34be847b02145f25deabc78f4a44bcf8e89b17905b8acf3881e9ca8e242898fd810785ac367f88bea15df4ec9106e8f08d3805c2637fbb'
      })
  })
})
