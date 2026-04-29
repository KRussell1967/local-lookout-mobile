import { Redirect } from "expo-router";

// Root index: gating happens in app/_layout.tsx; just bounce to (auth) by default.
export default function Index() {
  return <Redirect href="/(auth)/sign-in" />;
}
