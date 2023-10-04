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
  pT50: { paddingVertical: 0, paddingTop: 10 },
  cameraIcon: {
    position: 'absolute',
    height: 25,
    width: 25,
    bottom: 2.5,
    right: 5,
  },
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
  threeSmallOptionList: {
    width: '33%',
  },
  fourSmallOptionList: {
    width: '25%',
  },
  ofcAddressTextInput: {
    maxHeight: 250,
    textAlignVertical: 'top',
    paddingTop: 5,
  },
  createBtnContainer: {
    marginHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 15,
    backgroundColor: colors.green,
  },
  optionTitle: {
    paddingLeft: 5,
    paddingTop: 2,
    ...ApplicationStyle.f14w400,
  },
  uploadIdContainer: {
    height: 100,
    width: 100,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 5,
    borderStyle: 'dashed',
  },
  uploadIdTitle: {
    textAlign: 'center',
    color: colors.grey,
    ...ApplicationStyle.f15w500,
  },
  officerImg: { height: 100, width: 100, borderRadius: 10, marginVertical: 10 },
  otherUploadImgContainer: { alignSelf: 'flex-start' },
  otherCameraIcon: { bottom: 15 },
});

export default styles;
