import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Colors from '@themes/Colors'
import { Poppins } from '@themes/Fonts'
import { Icons } from '@assets/icons'
import AppButton from '@components/AppButton'
type ConfirmDialogProps = {
    visible?: boolean
    onClose?: () => void
    onDenyPress?: () => void,
    onApprovePress?: () => void,
    title?: string,
    message?: string
    leftBtnText?: string,
    RightBtnText?: string,
}
const ConfirmDialog = ({ visible, onClose, onDenyPress, onApprovePress, message, title, leftBtnText, RightBtnText }: ConfirmDialogProps) => {
    return (
        <Modal
            animationType={'fade'}
            transparent
            visible={visible}
            hardwareAccelerated
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.rootContainer}>
                            <TouchableOpacity style={{ alignSelf: "flex-end" }} activeOpacity={0.7} onPress={onClose}>
                                <Image source={Icons.CLOSE_SING} style={{ height: 24, width: 24 }} resizeMode="contain" />
                            </TouchableOpacity>
                            <Text style={styles.title} numberOfLines={2} >{title}</Text>
                            <Text style={styles.subTitle} numberOfLines={3}>{message}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 34, gap: 12 }}>
                                <AppButton title={leftBtnText ?? 'Cancel'} onPress={onDenyPress ?? onClose} style={styles.cancelBtn} titleStyle={{ fontSize: 12, color: Colors.black }} />
                                <AppButton title={RightBtnText ?? 'Okay'} onPress={onApprovePress ?? onClose} style={{ flex: 2 }} titleStyle={{ fontSize: 12 }} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default ConfirmDialog

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: Colors.backDrop,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rootContainer: {
        maxHeight: "90%",
        width: "83%",
        borderRadius: 14,
        backgroundColor: Colors.white,
        paddingHorizontal: 24,
        paddingVertical: 20,
        elevation: 5,
        alignItems: "center",
        overflow: "hidden"
    },
    title: {
        fontFamily: Poppins.bold,
        fontSize: 16,
        textAlign: "center"
    },
    subTitle: {
        fontFamily: Poppins.regular,
        fontSize: 12,
        marginHorizontal: 15,
        textAlign: "center"
    },
    mainIcon: { height: 36, width: 36, marginBottom: 17 },
    cancelBtn: { flex: 2, backgroundColor: Colors.white, borderColor: Colors.lightBlack, borderWidth: 1 }
})