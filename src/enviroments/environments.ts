export const SERVER_PORT: number =  Number( process.env.PORT ) || 5000
export const REDIS_PORT: number = Number(process.env.REDIS_PORT) || 6379
export const REDIS_HOST: string = process.env.HOST || 'redis'

const MYSQL_USER: string = process.env.MYSQL_USER || 'root'
const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD || 'M3t1n2.2019$'
const MYSQL_HOST: string = process.env.MYSQL_HOST || '192.168.0.15'
const MYSQL_PORT: string = process.env.MYSQL_PORT || '3306'
const MYSQL_DB: string = process.env.MYSQL_DB || 'chat'

const create_mysql_string = (): string => {
    const connectionString: string = `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}`
    return connectionString
}

export const MYSQL_STRING: string = create_mysql_string();
