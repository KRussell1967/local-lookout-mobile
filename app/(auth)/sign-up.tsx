import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    if (!email || !password) {
      Alert.alert("Missing fields", "Email and password are required.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Weak password", "Use at least 8 characters.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signUp({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      Alert.alert("Sign-up failed", error.message);
      return;
    }
    // Supabase project has email_confirm disabled in the existing setup, so user is signed in.
    // AuthProvider picks this up and gates routes us to /(setup).
  }

  return (
    <View className="flex-1 items-center justify-center px-6 bg-background">
      <View className="w-full max-w-sm">
        <Text className="text-foreground text-3xl font-bold text-center mb-1">Create account</Text>
        <Text className="text-muted-foreground text-center mb-8">Local Look-Out</Text>

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
            placeholder="At least 8 characters"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            className="bg-background text-foreground border border-border rounded-md px-3 py-2 mb-4"
          />
          <Pressable
            testID="sign-up-submit"
            onPress={onSubmit}
            disabled={busy}
            className="bg-primary rounded-md py-3 items-center"
          >
            {busy ? <ActivityIndicator color="#fff" /> : <Text className="text-primary-foreground font-semibold">Create Account</Text>}
          </Pressable>
          <Link href="/(auth)/sign-in" className="text-primary text-center mt-4">
            Have an account? Sign in
          </Link>
        </View>
      </View>
    </View>
  );
}
