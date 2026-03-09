import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import NewTaskInput from '@/components/NewTaskInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import TasksFilterBar from '@/components/TasksFilterBar'
import { useCallback, useRef, useState } from 'react'
import { TaskFilterKeyType } from '@/types'
import TasksList from '@/components/TasksList'
import { useTaskMethods } from '@/hooks/useTaskMethods'
import CustomButton from '@/components/CustomButton'

export default function Index() {
    const [filterKey, setFilterKey] = useState<TaskFilterKeyType>('all')
    const taskMethod = useTaskMethods()
    const [newTask, setNewTask] = useState('')
    const [addTaskErrorMessage, setAddTaskErrorMessage] = useState<
        string | null
    >(null)
    const newTaskInputRef = useRef<TextInput>(null)

    const handleSetNewTask = (task: string) => {
        setAddTaskErrorMessage(null)
        setNewTask(task)
    }

    const handleAddNewTask = useCallback(() => {
        if (!Boolean(newTask?.trim())) {
            setAddTaskErrorMessage('You need to enter a task description')
            return
        }

        if (newTask?.trim()?.length < 5) {
            setAddTaskErrorMessage(
                'Task description should be at least 5 characters long'
            )
            return
        }

        Keyboard.dismiss()
        taskMethod.addTask(newTask)
        newTaskInputRef.current?.clear()
    }, [newTask])

    return (
        <SafeAreaView>
            <View style={[styles.container]}>
                <View style={styles.topSection}>
                    <NewTaskInput
                        ref={newTaskInputRef}
                        errorMessage={addTaskErrorMessage}
                        value={newTask}
                        onChangeText={handleSetNewTask}
                    />
                    <CustomButton
                        title={'Add Task'}
                        disabled={Boolean(addTaskErrorMessage)}
                        onPress={handleAddNewTask}
                    />
                </View>

                <TasksFilterBar
                    current={filterKey}
                    onChange={setFilterKey}
                />

                <TasksList
                    tasks={taskMethod.filteredTasks}
                    filter={filterKey}
                    onRefresh={taskMethod.refreshTasks}
                    onToggle={taskMethod.toggleTask}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        rowGap: 20
    },
    topSection: {
        borderBottomWidth: 2,
        borderColor: '#666666',
        paddingBottom: 10,
        rowGap: 5
    }
})
