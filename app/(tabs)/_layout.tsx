import { Tabs } from 'expo-router';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { View, Platform } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
type SFSymbols6_0 = 'house' | 'house.fill' | 'clock' | 'clock.fill';

function AnimatedTabIcon({
  name,
  focusedName,
  color,
  focused,
  size = 24,
}: {
  name: SFSymbols6_0;
  focusedName: SFSymbols6_0;
  color: string;
  focused: boolean;
  size?: number;
}) {
  const scale = useSharedValue(focused ? 1 : 0.9);
  const opacity = useSharedValue(focused ? 1 : 0.7);
  const translateY = useSharedValue(focused ? -2 : 0);

  React.useEffect(() => {
    if (focused) {
      scale.value = withSpring(1.1, { damping: 15, stiffness: 200 });
      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withSpring(-3, { damping: 15, stiffness: 200 });

      setTimeout(() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 200 });
        translateY.value = withSpring(-2, { damping: 15, stiffness: 200 });
      }, 150);
    } else {
      scale.value = withSpring(0.9, { damping: 15, stiffness: 200 });
      opacity.value = withTiming(0.7, { duration: 200 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
    }
  }, [focused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: focused ? interpolate(scale.value, [0.9, 1.1], [0, 0.3]) : 0,
  }));

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* Glow effect */}
      <Animated.View
        style={[
          glowStyle,
          {
            position: 'absolute',
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: color,
          },
        ]}
      />
      {/* Icon */}
      <Animated.View style={animatedIconStyle}>
        <IconSymbol name={focused ? focusedName : name} size={size} color={color} />
      </Animated.View>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: isDark ? '#FFFFFF60' : '#00000060',
        tabBarStyle: {
          backgroundColor: isDark ? '#121212' : '#FFFFFF',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 85 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingTop: 5,
        },
        animation: 'shift', 
        lazy: false, // 
        unmountOnBlur: false,
      } as import('@react-navigation/bottom-tabs').BottomTabNavigationOptions}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Нүүр',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              name="house"
              focusedName="house.fill"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Түүх',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              name="clock"
              focusedName="clock.fill"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
