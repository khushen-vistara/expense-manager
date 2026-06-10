import React from "react";
import { ScrollView, ScrollViewProps, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";

type Props = ScrollViewProps & {
  children: React.ReactNode;
};

export function Screen({ children, contentContainerStyle, ...props }: Props) {
  return (
    <LinearGradient colors={["#070A11", "#0A1020", "#080B12"]} style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View pointerEvents="none" style={styles.glow} />
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
  glow: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 240,
    backgroundColor: theme.colors.cardGlow,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: 120,
    gap: theme.spacing.lg,
  },
});
