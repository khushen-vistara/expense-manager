import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LayoutGrid, List, Plus, Settings, TrendingUp } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { theme } from "@/constants/theme";
import { HomeScreen } from "@/screens/HomeScreen";
import { TransactionsScreen } from "@/screens/TransactionsScreen";
import { InsightsScreen } from "@/screens/InsightsScreen";
import { SettingsScreen } from "@/screens/SettingsScreen";
import { PressableScale } from "@/components/ui/PressableScale";
import { useFinance } from "@/hooks/useFinance";
import { TransactionSheet } from "@/components/forms/TransactionSheet";

const Tab = createBottomTabNavigator();

function FloatingActionButton() {
  const { openQuickAdd } = useFinance();

  return (
    <View pointerEvents="box-none" style={styles.fabWrap}>
      <PressableScale onPress={() => openQuickAdd()} style={styles.fab}>
        <Plus size={24} color={theme.colors.background} />
      </PressableScale>
    </View>
  );
}

function AppTabs() {
  const iconSize = 20;

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.textSoft,
          tabBarStyle: styles.tabBar,
          tabBarBackground: () => <View style={styles.tabBarBackground} />,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarHideOnKeyboard: true,
          sceneStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <LayoutGrid size={iconSize} color={color} />,
          }}
        />
        <Tab.Screen
          name="Transactions"
          component={TransactionsScreen}
          options={{
            tabBarIcon: ({ color }) => <List size={iconSize} color={color} />,
          }}
        />
        <Tab.Screen
          name="Insights"
          component={InsightsScreen}
          options={{
            tabBarIcon: ({ color }) => <TrendingUp size={iconSize} color={color} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => <Settings size={iconSize} color={color} />,
          }}
        />
      </Tab.Navigator>
      <FloatingActionButton />
      <TransactionSheet />
    </>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.text,
          border: "transparent",
          primary: theme.colors.text,
        },
      }}
    >
      <AppTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 84,
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: "transparent",
    borderTopWidth: 0,
  },
  tabBarBackground: {
    flex: 1,
    marginHorizontal: 18,
    marginBottom: 12,
    borderRadius: 28,
    backgroundColor: "rgba(14, 19, 32, 0.96)",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
  fabWrap: {
    position: "absolute",
    bottom: 42,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.text,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadow.card,
  },
});
