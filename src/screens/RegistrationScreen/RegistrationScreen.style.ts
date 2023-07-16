import { Platform, StyleSheet } from 'react-native';
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
  headerContainer: {
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 1,
    elevation: 5,
    marginBottom: 10,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
  imgContainer: {
    borderRadius: 50,
    alignSelf: 'center',
  },
  profileImg: { height: 100, width: 100, borderRadius: 10 },
  dob: {
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
  radioBtn: {
    height: 20,
    width: 20,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginRight: 5,
    borderWidth: 0.5,
  },
  selectedRadioBtn: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
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
  ofcAddressTextInput: { maxHeight: 250, textAlignVertical: 'top' },
  createBtnContainer: { marginHorizontal: 20 },
});

export default styles;
