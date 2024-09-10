import fs from 'fs'
import Arweave from 'arweave'
import { ArweaveSigner, TurboFactory } from '@ardrive/turbo-sdk'

const arweave = Arweave.init({
  protocol: 'https',
  host: 'frostor.xyz',
  port: 443
})
const jwk = JSON.parse(fs.readFileSync('./.secrets/wallet.json').toString())
const signer = new ArweaveSigner(jwk)
const turbo = TurboFactory.authenticated({
  signer,
  gatewayUrl: 'https://frostor.xyz',
  uploadServiceConfig: {
    url: 'https://frostor.xyz/bundler'
  }
})

async function tryWithTurboSdk() {

  const {
    // fileResponses,
    manifestResponse,
    manifest,
    errors
  } = await turbo.uploadFolder({ folderPath: __dirname+'/.output/public' })

  if (errors && errors.length > 0) {
    console.error(errors)
  } else {
    console.log(`Manifest id ${manifestResponse?.id}`)
    console.log('Manifest', manifest)
  }
}

async function deploy() {
  const address = await arweave.wallets.jwkToAddress(jwk)
  console.log('uploading using address', address)
  await tryWithTurboSdk()
}

deploy()
  .then()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
