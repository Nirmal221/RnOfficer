import React from 'react';
import colors from '../themes/Colors';
import { APP_CONSTANT } from '../constant';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ApplicationStyle from '../themes/ApplicationStyle';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { UserData } from '../navigation/types';

const RenderPanel = ({
  title,
  value,
  showSeprator,
  disabled = true,
  onPressValue = () => {},
}: {
  title?: string | undefined;
  value?: string | undefined;
  showSeprator: boolean;
  disabled?: boolean;
  onPressValue?: () => void;
}) => {
  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        style={styles.panelContainer}
        onPress={onPressValue}>
        <Text style={styles.panelTitle}>{title}</Text>
        <Text style={styles.valueText}>{value !== 'null' ? value : ''}</Text>
      </TouchableOpacity>
      {showSeprator && <View style={styles.separator} />}
    </>
  );
};

const OfficerDetail = ({
  bottomSheetRef,
  snapPoints,
  selectedOfficer,
}: {
  bottomSheetRef: any;
  snapPoints: any;
  selectedOfficer: UserData;
}) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      handleStyle={{ backgroundColor: colors.secondaryLight }}>
      <BottomSheetScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerScrollView}>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: selectedOfficer?.photo,
            }}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <RenderPanel
            title={APP_CONSTANT.NAME}
            showSeprator
            value={selectedOfficer?.first_name}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.MIDDAL_NAME}
            value={selectedOfficer?.middal_name}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.SURENAME}
            value={selectedOfficer?.last_name}
          />
          <RenderPanel
            showSeprator
            disabled={false}
            title={APP_CONSTANT.EMAIL}
            value={selectedOfficer?.email}
            onPressValue={() => {
              Linking.openURL(`mailto:${selectedOfficer?.email}`);
            }}
          />
          <RenderPanel
            showSeprator
            disabled={false}
            title={APP_CONSTANT.MOBILE_NO}
            value={`${selectedOfficer?.mobile_number}`}
            onPressValue={() =>
              Linking.openURL(`tel:${selectedOfficer?.mobile_number}`)
            }
          />
          <RenderPanel
            showSeprator
            disabled={false}
            title={APP_CONSTANT.MOBILE_NO}
            value={`${selectedOfficer?.alt_mobile_number}`}
            onPressValue={() =>
              Linking.openURL(`tel:${selectedOfficer?.alt_mobile_number}`)
            }
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.DESIGNATION}
            value={`${selectedOfficer.designation_id}`}
          />
          <RenderPanel
            title={APP_CONSTANT.NATIVE_DISTRICT_ADDRESS}
            value={`${selectedOfficer.native_address}`}
            showSeprator={false}
          />
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.secondaryLight,
  },
  imgContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImg: { height: 100, width: 100, borderRadius: 50 },
  contentContainer: {
    backgroundColor: colors.secondary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  panelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  panelTitle: {
    flex: 0.5,
    ...ApplicationStyle.f16w400,
    color: colors.black,
  },
  valueContainer: {
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderRadius: 1,
    borderLeftColor: colors.grey,
  },
  valueText: {
    flex: 1,
    textAlign: 'right',
    ...ApplicationStyle.f16w400,
    color: colors.blue,
  },
  separator: {
    height: 1,
    backgroundColor: colors.grey,
    borderRadius: 10,
    opacity: 0.5,
  },
  contentContainerScrollView: { paddingBottom: 100 },
});

export default OfficerDetail;
