import { config } from 'dotenv'
import { resolve } from 'path'

// 环境变量加载器类
class EnvironmentLoader {
  private static instance: EnvironmentLoader
  private isLoaded = false

  private constructor() { }

  static getInstance(): EnvironmentLoader {
    if (!EnvironmentLoader.instance) {
      EnvironmentLoader.instance = new EnvironmentLoader()
    }
    return EnvironmentLoader.instance
  }

  // 获取环境文件路径
  private getEnvFilePath(): string {
    const env = process.env.NODE_ENV ?? 'development'
    const envFile = env === 'production' ? '.env.production' : '.env.development'
    return resolve(process.cwd(), envFile)
  }

  // 加载环境变量
  private loadEnvFile(): void {
    if (this.isLoaded) return

    const envFile = this.getEnvFilePath()
    const result = config({ path: envFile })

    if (result.error) {
      console.error(`❌ Failed to load environment file: ${envFile}`)
      console.error(result.error)
      process.exit(1)
    }

    console.log(`✅ Environment file loaded: ${envFile} (NODE_ENV=${process.env.NODE_ENV ?? 'development'})`)
    this.isLoaded = true
  }

  // 确保环境变量已加载
  ensureLoaded(): void {
    this.loadEnvFile()
  }

  // 获取环境变量
  getEnvVar(key: string, defaultValue?: string): string {
    this.ensureLoaded()

    const value = process.env[key]
    if (!value && !defaultValue) {
      throw new Error(`Environment variable ${key} is not set`)
    }
    return value ?? defaultValue ?? ''
  }

  // 获取数据库 URL
  getDatabaseUrl(): string {
    return this.getEnvVar('DATABASE_URL')
  }

  // 获取 JWT 密钥
  getJwtSecret(): string {
    return this.getEnvVar('JWT_SECRET')
  }

  // 获取端口
  getPort(): number {
    return parseInt(this.getEnvVar('PORT', '3000'), 10)
  }

  // 获取主机
  getHost(): string {
    return this.getEnvVar('HOST', '0.0.0.0')
  }
}

// 创建单例实例
const envLoader = EnvironmentLoader.getInstance()

// 自动加载环境变量（保持向后兼容）
envLoader.ensureLoaded()

// 导出便捷函数
export const getEnvVar = (key: string, defaultValue?: string): string => {
  return envLoader.getEnvVar(key, defaultValue)
}

export const getDatabaseUrl = (): string => {
  const databaseUrl = envLoader.getDatabaseUrl()
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return databaseUrl
}

export const getJwtSecret = (): string => {
  return envLoader.getJwtSecret()
}

export const getPort = (): number => {
  return envLoader.getPort()
}

export const getHost = (): string => {
  return envLoader.getHost()
}

// 导出环境变量对象（保持向后兼容）
export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  DATABASE_URL: getDatabaseUrl(),
  JWT_SECRET: getJwtSecret(),
  PORT: getPort(),
  HOST: getHost(),
}


