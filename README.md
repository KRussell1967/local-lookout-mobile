# Local Look-Out — Native Mobile App (Phase 1)

Native Expo + React Native foundation. Reuses the same Supabase project as the existing
Next.js admin web in `/app`. Phase 1 = auth, profile setup, pending gate, approved shell
placeholder. No feature screens yet.

## Stack
- Expo SDK 54 + React Native 0.81 + React 19.1
- Expo Router 6 (file-based routing under `app/`)
- TypeScript (`strict`)
- NativeWind 4 + Tailwind 3 (`global.css`, `tailwind.config.js`)
- @supabase/supabase-js 2.45 + AsyncStorage 2.x for session persistence

## Layout
```
app/_layout.tsx          Root: AuthProvider + Gate (route segment redirector)
app/index.tsx            Bounce → /(auth)/sign-in (redirected by Gate)
app/(auth)/sign-in.tsx
app/(auth)/sign-up.tsx
app/(setup)/index.tsx    Network + Organisation pickers (with create-new fallback)
app/(pending)/index.tsx  Account Pending Approval card
app/(app)/index.tsx      Approved-shell placeholder (feature tabs Phase 2)
src/lib/supabase.ts      Supabase client wired to AsyncStorage
src/lib/types.ts         DB row TS types
src/lib/constants.ts     REPORT_TYPES + APPROVAL
src/auth/AuthProvider.tsx Session + profile state, refreshProfile, signOut
```

## Env
`.env.local` carries `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`,
reusing the same Supabase project the Next.js admin uses. The just-applied RLS
(`reports_select_typeaware` + tightened `reports`) governs all queries here.

## Native device proof commands (run on a host with the relevant SDK)

### iOS — requires macOS + Xcode
```
cd mobile
yarn install
npx expo prebuild --platform ios     # one-time
npx pod-install
npx expo run:ios                      # opens iOS Simulator
```
Or cloud build (no Mac required):
```
npm i -g eas-cli
eas login
eas build --profile development --platform ios
eas device:create                     # if running on physical device
```

### Android — requires Android Studio (with virtualization) or a physical device
```
cd mobile
yarn install
npx expo prebuild --platform android  # one-time
npx expo run:android                  # opens Android Emulator or installs to USB device
```
Or cloud build:
```
eas build --profile development --platform android
```

### Expo Go (fastest manual proof on a real device)
```
cd mobile && yarn start
# Scan the QR code with the Expo Go app on your iPhone or Android phone.
# Note: OneSignal and other native modules require a dev build (not Expo Go).
# For Phase 1 (auth/profile only), Expo Go is sufficient.
```

### Web sanity check (DOM render — NOT native proof)
```
cd mobile && yarn web
# http://localhost:8081  in a browser. Used only to confirm the gate logic
# and Supabase auth wiring. NOT a substitute for iOS/Android device proof.
```

## What this Phase 1 build deliberately does NOT include
- Business / Estate / Residential feature screens (Phase 2+)
- OneSignal native push (Phase 3 - dev build required, not Expo Go)
- Photo / camera / location flows (later phases, native permission strings
  must be added to app.json)
- Store metadata, signing, EAS submit configuration
