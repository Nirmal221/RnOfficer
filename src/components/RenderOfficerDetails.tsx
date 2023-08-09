import React from 'react';
import colors from '../themes/Colors';
import RenderPanel from './RenderPanel';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type RenderOfficerDetailsProps = { item: any; index: number };

const RenderOfficerDetails = ({ item, index }: RenderOfficerDetailsProps) => {
  return (
    <LinearGradient
      colors={[colors.secondary, colors.pink]}
      style={styles.container}>
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
          value="Akshay Sonani"
          containerStyle={styles.containerStyle}
        />
        <RenderPanel
          title="Status "
          value="Current"
          titleStyle={styles.panelTitle}
        />
        <RenderPanel
          title="Designation "
          value="Junior Clerk"
          titleStyle={styles.panelTitle}
        />
        <RenderPanel
          title="Office District "
          value="Current"
          titleStyle={styles.panelTitle}
        />
        <RenderPanel
          title="Office ID Card "
          value="Current"
          titleStyle={styles.panelTitle}
        />
      </View>
    </LinearGradient>
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
