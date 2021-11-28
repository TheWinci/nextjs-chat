import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export const getPublicEnv = (name: string) => publicRuntimeConfig[name] || ''
export const getServerEnv = (name: string) => serverRuntimeConfig[name] || ''
