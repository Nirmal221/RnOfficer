import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import { AppStackParamList } from '../../navigation';
import { RenderOfficerDetails } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../themes/Colors';
import { DESIGNATION } from '../../constant';
import { AppIcons } from '../../assets';
import styles from './OfficerListScreen.style';

type OfficerListScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'OfficerListScreen'
>;

const OfficerListScreen = (props: OfficerListScreenProps) => {
  const { navigation, route } = props;
  const title = route.params.cityObj?.name;
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={styles.mainContainer} edges={['']}>
      <LinearGradient
        colors={['#E0D2C7', '#44B09E']}
        style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerLeftContainer}
          onPress={() => navigation.goBack()}>
          <AppIcons.BackArrow color={colors.secondary} height={20} width={20} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.headerRightContainer} />
      </LinearGradient>
      <View style={styles.container}>
        <TextInput
          value={search}
          placeholder="Search"
          style={styles.searchTextInput}
          onChangeText={(text: string) => setSearch(text)}
        />
        <FlatList
          data={DESIGNATION}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
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

export default OfficerListScreen;
