import "../global.css";
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "@/auth/AuthProvider";
import { APPROVAL } from "@/lib/constants";

function Gate() {
  const { loading, session, profile } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const top = segments[0];
    const inAuth = top === "(auth)";
    const inSetup = top === "(setup)";
    const inPending = top === "(pending)";
    const inApp = top === "(app)";

    if (!session) {
      if (!inAuth) router.replace("/(auth)/sign-in");
      return;
    }
    if (!profile) {
      if (!inSetup) router.replace("/(setup)");
      return;
    }
    if (profile.approval_status !== APPROVAL.APPROVED) {
      if (!inPending) router.replace("/(pending)");
      return;
    }
    if (!inApp) router.replace("/(app)");
  }, [loading, session, profile, segments, router]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }
  return <Slot />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AuthProvider>
          <Gate />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
