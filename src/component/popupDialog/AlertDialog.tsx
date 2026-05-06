import { Image, ImageSourcePropType, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Icons } from '../../assets/Icons'
import AppButton from '../AppButton'
import Colors from '../../helper/Colors'
import fonts from '../../assets/fonts'
type AlertDialogProps = {
    visible?: boolean
    onClose?: () => void
    onBtnPress?: () => void,
    title?: string,
    message?: string
    btnText?: string,
    icon?: ImageSourcePropType
}
const AlertDialog = ({ visible, onClose, onBtnPress, message, title, btnText, icon }: AlertDialogProps) => {
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
                                <Image source={Icons.CLOSE_SIGN} style={{ height: 24, width: 24 }} resizeMode="contain" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={icon} style={styles.mainIcon} resizeMode="contain" />
                            </TouchableOpacity>
                            <Text style={styles.title} numberOfLines={2} >{title}</Text>
                            <Text style={styles.subTitle} numberOfLines={3}>{message}</Text>
                            <AppButton title={btnText ?? 'Okay'} onPress={onBtnPress ?? onClose} style={{ marginTop: 20 }} titleStyle={{ fontSize: 12 }} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default AlertDialog

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
        fontFamily:fonts.SemiBold,
        fontSize: 16,
        textAlign: "center"
    },
    subTitle: {
        fontFamily: fonts.Regular,
        fontSize: 12,
        marginHorizontal: 15,
        textAlign: "center"
    },
    mainIcon: { height: 36, width: 36, marginBottom: 17 }
})