import { Platform, StyleSheet } from 'react-native';
import { statusBarHeight, width } from '../../themes';
import colors from '../../themes/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
  },
  headerTitle: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 10,
    textAlign: 'center',
    paddingVertical: 5,
  },
  searchTextInput: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    marginBottom: 10,
  },
  cityContainer: {
    width: width * 0.44,
    height: width * 0.1,
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityLabel: { fontSize: 15, fontWeight: '600' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? statusBarHeight : statusBarHeight * 0.3,
  },
  headerLeftContainer: {
    width: '33%',
    paddingLeft: 12,
    paddingVertical: 5,
  },
  headerTitleContainer: {
    width: '33%',
    alignItems: 'center',
  },
  headerRightContainer: { width: '33%' },
});

export default styles;
