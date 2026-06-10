import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Search } from "lucide-react-native";
import { theme } from "@/constants/theme";

export function SearchBar({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.container}>
      <Search size={18} color={theme.colors.textSoft} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSoft}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: theme.colors.surfaceSoft,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...theme.shadow.soft,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.typography.body,
  },
});
