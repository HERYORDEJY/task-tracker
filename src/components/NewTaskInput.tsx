import React, { forwardRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

interface Props extends TextInputProps {
    errorMessage?: string | null
}

const NewTaskInput = forwardRef<TextInput, Props>((props, ref) => {
    const isFocused = useState(false)
    const [focused, setFocused] = isFocused

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.inputRow,
                    focused && styles.inputRowFocused,
                    Boolean(props.errorMessage) && styles.inputRowError
                ]}
            >
                <TextInput
                    {...props}
                    ref={ref}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    returnKeyType="default"
                    placeholder="Add a new task..."
                    placeholderTextColor="#BDBDBD"
                    style={styles.input}
                    multiline={true}
                />
            </View>

            {Boolean(props.errorMessage) ? (
                <View style={styles.errorRow}>
                    <Text style={styles.errorIcon}>⚠︎</Text>
                    <Text style={styles.errorText}>{props.errorMessage}</Text>
                </View>
            ) : null}
        </View>
    )
})

NewTaskInput.displayName = 'NewTaskInput'
export default NewTaskInput

const styles = StyleSheet.create({
    container: {
        rowGap: 6
    },

    inputRow: {
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        backgroundColor: '#FAFAFA',
        paddingLeft: 12,
        paddingRight: 6,
        paddingVertical: 6,
        height: 100,
        textAlignVertical: 'top'
    },
    inputRowFocused: {
        borderColor: '#2196F3',
        backgroundColor: '#fff'
    },
    inputRowError: {
        borderColor: '#F44336',
        backgroundColor: '#FFF8F8'
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#212121',
        paddingVertical: 6,
        marginRight: 8
    },

    // Add button
    addBtn: {
        backgroundColor: '#2196F3',
        borderRadius: 7,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    addBtnDisabled: {
        backgroundColor: '#BDBDBD'
    },
    addBtnLabel: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600'
    },
    errorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 4,
        paddingHorizontal: 4
    },
    errorIcon: {
        fontSize: 12,
        color: '#F44336'
    },
    errorText: {
        fontSize: 12,
        color: '#F44336',
        fontStyle: 'italic'
    }
})
