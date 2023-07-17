import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import RenderPanel from './RenderPanel';
import LinearGradient from 'react-native-linear-gradient';

type RenderOfficerDetailsProps = { item: any; index: number };

const RenderOfficerDetails = ({ item, index }: RenderOfficerDetailsProps) => {
  return (
    <LinearGradient colors={['#E0D2C7', '#44B09E']} style={styles.container}>
      <Image
        style={styles.officerImage}
        resizeMode="contain"
        source={{
          uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png`,
        }}
      />
      <View>
        <RenderPanel title="Name" value=":-  Akshay Sonani" />
        <RenderPanel title="Status " value=":-  Current" />
        <RenderPanel title="Designation " value=":-  Junior Clerk" />
        <RenderPanel title="Office District " value=":-  Current" />
        <RenderPanel title="Office ID Card " value=":-  Current" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  officerImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginVertical: 10,
    marginRight: 10,
  },
});

export default RenderOfficerDetails;
