import { FEE_RATE_DENOMINATOR } from '@raydium-io/raydium-sdk-v2'
import BN from 'bn.js'
import Decimal from 'decimal.js'

export const defaultShareFeeRate = new BN(10000)
export const birthpadShareRate = new Decimal(defaultShareFeeRate.toString())
  .div(FEE_RATE_DENOMINATOR.toString())
  .mul(100)
  .toDecimalPlaces(2)
  .toString()
