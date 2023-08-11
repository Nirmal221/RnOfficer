import { StyleSheet } from 'react-native';
import colors from '../../themes/Colors';
import ApplicationStyle from '../../themes/ApplicationStyle';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.secondary,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  imgContainer: {
    borderRadius: 50,
    alignSelf: 'center',
  },
  profileImg: { height: 100, width: 100, borderRadius: 10 },
  panelValue: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  cameraIcon: {
    position: 'absolute',
    height: 25,
    width: 25,
    bottom: 2.5,
    right: 5,
  },
  selectionContainer: {
    marginTop: 5,
    ...ApplicationStyle.rowAlignCenter,
    justifyContent: 'space-between',
  },
  genderContainer: {
    width: '50%',
    ...ApplicationStyle.rowAlignCenter,
  },
  ofcAddressTextInput: {
    maxHeight: 250,
    textAlignVertical: 'top',
    paddingTop: 5,
  },
  createBtnContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.green,
  },
  optionTitle: {
    paddingLeft: 5,
    ...ApplicationStyle.f14w400,
  },
});

export default styles;
