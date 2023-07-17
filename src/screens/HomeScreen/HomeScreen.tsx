import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { statusBarHeight, width } from '../../themes';
import { AppStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { APP_CONSTANT, DISTRICT } from '../../constant';
import colors from '../../themes/Colors';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [districtList, setDistrictList] = useState(DISTRICT);
  const [refreshing, setRefreshing] = useState(false);

  const onSearch = (text: string) => {
    setSearch(text);
    const filtered = DISTRICT.filter(e =>
      e.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
    );
    if (filtered.length > 0) {
      setDistrictList(filtered);
    } else {
      setDistrictList(DISTRICT);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['']}>
      <LinearGradient
        colors={[colors.primary, colors.pink]}
        style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{APP_CONSTANT.DISTRICT}</Text>
      </LinearGradient>
      <View style={styles.container}>
        <TextInput
          value={search}
          placeholder="Search"
          style={styles.searchTextInput}
          onChangeText={(text: string) => onSearch(text)}
        />
        <FlatList
          data={districtList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={['#9Bd35A', '#689F38']}
              tintColor={'#9Bd35A'}
              onRefresh={() => onRefresh()}
            />
          }
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          keyboardDismissMode="on-drag"
          renderItem={({ item }) => (
            <LinearGradient
              colors={[colors.primary, colors.pink]}
              style={styles.linearGradient}>
              <TouchableOpacity
                style={styles.cityContainer}
                onPress={() => {
                  navigation.navigate('OfficerListScreen', {
                    cityObj: { name: item.title },
                  });
                }}>
                <Text style={styles.cityLabel}>{item.title}</Text>
              </TouchableOpacity>
            </LinearGradient>
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
    padding: 12,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? statusBarHeight : statusBarHeight * 0.3,
  },
  headerTitle: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 10,
    textAlign: 'center',
  },
  searchTextInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    fontSize: 15,
    marginBottom: 10,
  },
  cityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityLabel: { fontSize: 15, fontWeight: '600' },
  linearGradient: {
    width: width * 0.43,
    height: width * 0.1,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
