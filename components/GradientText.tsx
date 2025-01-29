import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";


export const GradientText = (props: any) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={props?.colors || ['#fff', '#010038']}
      >
        <Text {...props} style={[{ fontFamily: 'Montserrat-Regular' }, props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};
