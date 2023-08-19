import React from 'react';
import colors from '../themes/Colors';
import { APP_CONSTANT } from '../constant';
import ApplicationStyle from '../themes/ApplicationStyle';
import { Image, StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const RenderPanel = ({
  title,
  value,
  showSeprator,
  onPressValue = () => {},
}: {
  title: string;
  value: string;
  showSeprator: boolean;
  onPressValue?: () => undefined;
}) => {
  return (
    <>
      <View style={styles.panelContainer}>
        <Text style={styles.panelTitle}>{title}</Text>
        <Text style={styles.valueText} onPress={onPressValue}>
          {value !== 'null' ? value : ''}
        </Text>
      </View>
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
  selectedOfficer: any;
}) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      handleStyle={{ backgroundColor: colors.secondaryLight }}>
      <BottomSheetScrollView style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: selectedOfficer?.profileImg || selectedOfficer?.photoURL,
            }}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <RenderPanel
            title={APP_CONSTANT.NAME}
            value={selectedOfficer?.name || selectedOfficer?.displayName}
            showSeprator={true}
          />
          <RenderPanel
            title={APP_CONSTANT.MIDDAL_NAME}
            value={selectedOfficer?.middalName}
            showSeprator={true}
          />
          <RenderPanel
            title={APP_CONSTANT.SURENAME}
            value={selectedOfficer.sureName}
            showSeprator={true}
          />
          <RenderPanel
            title={APP_CONSTANT.EMAIL}
            value={selectedOfficer?.email}
            showSeprator={true}
            onPressValue={() => {}}
          />
          <RenderPanel
            title={APP_CONSTANT.MOBILE_NO}
            value={`${selectedOfficer?.phoneNumber}`}
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
    ...ApplicationStyle.f16w400,
    color: colors.blue,
  },
  separator: {
    height: 1,
    backgroundColor: colors.grey,
    borderRadius: 10,
    opacity: 0.5,
  },
});

export default OfficerDetail;
