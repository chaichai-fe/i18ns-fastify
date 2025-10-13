export interface ApiLog {
    id: number
    path: string
    method: string
    operator: string | null
    operatedAt: Date
}

export interface PaginationDto {
    page: number
    pageSize: number
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    pageSize: number
    totalPages: number
}

