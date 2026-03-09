import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TaskFilterKeyType } from '@/types'

const FILTERS: Array<{ label: string; value: TaskFilterKeyType }> = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' }
]

interface Props {
    current: TaskFilterKeyType
    onChange: (filter: TaskFilterKeyType) => void
}

export default function TasksFilterBar(props: Props) {
    return (
        <View style={styles.container}>
            {FILTERS.map(({ label, value }) => {
                const isActive = props.current === value
                return (
                    <TouchableOpacity
                        key={value}
                        style={[styles.btn, isActive && styles.btnActive]}
                        onPress={() => props.onChange(value)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.label,
                                isActive && styles.labelActive
                            ]}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 10,
        padding: 3
    },
    btn: {
        flex: 1,
        paddingVertical: 7,
        alignItems: 'center',
        borderRadius: 6
    },
    btnActive: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2
    },
    label: {
        fontSize: 13,
        color: '#9E9E9E',
        fontWeight: '500'
    },
    labelActive: {
        color: '#212121',
        fontWeight: '700'
    }
})
