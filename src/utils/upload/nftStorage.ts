// utils/upload/nftStorage.ts
import { File as NFTFile, NFTStorage } from 'nft.storage'

const client = new NFTStorage({ token: '9f5b2ce3.252763dcc12444228133ed20e1daee71' })
const GW = 'https://gateway.pinata.cloud/ipfs' // or cloudflare-ipfs.com/ipfs

export async function uploadToNftStorage(file: File, meta: { name: string; symbol?: string; description?: string }) {
  const imageCid = await client.storeBlob(new NFTFile([await file.arrayBuffer()], file.name, { type: file.type }))
  const imageUrl = `${GW}/${imageCid}`

  const metadata = {
    name: meta.name,
    symbol: meta.symbol ?? '',
    description: meta.description ?? '',
    image: imageUrl,
    properties: { files: [{ uri: imageUrl, type: file.type || 'image/png' }] }
  }

  const metaCid = await client.storeBlob(new NFTFile([JSON.stringify(metadata)], 'metadata.json', { type: 'application/json' }))
  return { metadataUrl: `${GW}/${metaCid}`, imageUrl }
}
