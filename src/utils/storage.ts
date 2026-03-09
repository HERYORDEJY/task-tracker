import { TaskItemDataType } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const STORAGE_KEY = '@task_tracker_storge_key'

export async function loadTasksFromOfflineStorage(): Promise<
    Array<TaskItemDataType>
> {
    try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY)
        if (!raw) return []

        const parsed = JSON.parse(raw)

        // Guard against corrupt / unexpected data shape
        if (!Array.isArray(parsed)) return []

        return parsed as Array<TaskItemDataType>
    } catch {
        // Parsing or storage error — fail silently, start fresh
        return []
    }
}

export async function saveTasksToOfflineStorage(
    tasks: Array<TaskItemDataType>
): Promise<void> {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {}
}

export async function clearTasksFromOfflineStorage(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY)
    } catch {}
}
