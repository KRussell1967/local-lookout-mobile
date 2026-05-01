import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAlerts, subscribe } from "@/lib/alertStore";

export default function FeedScreen() {
  const [alerts, setAlerts] = useState(getAlerts());

  useEffect(() => {
    return subscribe(() => setAlerts([...getAlerts()]));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="text-foreground text-2xl font-bold mb-6">Feed</Text>

        {alerts.length === 0 ? (
          <Text className="text-muted-foreground text-center">No alerts yet.</Text>
        ) : (
          alerts.map((alert) => (
            <View key={alert.id} className="bg-card border border-border rounded-xl p-4 mb-3">
              <Text className="text-foreground font-semibold mb-1">{alert.title}</Text>
              <Text className="text-muted-foreground text-sm">{alert.location}</Text>
              <Text className="text-muted-foreground text-xs mt-1">{alert.time}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
