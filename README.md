# SkateTech 🛹

**A premium mobile community platform for skateboarders to discover spots and track progress.**

![React Native](https://img.shields.io/badge/Stack-React%20Native-blue.svg)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)
![UX](https://img.shields.io/badge/Focus-UI%2FUX-purple.svg)

---

<div align="center">
  <!-- TODO: GRAVAR E INSERIR GIF/VÍDEO DA TELA DO APP AQUI -->
  <i>[ Demo Video Placeholder - Insert your App Screen Recording GIF here ]</i>
</div>

---

## 📌 Vision

SkateTech is a social mobile app designed to bridge the gap between digital community and physical skate spots. It focuses on high-performance list rendering (FlatList optimization), real-time map interactions, and a "vibrant dark" design system that resonates with skate culture.

### Features
- **Spot Mapping**: Interactive maps with custom pins and clustering.
- **Trick Feed**: Optimized media feed for sharing lines and tricks.
- **Offline First**: Local caching of spot data for sessions in remote areas.

## 🛠 Architecture
- `App.tsx`: Main navigation and theme provider.
- `src/screens/Feed.tsx`: Optimized list rendering logic.
- `src/components/SpotCard.tsx`: Reusable UI component with shared element transitions.

## 🚀 Como Rodar Localmente (Recrutadores)

Para ver a performance da interface renderizando nativamente em seu dispositivo, siga os passos abaixo usando o ambiente [Expo](https://expo.dev/):

1. Clone o repositório e instale as dependências:
   ```bash
   git clone https://github.com/Leanza-dev/SkateTech.git
   cd SkateTech
   npm install
   ```
2. Inicie o servidor do Metro Bundler:
   ```bash
   npx expo start
   ```
3. Abra a câmera do seu celular e escaneie o **QR Code** que aparecerá no terminal (certifique-se de ter o aplicativo **Expo Go** instalado no iOS ou Android).
4. Alternativamente, pressione `w` no terminal para rodar o emulador Web, ou `i` / `a` para rodar no simulador iOS/Android local, caso possua o Xcode/Android Studio instalados.

---
*Developed by Pedro Leanza - Mobile UX & Frontend Engineering.*
