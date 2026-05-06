import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React from 'react'
import Colors from '../helper/Colors';
import fonts from '../assets/fonts';

type AppButtonProps = TouchableOpacityProps & {
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    isBorderButton?: boolean
}

const AppButton = (props: AppButtonProps) => {
    const { title, titleStyle, style, isBorderButton,disabled } = props;

     const backgroundColor = disabled
        ? '#c2e6ff'
        : isBorderButton
        ? Colors.white
        : Colors.primary;

    const textColor = disabled
        ? 'black'
        : isBorderButton
        ? Colors.black
        : Colors.white;

    return (
        <TouchableOpacity
            {...props}
            activeOpacity={0.8}
            style={[
                styles.container,
                isBorderButton && styles.borderButton,
                { backgroundColor, opacity: disabled ? 0.6 : 1 },
                style,
            ]}
        >
            <Text style={[styles.title, { color: textColor }, titleStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default AppButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        borderRadius: 12,
        width: '100%',
        borderWidth:1,
        borderColor:Colors.primary
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        includeFontPadding: false,
        fontFamily:fonts.SemiBold
    },
    borderButton: {
        borderWidth: 1,
        borderColor: Colors.black,
        backgroundColor:Colors.white
    }
})