import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { SearchBar } from "@/components/ui/SearchBar";
import { Chip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { TransactionItem } from "@/components/transactions/TransactionItem";
import { useFinance } from "@/hooks/useFinance";
import { theme } from "@/constants/theme";
import { getMonthOptions, monthKey } from "@/utils/date";
import { formatMonthLabel } from "@/utils/date";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/constants/categories";
import { TransactionType } from "@/types";

type FilterType = "all" | TransactionType;

export function TransactionsScreen() {
  const { transactions, loading, openQuickAdd, deleteTransaction } = useFinance();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const monthOptions = useMemo(() => getMonthOptions(transactions), [transactions]);
  const categoryOptions = useMemo(
    () => ["all", ...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])],
    []
  );

  const filtered = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesQuery =
        transaction.title.toLowerCase().includes(query.toLowerCase()) ||
        transaction.category.toLowerCase().includes(query.toLowerCase()) ||
        (transaction.note ?? "").toLowerCase().includes(query.toLowerCase());
      const matchesType = typeFilter === "all" || transaction.type === typeFilter;
      const matchesMonth = monthFilter === "all" || monthKey(transaction.date) === monthKey(monthFilter);
      const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
      return matchesQuery && matchesType && matchesMonth && matchesCategory;
    });
  }, [transactions, query, typeFilter, monthFilter, categoryFilter]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.heading}>Transactions</Text>
        <Text style={styles.subheading}>Refined search, clean filters, and direct edits.</Text>
      </View>

      <SearchBar value={query} onChangeText={setQuery} placeholder="Search title, category, or note" />

      <View style={styles.filterBlock}>
        <Text style={styles.filterLabel}>Type</Text>
        <View style={styles.row}>
          {(["all", "expense", "income"] as const).map((item) => (
            <Chip key={item} label={item} active={typeFilter === item} onPress={() => setTypeFilter(item)} />
          ))}
        </View>
      </View>

      <View style={styles.filterBlock}>
        <Text style={styles.filterLabel}>Month</Text>
        <View style={styles.row}>
          <Chip label="all" active={monthFilter === "all"} onPress={() => setMonthFilter("all")} />
          {monthOptions.map((date) => (
            <Chip
              key={date}
              label={formatMonthLabel(date)}
              active={monthKey(monthFilter) === monthKey(date)}
              onPress={() => setMonthFilter(date)}
            />
          ))}
        </View>
      </View>

      <View style={styles.filterBlock}>
        <Text style={styles.filterLabel}>Category</Text>
        <View style={styles.row}>
          {categoryOptions.map((item) => (
            <Chip key={item} label={item} active={categoryFilter === item} onPress={() => setCategoryFilter(item)} />
          ))}
        </View>
      </View>

      {loading ? (
        <LoadingState label="Loading transactions..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No matching transactions"
          description="Try a broader filter or add a fresh entry. The list stays focused when there is something worth showing."
          actionLabel="Add transaction"
          onAction={() => openQuickAdd()}
        />
      ) : (
        <View style={styles.list}>
          {filtered.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={() => openQuickAdd(transaction)}
              onDelete={() => deleteTransaction(transaction.id)}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.typography.h1,
    fontWeight: "800",
  },
  subheading: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
  },
  filterBlock: {
    gap: 10,
  },
  filterLabel: {
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontSize: theme.typography.tiny,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  list: {
    gap: theme.spacing.md,
  },
});
