import { useCallback, useEffect, useState } from 'react'
import { TaskFilterKeyType, TaskItemDataType } from '@/types'
import {
    loadTasksFromOfflineStorage,
    saveTasksToOfflineStorage
} from '@/utils/storage'

interface UseTaskMethodsReturn {
    filteredTasks: Array<TaskItemDataType>
    filter: TaskFilterKeyType
    isLoading: boolean
    setFilter: (filter: TaskFilterKeyType) => void
    addTask: (title: string) => void
    toggleTask: (id: string) => void
    refreshTasks: () => Promise<void>
}

export function useTaskMethods(): UseTaskMethodsReturn {
    const [tasks, setTasks] = useState<Array<TaskItemDataType>>([])
    const [filter, setFilter] = useState<TaskFilterKeyType>('all')
    const [isLoading, setIsLoading] = useState(true)

    // Load tasks from storage on mount
    useEffect(() => {
        ;(async () => {
            const stored = await loadTasksFromOfflineStorage()
            setTasks(stored)
            setIsLoading(false)
        })()
    }, [])

    // Persist tasks to storage whenever they change
    useEffect(() => {
        if (!isLoading) {
            saveTasksToOfflineStorage(tasks)
        }
    }, [tasks, isLoading])

    const addTask = useCallback((title: string) => {
        const trimmed = title.trim()
        if (!trimmed) return

        const newTask: TaskItemDataType = {
            id: Date.now().toString(),
            title: trimmed,
            completed: false,
            createdAt: Date.now()
        }

        setTasks((prev) => [newTask, ...prev])
    }, [])

    const toggleTask = useCallback((id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }, [])

    const refreshTasks = useCallback(async () => {
        const stored = await loadTasksFromOfflineStorage()
        setTasks(stored)
    }, [])

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') return !task.completed
        if (filter === 'completed') return task.completed
        return true
    })

    return {
        filteredTasks,
        filter,
        isLoading,
        setFilter,
        addTask,
        toggleTask,
        refreshTasks
    }
}
