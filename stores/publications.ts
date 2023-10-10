import { LegacyPublicationManifestBase } from '@artbycity/sdk/dist/web/legacy'
import { defineStore } from 'pinia'

export interface PublicationsStoreState {
  verified: { 
    publications: LegacyPublicationManifestBase[]
    cursor?: string
  }
}

export const usePublicationsStore = defineStore('publications', {
  state: (): PublicationsStoreState => {
    return { verified: { publications: [] } }
  },
  getters: {},
  actions: {
    async queryVerified() {
      const abc = useArtByCity()

      const { publications, cursor: nextCursor } = await abc.legacy.queryPublications(10, undefined, this.verified.cursor)
      this.verified.publications.push(...publications)
      this.verified.cursor = nextCursor
    }
  }
})
