import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import { APP_CONSTANT } from '../../constant';
import { ApiConstant, get } from '../../services/ApiServices';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList, DistrictsObject } from '../../navigation/types';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const { navigation } = props;
  // const [search, setSearch] = useState('');
  const [districtList, setDistrictList] = useState<Array<DistrictsObject>>([]);
  // const [searchList, setSearchList] = useState<Array<DistrictsObject>>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getDistrict();
  }, []);

  const getDistrict = () => {
    get(ApiConstant.DISTRICTS)
      .then((res: any) => {
        setDistrictList(res?.data?.data);
      })
      .catch(() => null);
  };

  // const onSearch = (text: string) => {
  //   setSearch(text);
  //   const filtered = districtList.filter((e: DistrictsObject) =>
  //     e?.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
  //   );
  //   if (filtered.length > 0) {
  //     setSearchList(filtered);
  //   } else {
  //     setSearchList([]);
  //   }
  // };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{APP_CONSTANT.DISTRICT}</Text>
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
          // ListHeaderComponent={
          //   <TextInput
          //     value={search}
          //     placeholder={APP_CONSTANT.SEARCH}
          //     placeholderTextColor={colors.grey}
          //     style={styles.searchTextInput}
          //     onChangeText={(text: string) => onSearch(text)}
          //   />
          // }
          renderItem={({ item }: { item: DistrictsObject }) => {
            const itemTitle = item?.name;
            return (
              <View style={styles.linearGradient}>
                <TouchableOpacity
                  style={styles.cityContainer}
                  onPress={() => {
                    navigation.navigate('OfficerListScreen', {
                      cityObj: item,
                    });
                  }}>
                  <Text style={styles.cityLabel} numberOfLines={1}>
                    {itemTitle}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
