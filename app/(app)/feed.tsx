import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mockAlerts = [
  { id: "1", title: "Suspicious Activity", location: "Ayr High Street", time: "2 mins ago" },
  { id: "2", title: "Shoplifting Incident", location: "Kyle Centre", time: "10 mins ago" },
  { id: "3", title: "Vehicle Break-in", location: "Car Park Level 2", time: "25 mins ago" },
];

export default function FeedScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <FlatList
        data={mockAlerts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: "#1e293b",
            borderColor: "#334155",
            borderWidth: 1,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12
          }}>
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
              {item.title}
            </Text>
            <Text style={{ color: "#94a3b8", marginTop: 4 }}>
              {item.location}
            </Text>
            <Text style={{ color: "#64748b", marginTop: 2, fontSize: 12 }}>
              {item.time}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}