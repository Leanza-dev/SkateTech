# SkateTech 🛹

> 🇺🇸 English | [🇧🇷 Português](#-como-rodar-localmente)

**An advanced full-cycle mobile engineering case study — building a production-quality React Native application to explore high-performance list rendering, offline-first architecture, geolocation UX, and type-safe data modeling with TypeScript.**

![React Native](https://img.shields.io/badge/Stack-React%20Native-blue.svg)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)
![Expo](https://img.shields.io/badge/Runtime-Expo%20SDK%2054-black.svg)
![UX](https://img.shields.io/badge/Focus-UI%2FUX-purple.svg)

---

<div align="center">
  <!-- TODO: GRAVAR E INSERIR GIF/VÍDEO DA TELA DO APP AQUI -->
  <i>[ Demo Video Placeholder - Insert your App Screen Recording GIF here ]</i>
</div>

---

## 🎯 Engineering Objectives

Mobile engineering has a different class of challenges than backend systems: you're working with constrained memory, unreliable networks, and a rendering pipeline that must stay above 60fps. This project was built to confront those constraints directly.

**Core challenges explored:**
- **FlatList optimization**: A naive implementation of a media feed causes jank as the list grows. How do you implement `keyExtractor`, `getItemLayout`, `removeClippedSubviews`, and windowing correctly to maintain smooth scrolling with hundreds of items?
- **Offline-first architecture**: Skaters use this app at spots with poor signal. How do you cache spot data locally (AsyncStorage/MMKV) and reconcile it with remote state when connectivity returns — without corrupting user data?
- **Type-safe data modeling**: The `Spot` type (`type: 'pista' | 'rua'`, `difficulty: 1 | 2 | 3 | 4 | 5`) enforces correctness at compile time. Invalid spot data becomes a type error, not a runtime crash.
- **Component architecture**: How do you build `SpotCard`, `TypeBadge`, and `DifficultyIndicator` as truly reusable, theme-aware components — not one-off UI patches?
- **Geolocation UX**: Map interactions have high latency. How do you manage loading states, coordinate clustering, and custom pin rendering without blocking the JS thread?

> Built as a self-directed study in production mobile engineering — going beyond tutorial apps into the architectural decisions that separate hobby projects from professional software.

---

## Architecture

### Data Layer (`src/data/spots.ts`)

The `Spot` interface enforces strict typing:

```typescript
interface Spot {
  id: string;
  name: string;
  type: 'pista' | 'rua';       // Union type — no invalid categories possible
  difficulty: 1 | 2 | 3 | 4 | 5; // Literal union — not just 'number'
  coordinates: { latitude: number; longitude: number };
  imageUrl: string;
  badges: string[];
}
```

Real São Paulo spots populate the dataset: Vila-Lobos Skatepark, Parque Zilda Natel, Elevado Presidente João Goulart, Largo da Batata, Vale do Anhangabaú — each with calibrated difficulty ratings and curated imagery.

### Theme System (`src/theme.ts`)

A centralized design system drives all UI decisions — colors, typography, difficulty badge colors, and type badge styles. Components never hardcode visual values; they reference the theme. This makes the entire UI reskinnable at a single point.

### Component Architecture

| Component | Responsibility |
|---|---|
| `SpotCard.tsx` | Reusable card with shared element transitions, type badge, difficulty indicator |
| `TypeBadge.tsx` | Renders `pista` vs `rua` with theme-driven colors |
| `DifficultyIndicator.tsx` | Visual difficulty scale from theme config |
| `Feed.tsx` | Optimized `FlatList` with windowing and `removeClippedSubviews` |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Expo Go app on your device (iOS or Android)

### Run Locally

```bash
git clone https://github.com/Leanza-dev/SkateTech.git
cd SkateTech
npm install
npx expo start
```

Scan the QR code with Expo Go on your device to run the app natively. Press `w` for the web emulator, `i` for iOS simulator, or `a` for Android emulator.

---

## 🚀 Como Rodar Localmente

```bash
git clone https://github.com/Leanza-dev/SkateTech.git
cd SkateTech
npm install
npx expo start
```

Abra a câmera do celular e escaneie o **QR Code** que aparecerá no terminal (certifique-se de ter o **Expo Go** instalado). Pressione `w` para o emulador Web, `i` para iOS ou `a` para Android.

---

## Roadmap

- [ ] Firebase integration for real-time spot sync
- [ ] User authentication (Google OAuth via Expo)
- [ ] Spot submission flow with photo upload
- [ ] Push notifications for new spots in your area
- [ ] Full offline mode with conflict resolution on reconnect

---

*Pedro Leanza — CS Student · AI-Augmented Engineering · Mobile & Frontend*
