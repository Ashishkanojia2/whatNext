import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';
import { useAppDispatch, useAppSelector } from '../../../Redux/reducers/hooks';
import RestApi from '../../../Api/RestApi';
import showToast from '../../../utils/showToast';
import { setuserData } from '../../../Redux/reducers/UserReducer';

const EditProfileScreen = ({ navigation }: any) => {
    const user = useAppSelector((state) => state.user.userData)
    const dispatch = useAppDispatch()
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [address, setAddress] = useState(user.address || '');
    const [landmark, setLandmark] = useState(user.landMark || '');
    const [pinCode, setPinCode] = useState(user.pinCode || '');
    const [image, setImage] = useState({ uri: ".user/duty", type: ".jpeg", fileName: 'ashish.jpeg' })

    const saveProfileHandler = async () => {
      
        const formData = new FormData
        formData.append("name", name || "")
        formData.append("address", address || "")
        formData.append("landMark", landmark || "")
        formData.append("pinCode", pinCode || "")
        formData.append("phone", phone || "")
        if (image) {
            formData.append("avatar", {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
        }
        console.log("data", formData);
        try {
            const res = await RestApi({
                endpoint: "user/updateProfile",
                method: "PUT",
                request: formData,
            })
            console.log("update result", res)
            if (!res) return showToast({ message: res.message });
            if (res || res.status == 200) {
                dispatch(setuserData(res?.result))
                // navigation.goBack();
            }

        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";

            showToast({ message });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Full name</Text>
                <TextInput value={name} onChangeText={setName} style={styles.input} />

                <Text style={styles.label}>Email</Text>
                <TextInput value={email} editable={false} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />

                <Text style={styles.label}>Phone</Text>
                <TextInput value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />

                <Text style={styles.label}>Address</Text>
                <TextInput value={address} onChangeText={setAddress} style={styles.input} />

                <Text style={styles.label}>Landmark</Text>
                <TextInput value={landmark} onChangeText={setLandmark} style={styles.input} />

                <Text style={styles.label}>Pin Code</Text>
                <TextInput value={pinCode} onChangeText={setPinCode} style={styles.input} keyboardType="numeric" />

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
    header: { fontFamily: fonts.SemiBold, fontSize: fp(20), color: Colors.black, marginBottom: 12 },
    form: { marginTop: 8 },
    label: { fontFamily: fonts.Medium, marginTop: 12 },
    input: { backgroundColor: Colors.white, padding: 12, borderRadius: 8, marginTop: 8 },
    saveBtn: { marginTop: 16, backgroundColor: Colors.third, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
    saveTxt: { color: Colors.white, fontFamily: fonts.SemiBold },
});
