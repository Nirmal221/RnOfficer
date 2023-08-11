import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import { AppIcons } from '../../assets';
import colors from '../../themes/Colors';
import { DESIGNATION } from '../../constant';
import styles from './OfficerListScreen.style';
import { AppStackParamList } from '../../navigation';
import { RenderOfficerDetails } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

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
        colors={[colors.secondary, colors.green]}
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
          placeholderTextColor={colors.grey}
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
