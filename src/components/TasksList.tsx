import React, { useCallback, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { TaskFilterKeyType, TaskItemDataType } from '@/types'
import TasksListItem from '@/components/TasksListItem'
import TasksListEmpty from '@/components/TasksListEmpty'

interface TaskListProps {
    tasks: Array<TaskItemDataType>
    filter: TaskFilterKeyType
    onToggle: (id: string) => void
    onRefresh: () => Promise<void>
}

export default function TasksList({
    tasks,
    filter,
    onToggle,
    onRefresh
}: TaskListProps) {
    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = useCallback(async () => {
        setRefreshing(true)
        await onRefresh()
        setRefreshing(false)
    }, [onRefresh])

    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
                <TasksListItem
                    task={item}
                    onToggle={onToggle}
                />
            )}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            ListEmptyComponent={<TasksListEmpty filter={filter} />}
            contentContainerStyle={[
                styles.content,
                tasks.length === 0 && styles.contentEmpty
            ]}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: 40
    },
    contentEmpty: {
        flexGrow: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginLeft: 50 // aligns with text, clears checkbox + margin
    }
})
