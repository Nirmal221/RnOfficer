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
import { AppStackParamList } from '../../navigation';
import { APP_CONSTANT, DISTRICT } from '../../constant';
import LinearGradient from 'react-native-linear-gradient';
import ApplicationStyle from '../../themes/ApplicationStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ICON_SIZE, statusBarHeight, width } from '../../themes';
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
    <SafeAreaView style={styles.mainContainer} edges={['']}>
      <LinearGradient
        colors={[colors.secondary, colors.green]}
        style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}>
          <AppIcons.Avatar
            height={ICON_SIZE.I_30}
            width={ICON_SIZE.I_30}
            color={colors.secondary}
          />
        </TouchableOpacity>
        {/* <View style={{ paddingHorizontal: 20 }} /> */}
        <Text style={styles.headerTitle}>{APP_CONSTANT.DISTRICT}</Text>
        <TouchableOpacity onPress={() => onPressSetting()}>
          <AppIcons.Setting
            height={ICON_SIZE.I_30}
            width={ICON_SIZE.I_30}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.container}>
        <TextInput
          value={search}
          placeholder="Search"
          placeholderTextColor={colors.grey}
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
          columnWrapperStyle={styles.columnWrapperStyle}
          keyboardDismissMode="on-drag"
          renderItem={({ item }) => (
            <LinearGradient
              colors={[colors.secondary, colors.green]}
              style={styles.linearGradient}>
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
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.secondary,
  },
  headerContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? statusBarHeight : statusBarHeight * 0.3,
  },
  headerTitle: {
    color: colors.secondary,
    ...ApplicationStyle.f20w600,
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
  cityLabel: { ...ApplicationStyle.f15w600, color: colors.secondary },
  linearGradient: {
    width: width * 0.45,
    height: width * 0.1,
    marginBottom: 10,
    borderRadius: 10,
  },
  columnWrapperStyle: { justifyContent: 'space-between' },
});

export default HomeScreen;
