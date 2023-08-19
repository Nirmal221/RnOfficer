import React from 'react';
import colors from '../themes/Colors';
import RenderPanel from './RenderPanel';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

type RenderOfficerDetailsProps = { item: any; index: number; onPress: any };

const RenderOfficerDetails = ({
  item,
  index,
  onPress,
}: RenderOfficerDetailsProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.officerImage}
        resizeMode="contain"
        source={{
          uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png`,
        }}
      />
      <View style={{ flex: 1 }}>
        <RenderPanel
          title="Name"
          disabled={false}
          value="Akshay Sonani"
          containerStyle={styles.containerStyle}
        />
        <RenderPanel
          title="Status "
          value="Current"
          disabled={false}
          titleStyle={styles.panelTitle}
        />
        <RenderPanel
          title="Designation "
          value="Junior Clerk"
          disabled={false}
          titleStyle={styles.panelTitle}
        />
        <RenderPanel
          title="Office District "
          value="Current"
          disabled={false}
          titleStyle={styles.panelTitle}
        />
        <RenderPanel
          title="Office ID Card "
          value="Current"
          disabled={false}
          titleStyle={styles.panelTitle}
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
    width: 80,
    height: 80,
    marginRight: 10,
    alignSelf: 'center',
  },
  containerStyle: {
    justifyContent: 'space-between',
  },
  panelTitle: { flex: 1 },
});

export default RenderOfficerDetails;
