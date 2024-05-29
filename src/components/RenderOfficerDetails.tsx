import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import moment from 'moment';
import colors from '../themes/Colors';
import RenderPanel from './RenderPanel';
import { UserData } from '../navigation/types';
import ActionButton from './ActionButton';

type RenderOfficerDetailsProps = {
  item: UserData;
  index: number;
  onPress: any;
};

const RenderOfficerDetails = ({ item, onPress }: RenderOfficerDetailsProps) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, isDark && styles.containerDark]}
      onPress={onPress}>
      <View style={{ flex: 1 }}>
        <RenderPanel
          disabled
          title="Title"
          value={item.title}
          containerStyle={styles.containerStyle}
          mainContainerStyle={styles.valuePanelMainContainer}
        />
        <RenderPanel
          disabled
          title="Description"
          value={item.description}
          containerStyle={styles.containerStyle}
          mainContainerStyle={styles.valuePanelMainContainer}
        />
        <RenderPanel
          disabled
          title="Time"
          value={`${moment(item.date).format('DD-MM-YYYY')}`}
          containerStyle={styles.containerStyle}
          mainContainerStyle={styles.valuePanelMainContainer}
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
    marginHorizontal: 20,
    backgroundColor: colors.secondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.grey,
    shadowColor: colors.black,
    shadowOffset: { width: 1, height: 1 },
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
