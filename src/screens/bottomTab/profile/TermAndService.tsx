import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';
import RestApi from '../../../Api/RestApi';

const TermAndService = () => {
  const [terms, setTerms] = React.useState("");
  useEffect(() => {
    termsandServiceHandler();
  }, [])

  const termsandServiceHandler = async () => {
    try {
      const response = await RestApi({
        method: 'GET',
        endpoint: 'app/TermsAndConditions',
      })
      if (response?.status === 200) {
        setTerms(response?.result);
        console.log("resposne Terms And service", response);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.header}>Terms of Service</Text>
      <Text style={styles.paragraph}>{terms}</Text>
    </ScrollView>
  );
};

export default TermAndService;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary2 },
  header: { fontFamily: fonts.SemiBold, fontSize: fp(22), marginVertical: 8, color: Colors.black },
  sub: { fontFamily: fonts.Medium, marginTop: 8 },
  paragraph: { fontFamily: fonts.Regular, color: Colors.placeHolder, lineHeight: 20, marginBottom: 12 },
});