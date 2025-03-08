import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, SafeAreaView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Themed';
import menu from '@/assets/icons/menu.png';
import notification from '@/assets/icons/notification.png';
import { useHeader } from '@/context/HeaderContext';

type HeaderProps = {
    title?: string;
    withoutRounding?: boolean;
};

export function Header({ title, withoutRounding }: HeaderProps) {
    const { title: titleHeader } = useHeader();

    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            colors={['#112023', '#000405']}
            style={{
                flex: 1,
                borderBottomLeftRadius: withoutRounding ? 0 : 20,
                borderBottomRightRadius: withoutRounding ? 0 : 25,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
            }}
        >
            <SafeAreaView style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    ...Platform.select({
                        ios: {
                            paddingTop: 10,
                            paddingBottom: 27,
                        },
                        android: {
                            paddingTop: 50,
                            paddingBottom: 23,
                        }
                    }),
                    paddingHorizontal: 26,
                }}>

                    <Link href="/(stack)/menu" asChild>
                        <Pressable>
                            <Image source={menu} style={{ width: 32, height: 32 }} resizeMode="contain" />
                        </Pressable>
                    </Link>
                    <Text style={{
                        color: '#fff',
                        fontSize: 20,
                    }}>{title ? title : titleHeader}</Text>
                    <Link href="/modal" asChild>
                        <Pressable>
                            <Image source={notification} style={{ width: 32, height: 32 }} resizeMode="contain" />
                        </Pressable>
                    </Link>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
} 