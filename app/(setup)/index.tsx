import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert, ScrollView } from "react-native";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/auth/AuthProvider";
import type { Network, Organization } from "@/lib/types";

export default function ProfileSetup() {
  const { session, refreshProfile, signOut } = useAuth();
  const userId = session?.user?.id;
  const userEmail = session?.user?.email ?? null;

  const [networks, setNetworks] = useState<Network[]>([]);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [newNetwork, setNewNetwork] = useState("");
  const [newOrg, setNewOrg] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingNet, setLoadingNet] = useState(true);
  const [loadingOrg, setLoadingOrg] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("networks")
        .select("id,name,is_active")
        .order("name", { ascending: true });
      if (!error && data) setNetworks(data as Network[]);
      setLoadingNet(false);
    })();
  }, []);

  useEffect(() => {
    if (!networkId) { setOrgs([]); return; }
    setLoadingOrg(true);
    (async () => {
      const { data, error } = await supabase
        .from("organizations")
        .select("id,name,network_id")
        .eq("network_id", networkId)
        .order("name", { ascending: true });
      if (!error && data) setOrgs(data as Organization[]);
      setLoadingOrg(false);
    })();
  }, [networkId]);

  async function createNetwork() {
    if (!newNetwork.trim()) return;
    setBusy(true);
    const { data, error } = await supabase
      .from("networks")
      .insert({ name: newNetwork.trim() })
      .select("id,name,is_active")
      .single();
    setBusy(false);
    if (error) { Alert.alert("Could not create network", error.message); return; }
    setNetworks((p) => [...p, data as Network]);
    setNetworkId((data as Network).id);
    setNewNetwork("");
  }

  async function createOrg() {
    if (!networkId) { Alert.alert("Pick a network first"); return; }
    if (!newOrg.trim()) return;
    setBusy(true);
    const { data, error } = await supabase
      .from("organizations")
      .insert({ name: newOrg.trim(), network_id: networkId })
      .select("id,name,network_id")
      .single();
    setBusy(false);
    if (error) { Alert.alert("Could not create organisation", error.message); return; }
    setOrgs((p) => [...p, data as Organization]);
    setOrgId((data as Organization).id);
    setNewOrg("");
  }

  async function submit() {
    if (!userId) return;
    if (!networkId || !orgId) { Alert.alert("Select a network and an organisation"); return; }
    setBusy(true);
    const { error } = await supabase.from("profiles").upsert(
      {
        id: userId,
        email: userEmail,
        role: "staff",
        network_id: networkId,
        organization_id: orgId,
        approval_status: "pending"
      },
      { onConflict: "id" }
    );
    setBusy(false);
    if (error) { Alert.alert("Could not save profile", error.message); return; }
    await refreshProfile();
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 24 }} className="bg-background">
      <Text className="text-foreground text-2xl font-bold mb-1">Complete Your Profile</Text>
      <Text className="text-muted-foreground mb-6">Join a network and organisation to start.</Text>

      <Text className="text-foreground font-semibold mb-2">Select Network</Text>
      {loadingNet ? <ActivityIndicator color="#3b82f6" /> : (
        <View className="mb-4">
          {networks.map((n) => (
            <Pressable
              key={n.id}
              testID={"net-" + n.id}
              onPress={() => { setNetworkId(n.id); setOrgId(null); }}
              className={"px-3 py-2 rounded-md mb-2 border " + (networkId === n.id ? "bg-primary border-primary" : "bg-card border-border")}
            >
              <Text className={networkId === n.id ? "text-primary-foreground" : "text-foreground"}>{n.name}{n.is_active === false ? " (inactive)" : ""}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <View className="flex-row mb-6 gap-2">
        <TextInput
          value={newNetwork}
          onChangeText={setNewNetwork}
          placeholder="Or create new network…"
          placeholderTextColor="#94a3b8"
          className="flex-1 bg-card text-foreground border border-border rounded-md px-3 py-2"
        />
        <Pressable onPress={createNetwork} disabled={busy} className="bg-primary px-4 rounded-md items-center justify-center">
          <Text className="text-primary-foreground font-semibold">+</Text>
        </Pressable>
      </View>

      {networkId && (
        <>
          <Text className="text-foreground font-semibold mb-2">Select Organisation</Text>
          {loadingOrg ? <ActivityIndicator color="#3b82f6" /> : (
            <View className="mb-4">
              {orgs.length === 0 && <Text className="text-muted-foreground mb-2">No organisations yet — create one below.</Text>}
              {orgs.map((o) => (
                <Pressable
                  key={o.id}
                  testID={"org-" + o.id}
                  onPress={() => setOrgId(o.id)}
                  className={"px-3 py-2 rounded-md mb-2 border " + (orgId === o.id ? "bg-primary border-primary" : "bg-card border-border")}
                >
                  <Text className={orgId === o.id ? "text-primary-foreground" : "text-foreground"}>{o.name}</Text>
                </Pressable>
              ))}
            </View>
          )}
          <View className="flex-row mb-6 gap-2">
            <TextInput
              value={newOrg}
              onChangeText={setNewOrg}
              placeholder="Or create new organisation…"
              placeholderTextColor="#94a3b8"
              className="flex-1 bg-card text-foreground border border-border rounded-md px-3 py-2"
            />
            <Pressable onPress={createOrg} disabled={busy} className="bg-primary px-4 rounded-md items-center justify-center">
              <Text className="text-primary-foreground font-semibold">+</Text>
            </Pressable>
          </View>
        </>
      )}

      <Pressable
        testID="complete-setup"
        onPress={submit}
        disabled={busy || !networkId || !orgId}
        className={"rounded-md py-3 items-center " + (busy || !networkId || !orgId ? "bg-muted" : "bg-primary")}
      >
        {busy ? <ActivityIndicator color="#fff" /> : <Text className="text-primary-foreground font-semibold">Complete Setup</Text>}
      </Pressable>

      <Pressable onPress={signOut} className="mt-6 items-center">
        <Text className="text-muted-foreground">Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}
