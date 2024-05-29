import React from 'react';
import {
  View,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { AppImages } from '../assets';
import colors from '../themes/Colors';
import RenderPanel from './RenderPanel';
import { UserData } from '../navigation/types';
import { ApiConstant } from '../services/ApiServices';

type RenderOfficerDetailsProps = {
  item: UserData;
  index: number;
  onPress: any;
};

const RenderOfficerDetails = ({
  item,
  index,
  onPress,
}: RenderOfficerDetailsProps) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, isDark && styles.containerDark]}
      onPress={onPress}>
      <View style={styles.profileImgContainer}>
        <Image
          style={styles.officerImage}
          resizeMode="cover"
          source={
            item.photo?.includes('https')
              ? {
                  uri: item.photo,
                }
              : item.photo?.includes('jpg')
              ? { uri: ApiConstant.BASE_URL_IMAGE + item.photo }
              : AppImages.Dummy
          }
        />
      </View>
      <View style={{ flex: 1 }}>
        <RenderPanel
          disabled
          value={`${item.prefix}. ${item.first_name} ${item.middal_name} ${item.last_name}`}
          containerStyle={styles.containerStyle}
          mainContainerStyle={styles.valuePanelMainContainer}
        />
        <RenderPanel
          disabled
          value={item?.designation_id?.toString()}
          valueTextStyle={styles.panelTitle}
          mainContainerStyle={styles.valuePanelMainContainer}
        />
        <RenderPanel
          disabled
          value={item?.mobile_number}
          titleStyle={styles.panelTitle}
          mainContainerStyle={styles.valuePanelMainContainer}
        />
        <RenderPanel
          disabled
          value={item?.alt_mobile_number}
          mainContainerStyle={styles.valuePanelMainContainer}
          onPress={() => Linking.openURL(`tel:${item?.alt_mobile_number}`)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: colors.secondary,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  containerDark: {
    backgroundColor: colors.grey,
    shadowColor: colors.secondary,
  },
  officerImage: {
    width: 100,
    height: 100,
  },
  containerStyle: {
    justifyContent: 'space-between',
  },
  panelTitle: { flex: 1 },
  valuePanelMainContainer: { paddingVertical: 0 },
  profileImgContainer: {
    borderRadius: 10,
    marginRight: 20,
    overflow: 'hidden',
  },
  iconContainer: {
    padding: 1.5,
    borderRadius: 10,
  },
});

export default RenderOfficerDetails;
