import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeedScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-foreground text-2xl font-bold mb-2">Feed</Text>
        <Text className="text-muted-foreground text-center">
          Live alerts from your area will appear here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
