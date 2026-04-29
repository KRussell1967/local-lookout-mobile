import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/auth/AuthProvider";

export default function ProfileScreen() {
  const { profile, signOut } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="text-foreground text-2xl font-bold mb-6">Profile</Text>

        <View className="bg-card border border-border rounded-xl p-4 mb-4">
          <Text className="text-foreground font-semibold mb-3">Account</Text>
          <Text className="text-muted-foreground mb-1">Email: {profile?.email ?? "-"}</Text>
          <Text className="text-muted-foreground mb-1">Role: {profile?.role ?? "-"}</Text>
          <Text className="text-muted-foreground mb-1">Status: {profile?.approval_status ?? "-"}</Text>
        </View>

        <View className="bg-card border border-border rounded-xl p-4 mb-6">
          <Text className="text-foreground font-semibold mb-3">Network</Text>
          <Text className="text-muted-foreground mb-1">Network: {profile?.network_id ?? "-"}</Text>
          <Text className="text-muted-foreground mb-1">Organisation: {profile?.organization_id ?? "-"}</Text>
        </View>

        <Pressable testID="sign-out" onPress={signOut} className="bg-muted rounded-xl py-4 items-center">
          <Text className="text-foreground font-semibold">Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
