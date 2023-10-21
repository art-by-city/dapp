import { LoggerFactory, WarpFactory } from 'warp-contracts'

LoggerFactory.INST.logLevel('error')

const abc = useArtByCity()
const warp = abc.config.environment === 'development'
  ? WarpFactory.forLocal()
  : WarpFactory.forMainnet()
  
export const useWarp = () => warp
