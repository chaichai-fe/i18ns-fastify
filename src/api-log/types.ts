export interface ApiLog {
    id: number
    path: string
    method: string
    operator: string | null
    operatedAt: Date
}

export interface PaginationDto {
    page: number
    limit: number
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

