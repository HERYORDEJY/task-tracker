import { TaskItemDataType } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const STORAGE_KEY = '@task_tracker_storge_key'

export async function loadTasksFromOfflineStorage(): Promise<
    Array<TaskItemDataType>
> {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY)

        if (data) {
            return JSON.parse(data) as Array<TaskItemDataType>
        }

        return []
    } catch (error) {
        throw error
    }
}

export async function saveTasksToOfflineStorage(
    tasks: TaskItemDataType | Array<TaskItemDataType>
): Promise<void> {
    try {
        const existingData = await AsyncStorage.getItem(STORAGE_KEY)
        const parsedExistingData = Boolean(existingData)
            ? JSON.parse(existingData as string)
            : []

        if (Array.isArray(tasks)) {
            const newData = [...parsedExistingData, ...tasks]
            return await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(newData)
            )
        }

        const newData = [...parsedExistingData, tasks]
        return await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    } catch (error) {
        throw error
    }
}
