import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TaskFilterKeyType } from '@/types'

const COPY: Record<TaskFilterKeyType, { icon: string; text: string }> = {
    all: { icon: '📋', text: 'No tasks yet.\nAdd one above to get started.' },
    active: { icon: '🎉', text: "No active tasks.\nYou're all caught up!" },
    completed: { icon: '🔲', text: 'No completed tasks yet.\nGet to work!' }
}

interface Props {
    filter: TaskFilterKeyType
}

export default function TasksListEmpty(props: Props) {
    const { icon, text } = COPY[props.filter]

    return (
        <View style={styles.container}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 60
    },
    icon: {
        fontSize: 40,
        marginBottom: 12
    },
    text: {
        fontSize: 15,
        color: '#9E9E9E',
        textAlign: 'center',
        lineHeight: 22
    }
})
