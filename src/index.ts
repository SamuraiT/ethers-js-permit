import { BigNumberish, Signature, Wallet} from 'ethers';
import { TypedDataDomain, TypedDataField, TypedDataSigner, } from "@ethersproject/abstract-signer";
import { splitSignature } from 'ethers/lib/utils';

interface SignerWithSignTypeData {
  _signTypedData: (domain: TypedDataDomain, types: Record<string, TypedDataField[]>, value: Record<string, any>) => Promise<string>
}

export const signPermitSigature = async (
  wallet: Wallet | SignerWithSignTypeData | TypedDataSigner,
  ownerAddress: string,
  token: string,
  spender: string,
  value: BigNumberish,
  deadline: BigNumberish,
  permitConfig: {
    nonce: BigNumberish
    name: string
    chainId: number
    version: string
  }
): Promise<Signature> => {
  const {name, version, chainId, nonce} = permitConfig
  return splitSignature(
    await wallet._signTypedData(
      {
        name,
        version,
        chainId,
        verifyingContract: token
      },
      {
        Permit: [
          {
            name: 'owner',
            type: 'address'
          },
          {
            name: 'spender',
            type: 'address'
          },
          {
            name: 'value',
            type: 'uint256'
          },
          {
            name: 'nonce',
            type: 'uint256'
          },
          {
            name: 'deadline',
            type: 'uint256'
          }
        ]
      },
      {
        owner: ownerAddress,
        spender,
        value,
        nonce,
        deadline
      }
    )
  )
}
