import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  APP_CONSTANT,
  GENDER,
  MARITAL_STATUS,
  OFFICER_CLASS,
  STATUS,
  USER_PREFIX,
} from '../../constant';
import { AppIcons } from '../../assets';
import RenderPanel from '../RenderPanel';
import { colors, ApplicationStyle } from '../../themes';

type PrefixOptionProps = {
  selectedPrefix: string;
  setPrefix: (text: string) => void;
};

const PrefixOption = (props: PrefixOptionProps) => {
  const { selectedPrefix, setPrefix } = props;
  return (
    <>
      <RenderPanel
        panelTitle={APP_CONSTANT.PREFIX}
        valueTextStyle={styles.panelValue}
        mainContainerStyle={styles.pT50}
      />
      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={styles.optionTouchableContainer}
          onPress={() => setPrefix(USER_PREFIX.DR)}>
          {selectedPrefix === USER_PREFIX.DR ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.DR}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionTouchableContainer}
          onPress={() => setPrefix(USER_PREFIX.MR)}>
          {selectedPrefix === USER_PREFIX.MR ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.MR}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={styles.optionTouchableContainer}
          onPress={() => setPrefix(USER_PREFIX.MS)}>
          {selectedPrefix === USER_PREFIX.MS ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.MS}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionTouchableContainer}
          onPress={() => setPrefix(USER_PREFIX.MISS)}>
          {selectedPrefix === USER_PREFIX.MISS ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.MISS}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

type GenderOptionProps = {
  selectedGender: string;
  genderSelection: (text: string) => void;
};

const GenderOption = (props: GenderOptionProps) => {
  const { selectedGender, genderSelection } = props;
  return (
    <>
      <RenderPanel
        panelTitle={APP_CONSTANT.GENDER}
        valueTextStyle={{ ...styles.panelValue }}
        mainContainerStyle={styles.pT50}
      />
      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={styles.optionTouchableContainer}
          onPress={() => genderSelection(GENDER.MALE)}>
          {selectedGender === GENDER.MALE ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.MALE}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionTouchableContainer}
          onPress={() => genderSelection(GENDER.FEMALE)}>
          {selectedGender === GENDER.FEMALE ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.FEMALE}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

type MaritalStatusOptionProps = {
  selectedMarritalStatus: string;
  setMarritalStatus: (text: string) => void;
};

const MaritalStatusOption = (props: MaritalStatusOptionProps) => {
  const { selectedMarritalStatus, setMarritalStatus } = props;
  return (
    <>
      <RenderPanel
        panelTitle={APP_CONSTANT.MARITAL_STATUS}
        valueTextStyle={{ ...styles.panelValue }}
        mainContainerStyle={styles.pT50}
      />
      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={[styles.optionTouchableContainer, styles.threeSmallOptionList]}
          onPress={() => setMarritalStatus(MARITAL_STATUS.MARRIED)}>
          {selectedMarritalStatus === MARITAL_STATUS.MARRIED ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.MARRIED}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionTouchableContainer, styles.threeSmallOptionList]}
          onPress={() => setMarritalStatus(MARITAL_STATUS.UN_MARRIED)}>
          {selectedMarritalStatus === MARITAL_STATUS.UN_MARRIED ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.UN_MARRIED}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionTouchableContainer, styles.threeSmallOptionList]}
          onPress={() => setMarritalStatus(MARITAL_STATUS.WIDOW)}>
          {selectedMarritalStatus === MARITAL_STATUS.WIDOW ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.WIDOW}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

type StatusOptionProps = {
  selectedStatus: string;
  statusSelection: (text: string) => void;
};

const StatusOption = (props: StatusOptionProps) => {
  const { selectedStatus, statusSelection } = props;
  return (
    <>
      <RenderPanel
        panelTitle={APP_CONSTANT.JOB_STATUS}
        valueTextStyle={styles.panelValue}
        mainContainerStyle={styles.pT50}
      />
      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={[styles.optionTouchableContainer, styles.threeSmallOptionList]}
          onPress={() => statusSelection(STATUS.CURRENT)}>
          {selectedStatus === STATUS.CURRENT ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.CURRENT}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionTouchableContainer, styles.threeSmallOptionList]}
          onPress={() => statusSelection(STATUS.RETIRED)}>
          {selectedStatus === STATUS.RETIRED ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.RETIRED}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionTouchableContainer, styles.threeSmallOptionList]}
          onPress={() => statusSelection(STATUS.VRS)}>
          {selectedStatus === STATUS.VRS ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.VRS}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

type ClassOptionProps = {
  selectedOfficerClass: string;
  setofficerClass: (text: string) => void;
};

const ClassOption = (props: ClassOptionProps) => {
  const { selectedOfficerClass, setofficerClass } = props;
  return (
    <>
      <RenderPanel
        panelTitle={APP_CONSTANT.CLASS}
        valueTextStyle={styles.panelValue}
        mainContainerStyle={styles.pT50}
      />
      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={[styles.optionTouchableContainer, styles.fourSmallOptionList]}
          onPress={() => setofficerClass(OFFICER_CLASS.ONE)}>
          {selectedOfficerClass === OFFICER_CLASS.ONE ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.ONE}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionTouchableContainer, styles.fourSmallOptionList]}
          onPress={() => setofficerClass(OFFICER_CLASS.TWO)}>
          {selectedOfficerClass === OFFICER_CLASS.TWO ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.TWO}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionTouchableContainer, styles.fourSmallOptionList]}
          onPress={() => setofficerClass(OFFICER_CLASS.THREE)}>
          {selectedOfficerClass === OFFICER_CLASS.THREE ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.THREE}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionTouchableContainer, styles.fourSmallOptionList]}
          onPress={() => setofficerClass(OFFICER_CLASS.FOUR)}>
          {selectedOfficerClass === OFFICER_CLASS.FOUR ? (
            <AppIcons.FillRadioBtn color={colors.green} />
          ) : (
            <AppIcons.RadioBtn />
          )}
          <Text style={styles.optionTitle}>{APP_CONSTANT.FOUR}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  panelValue: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.black,
    paddingHorizontal: 10,
    fontSize: 15,
    paddingVertical: 10,
  },
  pT50: { paddingVertical: 0, paddingTop: 10 },
  selectionContainer: {
    marginTop: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    ...ApplicationStyle.rowAlignCenter,
    justifyContent: 'space-between',
  },
  optionTouchableContainer: {
    width: '50%',
    ...ApplicationStyle.rowAlignCenter,
  },
  optionTitle: {
    paddingLeft: 5,
    paddingTop: 2,
    color: colors.black,
    ...ApplicationStyle.f14w400,
  },
  threeSmallOptionList: {
    width: '33%',
  },
  fourSmallOptionList: {
    width: '25%',
  },
});

export {
  PrefixOption,
  GenderOption,
  MaritalStatusOption,
  StatusOption,
  ClassOption,
};
