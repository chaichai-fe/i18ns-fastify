import { config } from 'dotenv'
import { resolve } from 'path'

// 根据 NODE_ENV 加载对应的环境文件
const env = process.env.NODE_ENV ?? 'development'

// 确定要加载的环境文件
const envFile = env === 'production' ? '.env.production' : '.env.development'

// 加载环境变量
const result = config({ path: resolve(process.cwd(), envFile) })

if (result.error) {
  console.error(`❌ 加载环境文件失败: ${envFile}`)
  console.error(result.error)
  process.exit(1)
}

console.log(`✅ 已加载环境配置: ${envFile} (NODE_ENV=${env})`)

// 导出环境变量类型安全的访问器
export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key]
  if (!value && !defaultValue) {
    throw new Error(`环境变量 ${key} 未设置`)
  }
  return value ?? defaultValue ?? ''
}

// 导出常用的环境变量
export const ENV = {
  NODE_ENV: env,
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  JWT_SECRET: getEnvVar('JWT_SECRET'),
  PORT: parseInt(getEnvVar('PORT', '3000'), 10),
  HOST: getEnvVar('HOST', '0.0.0.0'),
}

