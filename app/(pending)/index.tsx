import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAuth } from "@/auth/AuthProvider";

export default function Pending() {
  const { signOut, profile } = useAuth();
  return (
    <View className="flex-1 items-center justify-center px-6 bg-background">
      <View testID="pending-card" className="w-full max-w-md bg-card border border-border rounded-xl p-6">
        <Text className="text-foreground text-2xl font-bold mb-2">Account Pending Approval</Text>
        <Text className="text-muted-foreground mb-4">Your registration has been submitted successfully.</Text>
        <Text className="text-foreground font-semibold mb-1">What happens next?</Text>
        <Text className="text-muted-foreground">• An admin will review your account</Text>
        <Text className="text-muted-foreground">• You&apos;ll receive access once approved</Text>
        <Text className="text-muted-foreground mb-4">• This usually takes 24–48 hours</Text>
        {profile?.email && <Text className="text-muted-foreground mb-2">Signed in as: {profile.email}</Text>}
        <Pressable testID="sign-out" onPress={signOut} className="bg-muted rounded-md py-3 items-center mt-2">
          <Text className="text-foreground font-semibold">Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}
