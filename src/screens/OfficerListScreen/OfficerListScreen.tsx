import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  RefreshControl,
  Text,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RenderOfficerDetails } from '../../components';
import { width } from '../../themes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation';

type OfficerListScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'OfficerListScreen'
>;

const OfficerListScreen = (props: OfficerListScreenProps) => {
  const { route } = props;
  const title = route.params.cityObj?.name;
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TextInput
          value={search}
          placeholder="Search"
          style={styles.searchTextInput}
          onChangeText={(text: string) => setSearch(text)}
        />
        <FlatList
          data={['Surat', 'Ahemedabad', 'Vadodara', 'Jamnagar']}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={['#9Bd35A', '#689F38']}
              tintColor={'#9Bd35A'}
              onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                  setRefreshing(false);
                }, 1500);
              }}
            />
          }
          renderItem={({ item, index }) => (
            <RenderOfficerDetails item={item} index={index} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    marginBottom: 10,
  },
  cityContainer: {
    width: width * 0.44,
    height: width * 0.1,
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityLabel: { fontSize: 15, fontWeight: '600' },
});

export default OfficerListScreen;
