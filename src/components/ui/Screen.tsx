import React from "react";
import { ScrollView, ScrollViewProps, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { theme } from "@/constants/theme";

type Props = ScrollViewProps & {
  children: React.ReactNode;
};

export function Screen({ children, contentContainerStyle, ...props }: Props) {
  return (
    <LinearGradient colors={["#070A11", "#0A1020", "#080B12"]} style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View pointerEvents="none" style={styles.topAccent}>
          <Svg width="100%" height="100%" viewBox="0 0 420 420">
            <Defs>
              <RadialGradient id="topGlow" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#79A8FF" stopOpacity="0.16" />
                <Stop offset="35%" stopColor="#79A8FF" stopOpacity="0.08" />
                <Stop offset="70%" stopColor="#79A8FF" stopOpacity="0.02" />
                <Stop offset="100%" stopColor="#79A8FF" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Rect width="420" height="420" fill="url(#topGlow)" />
          </Svg>
        </View>
        <View pointerEvents="none" style={styles.bottomAccent}>
          <Svg width="100%" height="100%" viewBox="0 0 360 360">
            <Defs>
              <RadialGradient id="bottomGlow" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#9B8CFF" stopOpacity="0.14" />
                <Stop offset="35%" stopColor="#9B8CFF" stopOpacity="0.07" />
                <Stop offset="70%" stopColor="#9B8CFF" stopOpacity="0.02" />
                <Stop offset="100%" stopColor="#9B8CFF" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Rect width="360" height="360" fill="url(#bottomGlow)" />
          </Svg>
        </View>
        <ScrollView
          {...props}
          contentContainerStyle={[styles.content, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topAccent: {
    position: "absolute",
    top: -220,
    right: -180,
    width: 420,
    height: 420,
  },
  bottomAccent: {
    position: "absolute",
    bottom: -210,
    left: -170,
    width: 360,
    height: 360,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: 120,
    gap: 20,
  },
});
