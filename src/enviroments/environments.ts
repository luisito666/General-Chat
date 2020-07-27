export const SERVER_PORT: number =  Number( process.env.PORT ) || 5000
export const REDIS_PORT: number = Number(process.env.REDIS_PORT) || 6379
export const REDIS_HOST: string = process.env.HOST || 'redis'

const POSTGRES_USER: string = process.env.POSTGRES_USER || ''
const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD || ''
const POSTGRES_HOST: string = process.env.POSTGRES_HOST || ''
const POSTGRES_PORT: string = process.env.POSTGRES_PORT || ''
const POSTGRES_DB: string = process.env.POSTGRES_DB || ''

const create_connection_string = (): string => {
    const connectionString: string = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`
    return connectionString
}

export const POSTGRES_STRING: string = create_connection_string();
