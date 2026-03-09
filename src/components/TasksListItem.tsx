import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TaskItemDataType } from '@/types'

interface TaskItemProps {
    task: TaskItemDataType
    onToggle: (id: string) => void
}

export default function TasksListItem(props: TaskItemProps) {
    return (
        <TouchableOpacity
            style={styles.row}
            onPress={() => props.onToggle(props.task.id)}
            activeOpacity={0.7}
        >
            <View
                style={[
                    styles.checkbox,
                    props.task.completed && styles.checkboxDone
                ]}
            >
                {props.task.completed && (
                    <Text style={styles.checkmark}>✓</Text>
                )}
            </View>
            <Text
                style={[styles.title, props.task.completed && styles.titleDone]}
            >
                {props.task.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#fff'
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#BDBDBD',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxDone: {
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50'
    },
    checkmark: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '700'
    },
    title: {
        flex: 1,
        fontSize: 15,
        color: '#212121'
    },
    titleDone: {
        textDecorationLine: 'line-through',
        color: '#9E9E9E'
    }
})
