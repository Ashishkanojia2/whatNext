import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import fonts from '../../assets/fonts';
import Images from '../../assets/Images';
import { useNavigation } from '@react-navigation/native';
import { fp } from '../../helper/Responsive';
import Colors from '../../helper/Colors';
type CustomerHeaderProps = {
    title?: string;
    leftItem?: React.ReactNode;
    rightItem?: React.ReactNode;
    backHandler?: boolean;
    leftIconPress?: () => void;

}
const CustomerHeader: React.FC<CustomerHeaderProps> = ({
    title, leftItem, rightItem, backHandler, leftIconPress
}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {backHandler ?
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => leftIconPress ?? navigation.goBack()}
                >
                    <Image
                        source={Images.backIcon}
                        style={{
                            height: 25,
                            width: 25,
                        }}
                    />
                </TouchableOpacity>
                :
                <View>{leftItem}</View>
            }
            <Text style={styles.title}>{title}</Text>
            {
                rightItem ? <View>{rightItem}</View> : <View style={{ width: 25 }} />
            }
        </View>
    )
}

export default CustomerHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:15
    },
    title: {
        fontFamily: fonts.SemiBold, fontSize: fp(20), padding: 12, color: Colors.black
    },
})