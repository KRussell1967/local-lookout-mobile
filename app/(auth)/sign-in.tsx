import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    if (!email || !password) {
      Alert.alert("Missing fields", "Email and password are required.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) Alert.alert("Sign-in failed", error.message);
    // success → AuthProvider state changes → root Gate redirects
  }

  return (
    <View className="flex-1 items-center justify-center px-6 bg-background">
      <View className="w-full max-w-sm">
        <Text className="text-foreground text-3xl font-bold text-center mb-1">Local Look-Out</Text>
        <Text className="text-muted-foreground text-center mb-8">Shared vigilance for your community</Text>

        <View className="bg-card border border-border rounded-xl p-5">
          <Text className="text-foreground mb-1">Email</Text>
          <TextInput
            testID="email"
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            className="bg-background text-foreground border border-border rounded-md px-3 py-2 mb-4"
          />
          <Text className="text-foreground mb-1">Password</Text>
          <TextInput
            testID="password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            className="bg-background text-foreground border border-border rounded-md px-3 py-2 mb-4"
          />
          <Pressable
            testID="sign-in-submit"
            onPress={onSubmit}
            disabled={busy}
            className="bg-primary rounded-md py-3 items-center"
          >
            {busy ? <ActivityIndicator color="#fff" /> : <Text className="text-primary-foreground font-semibold">Sign In</Text>}
          </Pressable>
          <Link href="/(auth)/sign-up" className="text-primary text-center mt-4">
            Need an account? Sign up
          </Link>
        </View>
      </View>
    </View>
  );
}
