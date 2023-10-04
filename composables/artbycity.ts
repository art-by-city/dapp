import Arweave from 'arweave'
import ArtByCity, { ArtByCityConfig } from '@artbycity/sdk'

const config = useRuntimeConfig()
const arweave = Arweave.init(config.public.arweave)
const abc = new ArtByCity(arweave, config.public.artbycity as ArtByCityConfig)

export const useArtByCity = () => abc
