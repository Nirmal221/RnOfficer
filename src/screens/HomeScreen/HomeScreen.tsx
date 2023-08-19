import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  TextInput,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { AppIcons } from '../../assets';
import colors from '../../themes/Colors';
import { ICON_SIZE, width } from '../../themes';
import { AppStackParamList } from '../../navigation';
import { APP_CONSTANT, DISTRICT } from '../../constant';
import ApplicationStyle from '../../themes/ApplicationStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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

  const onPressSetting = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(StackActions.replace('AuthStack'));
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <AppIcons.Avatar
            height={ICON_SIZE.I_30}
            width={ICON_SIZE.I_30}
            color={colors.secondary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{APP_CONSTANT.DISTRICT}</Text>
        <TouchableOpacity onPress={() => onPressSetting()}>
          <AppIcons.Setting
            height={ICON_SIZE.I_30}
            width={ICON_SIZE.I_30}
            color={colors.black}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
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
          columnWrapperStyle={styles.columnWrapperStyle}
          keyboardDismissMode="on-drag"
          ListHeaderComponent={
            <TextInput
              value={search}
              placeholder={APP_CONSTANT.SEARCH}
              placeholderTextColor={colors.grey}
              style={styles.searchTextInput}
              onChangeText={(text: string) => onSearch(text)}
            />
          }
          renderItem={({ item }) => (
            <View style={styles.linearGradient}>
              <TouchableOpacity
                style={styles.cityContainer}
                onPress={() => {
                  navigation.navigate('OfficerListScreen', {
                    cityObj: { name: item.title },
                  });
                }}>
                <Text style={styles.cityLabel} numberOfLines={1}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: colors.secondary,
  },
  headerContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    ...ApplicationStyle.headerShadow,
  },
  headerTitle: {
    color: colors.black,
    ...ApplicationStyle.f17w500,
  },
  searchTextInput: {
    borderWidth: 1,
    borderColor: colors.grey,
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
  cityLabel: { ...ApplicationStyle.f15w600, color: colors.black },
  linearGradient: {
    width: width * 0.45,
    height: width * 0.1,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  columnWrapperStyle: { justifyContent: 'space-between' },
});

export default HomeScreen;
