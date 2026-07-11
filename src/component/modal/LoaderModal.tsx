import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BaseModal, { CustomeModalProps } from './BaseModal'
import Colors from '../../helper/Colors'

const LoaderModal = ({ onVisible }: CustomeModalProps) => {
    return (
        <BaseModal onVisible={onVisible}
            containerStyle={styles.container}
        >
            <ActivityIndicator size={"large"} color={Colors.secondary} />
        </BaseModal>
    )
}

export default LoaderModal

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        width: 70,
        borderRadius: 7
    }
})