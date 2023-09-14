import { defineStore } from 'pinia'
import { PermissionType } from 'arconnect'

const permissions: PermissionType[] = [
  'ACCESS_ADDRESS',
  'SIGN_TRANSACTION',
  'ACCESS_PUBLIC_KEY',
  'SIGNATURE'
]

interface AuthState {
  _isBootstrapped: boolean
  address: string | null
  publicKey: string | null
}

async function tryGetAddress() {
  try {
    return await window.arweaveWallet.getActiveAddress()
  } catch(error) {}

  return null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return { _isBootstrapped: false, address: null, publicKey: null }
  },
  getters: {
    isLoggedIn: ({ address }) => !!address
  },
  actions: {
    async bootstrap() {
      if (!this._isBootstrapped) {
        /*
          eslint-disable
            @typescript-eslint/no-unsafe-member-access,
            @typescript-eslint/no-unsafe-call
        */
        // window.arweaveWallet.events.on('connect', (...args: any[]) => {
        //   console.log('connect', ...args)
        // })
        window.arweaveWallet.events.on('disconnect', () => {
          this.address = null
          this.publicKey = null
        })
        window.arweaveWallet.events.on('activeAddress', async () => {
          this.address = await tryGetAddress()
          if (this.address) {
            this.publicKey = await window.arweaveWallet.getActivePublicKey()
          }
        })
        // window.arweaveWallet.events.on('addresses', (...args: any[]) => {
        //   console.log('addresses', ...args)
        // })
        // window.arweaveWallet.events.on('permissions', (...args: any[]) => {
        //   console.log('permissions', ...args)
        // })
        // window.arweaveWallet.events.on('gateway', (...args: any[]) => {
        //   console.log('gateway', ...args)
        // })
        /*
          eslint-enable
            @typescript-eslint/no-unsafe-member-access,
            @typescript-eslint/no-unsafe-call
        */

        this.address = await tryGetAddress()
        this._isBootstrapped = true
      }
    },
    async connect() {
      try {
        // NB: Try to see if we're already connected
        this.address = await tryGetAddress()

        if (!this.address) {
          await window.arweaveWallet.connect(permissions)
          this.address = await tryGetAddress()
        }

        this.publicKey = await window.arweaveWallet.getActivePublicKey()
      } catch (error) {
        console.error('Error in AuthStore on connect()', error)
      }
    },
    async disconnect() {
      try {
        await window.arweaveWallet.disconnect()
        this.address = null
        this.publicKey = null
      } catch (error) {
        console.error('Error in AuthStore on disconnect()', error)
      }
    }
  }
})
