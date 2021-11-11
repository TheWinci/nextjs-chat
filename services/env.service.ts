import getConfig from 'next/config'

const { _serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export const getPublicEnv = (name: string): string => publicRuntimeConfig[name] || ''
