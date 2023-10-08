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
  ViewStyle,
} from 'react-native';
import moment from 'moment';
import { AppIcons, AppImages } from '../assets';
import { UserData } from '../navigation/types';
import ApplicationStyle from '../themes/ApplicationStyle';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const RenderPanel = ({
  title,
  value,
  showSeprator,
  disabled = true,
  panelContainerStyle,
  onPressValue = () => {},
}: {
  title?: string | undefined;
  value?: string | undefined;
  showSeprator?: boolean;
  disabled?: boolean;
  panelContainerStyle?: ViewStyle;
  onPressValue?: () => void;
}) => {
  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        style={[styles.panelContainer, panelContainerStyle]}
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
      handleStyle={{ backgroundColor: colors.grey }}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.profileImg}
          resizeMode="contain"
          source={
            selectedOfficer.photo?.includes('https')
              ? {
                  uri: selectedOfficer?.photo,
                }
              : AppImages.Dummy
          }
        />
        <Text style={styles.name}>
          {`${selectedOfficer?.prefix}. ${selectedOfficer?.first_name} ${selectedOfficer?.middal_name} ${selectedOfficer?.last_name} `}
          <Text
            style={
              ApplicationStyle.f20w400
            }>{`(${selectedOfficer?.job_status})`}</Text>
        </Text>
      </View>
      <BottomSheetScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerScrollView}>
        <View style={styles.contentContainer}>
          <RenderPanel
            showSeprator
            disabled={false}
            title={APP_CONSTANT.EMAIL}
            value={selectedOfficer?.email}
            onPressValue={() => {
              Linking.openURL(`mailto:${selectedOfficer?.email}`);
            }}
          />
          <View style={ApplicationStyle.rowAlignCenter}>
            <RenderPanel
              disabled={false}
              title={APP_CONSTANT.MOBILE_NO}
              value={`${selectedOfficer?.mobile_number}`}
              onPressValue={() =>
                Linking.openURL(`tel:${selectedOfficer?.mobile_number}`)
              }
              panelContainerStyle={{ flex: 1 }}
            />
            <AppIcons.WhatsApp
              height={30}
              width={30}
              onPress={() =>
                Linking.openURL(
                  `https://api.whatsapp.com/send?phone=${selectedOfficer?.mobile_number}`,
                )
              }
            />
          </View>

          <View style={ApplicationStyle.rowAlignCenter}>
            <RenderPanel
              showSeprator
              disabled={false}
              value={`${selectedOfficer?.alt_mobile_number}`}
              onPressValue={() =>
                Linking.openURL(`tel:${selectedOfficer?.alt_mobile_number}`)
              }
              panelContainerStyle={{ flex: 1 }}
            />
            <AppIcons.WhatsApp
              height={30}
              width={30}
              onPress={() =>
                Linking.openURL(
                  `https://api.whatsapp.com/send?phone=${selectedOfficer?.alt_mobile_number}`,
                )
              }
            />
          </View>
          <View style={styles.separator} />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.GENDER}
            value={`${selectedOfficer.gender}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.DOB}
            value={`${moment(selectedOfficer.dob).format('DD-MMM-YYYY')}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.DESIGNATION}
            value={`${selectedOfficer.designation_id}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.CLASS}
            value={`${selectedOfficer.class}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.OFFICE_ADDRESS}
            value={`${selectedOfficer?.office_address}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.OFFICE_DISTRICT}
            value={`${selectedOfficer?.office_district_id}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.NATIVE_ADDRESS}
            value={`${selectedOfficer.native_address}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.NATIVE_DISTRICT}
            value={`${selectedOfficer?.native_district_id}`}
          />
          <RenderPanel
            showSeprator
            title={APP_CONSTANT.SPECELIZATOIN}
            value={`${selectedOfficer?.specialization}`}
          />
          <RenderPanel
            showSeprator={false}
            title={APP_CONSTANT.REMARKS}
            value={`${selectedOfficer?.remarks}`}
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
    backgroundColor: colors.grey,
  },
  imgContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal: 20,
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
    flex: 1,
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
  name: {
    paddingTop: 10,
    ...ApplicationStyle.f20w600,
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
