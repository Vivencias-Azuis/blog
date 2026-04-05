import { randomUUID } from 'node:crypto'
import QRCode from 'qrcode'
import { SupportRouteError } from '@/lib/support/errors'
import {
  findSupportPixChargeByProviderChargeId,
  updateSupportPixChargeStatus,
} from '@/lib/support/support-payments-store'
import type {
  PixChargeCreateInput,
  PixChargeResult,
  PixChargeStatus,
  PixProviderAdapter,
} from '@/lib/support/pix-provider'

const DIRECT_PIX_KEY = '24490987000138'
const DIRECT_PIX_NAME = 'MATHEUS NUNES PUPPE'
const DIRECT_PIX_CITY = 'SAO PAULO'
const DIRECT_PIX_GUI = 'BR.GOV.BCB.PIX'
const DIRECT_PIX_MCC = '0000'
const DIRECT_PIX_CURRENCY = '986'

function normalizePixValue(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9 $%*+\-./:]/gi, '')
}

function formatPixField(id: string, value: string) {
  return `${id}${value.length.toString().padStart(2, '0')}${value}`
}

function formatAmount(amountInCents: number) {
  return (amountInCents / 100).toFixed(2)
}

function buildPixMerchantAccountInfo() {
  return formatPixField(
    '26',
    [
      formatPixField('00', DIRECT_PIX_GUI),
      formatPixField('01', DIRECT_PIX_KEY),
    ].join(''),
  )
}

function buildPixAdditionalDataField(txid: string) {
  return formatPixField('62', formatPixField('05', txid))
}

function calculatePixCrc(payload: string) {
  let crc = 0xffff

  for (let index = 0; index < payload.length; index += 1) {
    crc ^= payload.charCodeAt(index) << 8

    for (let bit = 0; bit < 8; bit += 1) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021
      } else {
        crc <<= 1
      }

      crc &= 0xffff
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0')
}

function buildDirectPixPayload(amountInCents: number, txid: string) {
  const payloadWithoutCrc = [
    formatPixField('00', '01'),
    formatPixField('01', '11'),
    buildPixMerchantAccountInfo(),
    formatPixField('52', DIRECT_PIX_MCC),
    formatPixField('53', DIRECT_PIX_CURRENCY),
    formatPixField('54', formatAmount(amountInCents)),
    formatPixField('58', 'BR'),
    formatPixField('59', normalizePixValue(DIRECT_PIX_NAME).slice(0, 25)),
    formatPixField('60', normalizePixValue(DIRECT_PIX_CITY).slice(0, 15)),
    buildPixAdditionalDataField(txid.slice(0, 25)),
    '6304',
  ].join('')

  return `${payloadWithoutCrc}${calculatePixCrc(payloadWithoutCrc)}`
}

export const directPixAdapter: PixProviderAdapter = {
  provider: 'direct_pix',
  async createCharge(input: PixChargeCreateInput): Promise<PixChargeResult> {
    if (!input.payerEmail) {
      throw new SupportRouteError(
        400,
        'Informe um e-mail válido para gerar o Pix.',
      )
    }

    const chargeId = `direct_pix_${randomUUID()}`
    const txid = chargeId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 25)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    const brCode = buildDirectPixPayload(input.amountInCents, txid)
    const brCodeBase64 = await QRCode.toDataURL(brCode, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 320,
    })

    return {
      chargeId,
      status: 'PENDING',
      brCode,
      brCodeBase64,
      expiresAt,
      ticketUrl: undefined,
    }
  },
  async checkCharge(chargeId: string): Promise<PixChargeStatus> {
    const charge = await findSupportPixChargeByProviderChargeId('direct_pix', chargeId)

    if (!charge) {
      throw new SupportRouteError(404, 'Pix não encontrado.')
    }

    const expiresAt = charge.expiresAt ?? new Date().toISOString()
    const isExpired = charge.status === 'PENDING' && new Date(expiresAt).getTime() <= Date.now()

    if (isExpired) {
      await updateSupportPixChargeStatus({
        provider: 'direct_pix',
        providerChargeId: chargeId,
        status: 'EXPIRED',
        expiresAt,
      })

      return {
        chargeId,
        status: 'EXPIRED',
        expiresAt,
      }
    }

    return {
      chargeId,
      status: charge.status as PixChargeStatus['status'],
      expiresAt,
    }
  },
}
