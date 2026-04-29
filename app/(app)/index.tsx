import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useAuth } from "@/auth/AuthProvider";

export default function ApprovedShell() {
  const { profile, signOut } = useAuth();
  return (
    <ScrollView className="bg-background" contentContainerStyle={{ padding: 24 }}>
      <Text testID="approved-shell" className="text-foreground text-2xl font-bold mb-2">
        Welcome to Local Look-Out
      </Text>
      <Text className="text-muted-foreground mb-6">
        Your account is approved. Feature tabs (Business, Estate, Residential) ship in Phase 2.
      </Text>

      <View className="bg-card border border-border rounded-xl p-4 mb-4">
        <Text className="text-foreground font-semibold mb-2">Profile</Text>
        <Text className="text-muted-foreground">Email: {profile?.email ?? "-"}</Text>
        <Text className="text-muted-foreground">Role: {profile?.role ?? "-"}</Text>
        <Text className="text-muted-foreground">Network: {profile?.network_id ?? "-"}</Text>
        <Text className="text-muted-foreground">Organisation: {profile?.organization_id ?? "-"}</Text>
        <Text className="text-muted-foreground">Status: {profile?.approval_status ?? "-"}</Text>
      </View>

      <Pressable testID="sign-out" onPress={signOut} className="bg-muted rounded-md py-3 items-center">
        <Text className="text-foreground font-semibold">Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}
