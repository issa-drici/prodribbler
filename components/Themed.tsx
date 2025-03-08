/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

import Svg, { Defs, RadialGradient, Stop, Circle, Rect } from 'react-native-svg';

/* -----------------------------------------------------
   Types
------------------------------------------------------ */
type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'] & { headerComponent?: React.ReactNode, withoutPadding?: boolean, flexGrow?: number };

type Halo = {
  key: string;
  cx: number;
  cy: number;
  r: number;
};


export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color, fontFamily: 'Montserrat-Regular' }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;

  return <DefaultView style={[style]} {...otherProps} />;
}


/* -----------------------------------------------------
   ViewScreen (sans LinearGradient) :
   - Fond noir
   - Halos radiaux en fond (absolu)
   - Gestion du padding (120 + 25)
   - Contenu (children) par-dessus
------------------------------------------------------ */

// Dimensions écran
const SCREEN_WIDTH = Dimensions.get('window').width;
// Hauteur "fixe" pour l'espace où se dessinent les halos
const SVG_HEIGHT = Dimensions.get('window').height * 5 + 120;

export function ViewScreen(props: ViewProps) {
  const { style, children, headerComponent, withoutPadding, flexGrow, ...otherProps } = props;
  const padding = 25;
  const insets = useSafeAreaInsets();

  const calculatePaddingVertical = () => {
    if (withoutPadding) {
      return Platform.OS === 'android' ? padding * 2 : padding;
    }

    if (Platform.OS === 'android') {
      return 110 + padding / 2;
    }

    if (headerComponent) {
      return 115 + padding / 2;
    }

    return 135 + padding / 2;
  };

  // Calcul du nombre de halos en fonction de la hauteur de l'écran
  const [halos] = useState(() => {
    const haloSpacing = Dimensions.get('window').height; // Espacement vertical entre les halos
    const numHalos = Math.ceil(SVG_HEIGHT / haloSpacing);

    return Array.from({ length: numHalos }, (_, index) => {
      const isLeft = index % 2 === 0;
      return {
        key: `halo-${index}`,
        cx: isLeft ? -50 : SCREEN_WIDTH + 50,
        cy: index * haloSpacing,
        r: 400
      };
    });
  });

  return (
    <>
      {headerComponent ? (
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={['#112023', '#000405']}
          style={{
            top: insets.top + 55,
            left: 0,
            right: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 26,
            paddingTop: 15,
            paddingBottom: 15,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            gap: 10,
            zIndex: 999,
          }}
        >
          {headerComponent}
        </LinearGradient>
      ) : null}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={[
            styles.scrollContainer,
            style,
          ]}
          contentContainerStyle={{
            flexGrow
          }}
          bounces={false}
        >
          <Svg
            width={SCREEN_WIDTH}
            height={SVG_HEIGHT}
            style={styles.svgBackground}
          >
            <Defs>
              {/* Dégradé radial (blanc -> transparent) */}
              <RadialGradient id="whiteHalo" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#29383B" stopOpacity={1} />
                <Stop offset="100%" stopColor="#29383B" stopOpacity={0} />
              </RadialGradient>
            </Defs>

            {/* Fond noir global */}
            <Rect
              x={0}
              y={0}
              width={SCREEN_WIDTH}
              height={SVG_HEIGHT}
              fill="#1F2120"
            />

            {/* Halos partiellement hors-écran */}
            {halos.map((halo) => (
              <Circle
                key={halo.key}
                cx={halo.cx}
                cy={halo.cy}
                r={halo.r}
                fill="url(#whiteHalo)"
              />
            ))}
          </Svg>

          {/* Contenu avec padding */}
          <DefaultView style={{
            padding: padding,
            paddingVertical: calculatePaddingVertical(),
            flexGrow
          }}>
            {children}
          </DefaultView>

        </ScrollView>
      </KeyboardAvoidingView>
    </>

  );
}

/* -----------------------------------------------------
   Styles
------------------------------------------------------ */
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: '#1F2120',
  },
  relativeContainer: {
    position: 'relative',
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
});
