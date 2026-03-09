import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native'

interface Props extends TouchableOpacityProps {
    title: string
}

export default function CustomButton(props: Props): React.JSX.Element {
    return (
        <TouchableOpacity
            style={[styles.container]}
            {...props}
            activeOpacity={0.7}
        >
            <Text style={[styles.title]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 7,
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#0a1d33',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2
    },
    title: {
        fontSize: 13,
        color: '#FFFFFF',
        fontWeight: '700'
    }
})
