import React from 'react';
import colors from '../themes/Colors';
import RenderPanel from './RenderPanel';
import { UserData } from '../navigation/types';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppIcons, AppImages } from '../assets';
import { ApplicationStyle } from '../themes';

type RenderOfficerDetailsProps = {
  item: UserData;
  index: number;
  onPress: any;
};

const ICON_SIZE = 30;

const RenderOfficerDetails = ({
  item,
  index,
  onPress,
}: RenderOfficerDetailsProps) => {
  const renderIcons = (phoneNumber?: string) => {
    return (
      <View style={ApplicationStyle.rowAlignCenterJustifyBetween}>
        <View style={styles.iconContainer}>
          <AppIcons.WhatsApp
            width={ICON_SIZE}
            height={ICON_SIZE}
            onPress={() => {
              Linking.openURL(
                `https://api.whatsapp.com/send?phone=${phoneNumber}`,
              );
            }}
          />
        </View>
        <View style={styles.iconContainer}>
          <AppIcons.Phone
            width={ICON_SIZE}
            height={ICON_SIZE}
            onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
          />
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.profileImgContainer}>
        <Image
          style={styles.officerImage}
          resizeMode="contain"
          source={
            item.photo?.includes('https')
              ? {
                  uri: item.photo,
                }
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
          value={item.job_status}
          titleStyle={styles.panelTitle}
          mainContainerStyle={styles.valuePanelMainContainer}
        />
        <RenderPanel
          disabled
          value={item?.designation_id?.toString()}
          titleStyle={styles.panelTitle}
          mainContainerStyle={styles.valuePanelMainContainer}
        />
        <View style={ApplicationStyle.rowAlignCenterJustifyBetween}>
          <RenderPanel
            disabled
            value={item?.mobile_number}
            titleStyle={styles.panelTitle}
            mainContainerStyle={styles.valuePanelMainContainer}
          />
          {renderIcons(item?.mobile_number)}
        </View>
        <View style={ApplicationStyle.rowAlignCenterJustifyBetween}>
          <RenderPanel
            value={item?.alt_mobile_number}
            disabled={false}
            titleStyle={styles.panelTitle}
            mainContainerStyle={styles.valuePanelMainContainer}
            onPress={() => Linking.openURL(`tel:${item?.alt_mobile_number}`)}
          />
          {renderIcons(item?.alt_mobile_number)}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grey,
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
    marginRight: 10,
    overflow: 'hidden',
  },
  iconContainer: {
    padding: 1.5,
    borderRadius: 10,
    borderWidth: 0.5,
  },
});

export default RenderOfficerDetails;
