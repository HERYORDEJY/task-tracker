export interface TaskItemDataType {
    id: string
    title: string
    completed: boolean
    createdAt: number
}

export type TaskFilterKeyType = 'all' | 'active' | 'completed'
