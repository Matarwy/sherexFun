// src/utils/upload/lighthouse.ts
import lighthouse from '@lighthouse-web3/sdk'

const GW = 'https://gateway.lighthouse.storage/ipfs'

function getKey() {
  const k = (process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || '').trim().replace(/^['"]|['"]$/g, '')
  if (!k) throw new Error('Lighthouse key missing. Add NEXT_PUBLIC_LIGHTHOUSE_API_KEY to .env.local and restart dev.')
  return k
}

async function uploadFileToLighthouse(file: File) {
  const key = getKey()
  // ✅ MUST pass an ARRAY of files in the browser
  const res = await lighthouse.upload([file], key)
  // res.data.Hash is the CID
  const cid = res?.data?.Hash
  if (!cid) throw new Error('Lighthouse upload failed: no CID')
  return cid as string
}

export async function uploadToLighthouse(file: File, meta: { name: string; symbol?: string; description?: string; attributes?: any[] }) {
  // 1) image
  const imageCid = await uploadFileToLighthouse(file)
  const imageUrl = `${GW}/${imageCid}`

  // 2) metadata.json
  const metadata = {
    name: meta.name,
    symbol: meta.symbol ?? '',
    description: meta.description ?? '',
    image: imageUrl, // write HTTPS url
    attributes: meta.attributes ?? [],
    properties: { files: [{ uri: imageUrl, type: file.type || 'image/png' }] }
  }
  const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  const metaFile = new File([blob], 'metadata.json', { type: 'application/json' })

  // ✅ also pass an ARRAY here
  const metaCid = await uploadFileToLighthouse(metaFile)
  const metadataUrl = `${GW}/${metaCid}`

  return { metadataUrl, imageUrl }
}
