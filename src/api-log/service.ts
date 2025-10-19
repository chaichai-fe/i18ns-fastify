import db from '../db'
import { apiLogTable } from '../db/schema'
import { type PaginationDto } from './types'
import { desc, sql, lt } from 'drizzle-orm'

export class ApiLogService {
  /**
   * 查询所有日志（带分页）
   */
  async findAll(paginationDto: PaginationDto) {
    // 确保转换为数字类型
    const page = Number(paginationDto.page)
    const pageSize = Number(paginationDto.pageSize)
    const offset = (page - 1) * pageSize

    const [data, total] = await Promise.all([
      db
        .select()
        .from(apiLogTable)
        .orderBy(desc(apiLogTable.operatedAt))
        .limit(pageSize)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(apiLogTable),
    ])

    return {
      data,
      total: total[0]?.count ?? 0,
      page,
      pageSize,
      totalPages: Math.ceil((total[0]?.count ?? 0) / pageSize),
    }
  }

  /**
   * 创建日志记录
   */
  async create(path: string, method: string, operator?: string | null) {
    await db.insert(apiLogTable).values({
      path,
      method,
      operator: operator ?? null,
    })
  }

  /**
   * 根据方法统计日志数量
   */
  async countByMethod() {
    return await db
      .select({
        method: apiLogTable.method,
        count: sql<number>`count(*)`,
      })
      .from(apiLogTable)
      .groupBy(apiLogTable.method)
  }

  /**
   * 根据路径统计日志数量
   */
  async countByPath(pageSize: number = 10) {
    return await db
      .select({
        path: apiLogTable.path,
        count: sql<number>`count(*)`,
      })
      .from(apiLogTable)
      .groupBy(apiLogTable.path)
      .orderBy(sql`count(*) DESC`)
      .limit(pageSize)
  }

  /**
   * 清除六个月之前的日志
   */
  async clearOldLogs() {
    // 计算六个月前的日期
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    // 先查询要删除的记录数
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(apiLogTable)
      .where(lt(apiLogTable.operatedAt, sixMonthsAgo))

    const countToDelete = countResult[0]?.count || 0

    if (countToDelete === 0) {
      return 0
    }

    // 执行删除操作
    await db.delete(apiLogTable).where(lt(apiLogTable.operatedAt, sixMonthsAgo))

    return countToDelete
  }

  /**
   * 清除所有日志
   */
  async clearAllLogs() {
    // 先查询总记录数
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(apiLogTable)

    const totalCount = countResult[0]?.count || 0

    if (totalCount === 0) {
      return 0
    }

    // 执行删除操作
    await db.delete(apiLogTable)

    return totalCount
  }
}
