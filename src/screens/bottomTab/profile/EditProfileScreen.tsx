import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
} from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';
import { useAppDispatch, useAppSelector } from '../../../Redux/reducers/hooks';
import RestApi from '../../../Api/RestApi';
import showToast from '../../../utils/showToast';
import { setuserData } from '../../../Redux/reducers/UserReducer';
import Images from '../../../assets/Images';
import { customImagePicker } from '../../../component/customeImagePicker';

const EditProfileScreen = ({ navigation }: any) => {
    const user = useAppSelector(state => state.user.userData);
    const dispatch = useAppDispatch();
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [address, setAddress] = useState(user.address || '');
    const [landmark, setLandmark] = useState(user.landMark || '');
    const [pinCode, setPinCode] = useState(user.pinCode || '');
    const [image, setImage] = useState({ uri: '', type: '', fileName: '' });

    const saveProfileHandler = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name || '');
            formData.append('address', address || '');
            formData.append('landMark', landmark || '');
            formData.append('pinCode', pinCode || '');
            formData.append('phone', phone || '');
            if (image?.uri) {
                formData.append('avatar', {
                    uri: image.uri,
                    type: image.type,
                    name: image.fileName,
                } as any);
            }
            console.log('data', formData);
            const res = await RestApi({
                endpoint: 'user/updateProfile',
                method: 'PUT',
                request: formData,
            });
            console.log('update result💚', res);
            if (!res) return showToast({ message: res.message });
            if (res || res.status == 201) {
                dispatch(setuserData(res?.result));
                showToast({
                    message: res.message || 'Profile updated successfully',
                    type: 'success',
                });
                setTimeout(() => {
            navigation.goBack();
                }, 3000)
            }
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Something went wrong';

            showToast({ message });
        }
    };

    const imagePickerHandler = async ({
        pickerType,
    }: {
        pickerType: 'gallery' | 'camera';
    }) => {
        const data = await customImagePicker(pickerType);
        console.log('data', data);
        if (!data?.filename) return;
        setImage({
            uri: data?.path.startsWith('file://') ? data.path : `file://${data.path}`,
            type: data?.mime,
            fileName: data?.filename,
        });
    };

    console.log('image', image);

    const userProfile = image?.uri
        ? { uri: image.uri }
        : user?.avatar
            ? { uri: user.avatar.url }
            : Images.inactiveProfile;
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>

            <View style={styles.ProfileContainer}>
                <Image
                    source={userProfile}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: Colors.primary,
                    }}
                />
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: Colors.white,
                    alignSelf: 'center',
                    marginTop: 10,
                }}
                onPress={() => imagePickerHandler({ pickerType: 'gallery' })}
            >
                <Text style={styles.uploadbtn}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.form}>
                <Text style={styles.label}>Full name</Text>
                <TextInput
                    value={name}
                    onChangeText={v => setName(v)}
                    style={styles.input}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={email}
                    editable={false}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Phone</Text>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.input}
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Address</Text>
                <TextInput
                    value={address}
                    onChangeText={setAddress}
                    style={styles.input}
                />

                <Text style={styles.label}>Landmark</Text>
                <TextInput
                    value={landmark}
                    onChangeText={setLandmark}
                    style={styles.input}
                />

                <Text style={styles.label}>Pin Code</Text>
                <TextInput
                    value={pinCode}
                    onChangeText={setPinCode}
                    style={styles.input}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.saveBtn} onPress={saveProfileHandler}>
                    <Text style={styles.saveTxt}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primary2, padding: 12 },
    header: {
        fontFamily: fonts.SemiBold,
        fontSize: fp(20),
        color: Colors.black,
        marginBottom: 12,
    },
    form: { marginTop: 8 },
    label: { fontFamily: fonts.Medium, marginTop: 12 },
    input: {
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
    },
    saveBtn: {
        marginTop: 16,
        backgroundColor: Colors.third,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveTxt: { color: Colors.white, fontFamily: fonts.SemiBold },
    ProfileContainer: {
        backgroundColor: Colors.secondary,
        borderRadius: 50,
        height: 90,
        width: 90,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    uploadbtn: {
        fontFamily: fonts.Regular,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        elevation: 5,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        shadowColor: Colors.secondary,
    },
});
