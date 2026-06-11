import "react-native-gesture-handler";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { FinanceProvider } from "@/context/FinanceContext";
import { AppNavigator } from "@/navigation/AppNavigator";
import { theme } from "@/constants/theme";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <FinanceProvider>
            <StatusBar style="light" />
            <AppNavigator />
          </FinanceProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
