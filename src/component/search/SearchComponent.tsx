import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import useThrottling from '../../Hooks/useThrottling';

const SearchComponent = () => {
    const [searchText, setSearchText] = useState('');
    const searchHandler = useCallback((text: string) => {
        console.log("API Called:", text);
    }, []);

    const throttledSearch = useThrottling(searchHandler, 5000);

    return (
        <View>
            <Text>SearchComponent</Text>
            <TextInput
                value={searchText}
                // onChangeText={() => searchHandler}
                onChangeText={(text) => {
                    setSearchText(text);
                    throttledSearch(text);
                }}
                placeholder='Search'
                style={{
                    borderWidth: 1,
                    borderColor: '#df1e1eff',
                    borderRadius: 5,
                    marginHorizontal: 10
                }}
            />
        </View>
    )
}

export default SearchComponent

const styles = StyleSheet.create({})