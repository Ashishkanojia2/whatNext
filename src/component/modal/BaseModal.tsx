import React from 'react';
import {
    Modal,
    ModalProps,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';

import Colors from '../../helper/Colors';

export type CustomeModalProps = {
    onVisible?: boolean,
    onHide?: () => void
}
type BaseModalProps = ModalProps & CustomeModalProps & {
    children?: ViewStyle,
    containerStyle?: ViewStyle
};

const BaseModal = ({
    onVisible,
    onHide,
    children,
    containerStyle,
    ...rest
}: BaseModalProps) => {
    return (
        <Modal
            visible={onVisible}
            animationType="fade"
            transparent
            onRequestClose={onHide}
            hardwareAccelerated
            statusBarTranslucent={true}
            {...rest}
        >
            <TouchableWithoutFeedback onPress={onHide}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.container, containerStyle]}>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default BaseModal;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: Colors.backDrop,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    container: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        width: '100%',
    },
});