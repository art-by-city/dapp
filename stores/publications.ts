import { LegacyPublicationManifestBase } from '@artbycity/sdk/dist/web/legacy'
import { defineStore } from 'pinia'

export interface PublicationsStoreState {
  verified: { 
    publications: LegacyPublicationManifestBase[]
    cursor?: string
    _isBootstrapped?: boolean
    _hasReachedEnd?: boolean
  }
}

const pageSize = 10

export const usePublicationsStore = defineStore('publications', {
  state: (): PublicationsStoreState => {
    
    return { verified: { publications: [] } }
  },
  getters: {},
  actions: {
    async queryVerified() {
      if (this.verified._hasReachedEnd) { return }
      const abc = useArtByCity()

      const { publications, cursor: nextCursor } = await abc
        .legacy
        .queryPublications(pageSize, undefined, this.verified.cursor)

      this.verified.publications.push(...publications)
      this.verified.cursor = nextCursor

      if (!nextCursor) {
        this.verified._hasReachedEnd = true
      }
    },
    async bootstrapVerified() {
      if (!this.verified._isBootstrapped) {
        const abc = useArtByCity()
        const { publications, cursor: nextCursor } = await abc
          .legacy
          .queryPublications(pageSize)

        this.verified.publications.push(...publications)
        this.verified.cursor = nextCursor
        this.verified._isBootstrapped = true
      }
    }
  }
})
