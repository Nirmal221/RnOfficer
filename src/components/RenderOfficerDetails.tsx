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

type RenderOfficerDetailsProps = {
  item: UserData;
  index: number;
  onPress: any;
};

const RenderOfficerDetails = ({
  item,
  index,
  onPress,
}: RenderOfficerDetailsProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.profileImgContainer}>
        <Image
          style={styles.officerImage}
          resizeMode="cover"
          source={{
            uri: item.photo,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <RenderPanel
          // title="Name"
          disabled={false}
          value={`${item.prefix}. ${item.first_name} ${item.middal_name} ${item.last_name}`}
          containerStyle={styles.containerStyle}
          mainContainerStyle={styles.valuePanelMainContainer}
        />
        <RenderPanel
          // title="Job Status "
          value={item.job_status}
          disabled={false}
          titleStyle={styles.panelTitle}
          mainContainerStyle={styles.valuePanelMainContainer}
        />
        <RenderPanel
          // title="Designation "
          value={item?.designation_id?.toString()}
          disabled={false}
          titleStyle={styles.panelTitle}
          mainContainerStyle={styles.valuePanelMainContainer}
        />
        <RenderPanel
          // title="Mobile "
          value={item?.mobile_number}
          disabled={false}
          titleStyle={styles.panelTitle}
          mainContainerStyle={styles.valuePanelMainContainer}
          onPress={() => Linking.openURL(`tel:${item?.mobile_number}`)}
        />

        <RenderPanel
          // title="Mobile "
          value={item?.alt_mobile_number}
          disabled={false}
          titleStyle={styles.panelTitle}
          mainContainerStyle={styles.valuePanelMainContainer}
          onPress={() => Linking.openURL(`tel:${item?.alt_mobile_number}`)}
        />
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
});

export default RenderOfficerDetails;
