import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "@/auth/AuthProvider";

export default function DashboardScreen() {
  const { profile } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="text-foreground text-2xl font-bold mb-6">Dashboard</Text>

        <View className="bg-card border border-border rounded-xl p-4 mb-4">
          <Text className="text-foreground font-semibold mb-3">Account</Text>
          <Text className="text-muted-foreground mb-1">Email: {profile?.email ?? "-"}</Text>
          <Text className="text-muted-foreground mb-1">Role: {profile?.role ?? "-"}</Text>
          <Text className="text-muted-foreground mb-1">Status: {profile?.approval_status ?? "-"}</Text>
        </View>

        <View className="bg-card border border-border rounded-xl p-4 mb-4">
          <Text className="text-foreground font-semibold mb-3">Network</Text>
          <Text className="text-muted-foreground mb-1">Network: {profile?.network_id ?? "-"}</Text>
          <Text className="text-muted-foreground mb-1">Organisation: {profile?.organization_id ?? "-"}</Text>
        </View>

        <View className="bg-card border border-border rounded-xl p-4 mb-4">
          <Text className="text-foreground font-semibold mb-3">Quick Actions</Text>
          <Pressable onPress={() => {}} className="bg-primary rounded-xl py-3 items-center mb-3">
            <Text className="text-primary-foreground font-semibold">Send Alert</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/(app)/feed")} className="bg-muted rounded-xl py-3 items-center">
            <Text className="text-foreground font-semibold">View Feed</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
