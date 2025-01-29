import { Image, Pressable } from 'react-native';
import { GradientText } from '@/components/GradientText';

type TabBarButtonProps = {
  activeIcon: any;
  inactiveIcon: any;
  label: string;
  isSelected?: boolean;
  onPress?: () => void;
  style?: any;
};

export function TabBarButton({ activeIcon, inactiveIcon, label, isSelected, ...props }: TabBarButtonProps) {
  return (
    <Pressable
      {...props}
      style={[
        props.style,
        {
          flex: 1,
          alignItems: 'center',
        }
      ]}
    >
      <Image
        source={isSelected ? activeIcon : inactiveIcon}
        style={{
          width: 24,
          height: 24,
        }}
        resizeMode="contain"
      />
      <GradientText
        style={{
          fontSize: 12,
          fontWeight: 'semibold',
          marginTop: 4
        }}
        colors={isSelected ? ['#fff', '#34819A'] : ['#fff', '#fff']}
      >
        {label}
      </GradientText>
    </Pressable>
  );
} 