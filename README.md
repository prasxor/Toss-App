
# Toss App

A simple and interactive Toss App built using React Native with Expo CLI. The app features a smooth 2D coin toss animation triggered by a slider gesture, with theme toggling, sound effects, and customizable settings.

## Features

- Coin toss triggered by upward slide interaction
- Sound effect on toss
- Dark/Light theme switching
- Separate settings screen for toggles
- Retry button to re-toss
- Built using Expo CLI and Metro Bundler

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:

```bash
git clone https://github.com/prasxor/toss-app.git
```
```
cd toss-app
````

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```


## Project Structure

```plaintext
.
├── .vscode/              # Editor settings
├── app/                  # App entry point and navigation structure
├── assets/               # Images, fonts, sound files
├── components/           # Reusable UI components
├── constants/            # Theme colors, configuration values
├── hooks/                # Custom React hooks
├── scripts/              # Utility or setup scripts
├── .gitignore
├── README.md
├── app.json              # Expo app configuration
├── eas.json              # EAS build configuration
├── eslint.config.js      # ESLint configuration
├── package.json
├── package-lock.json
├── tsconfig.json         # TypeScript configuration
```

## Dependencies

* React Native
* Expo
* expo-av (for sound playback)
* react-native-reanimated (for animations)
* react-native-gesture-handler (for slider gesture)
* react-navigation (for screen transitions)
* expo-linear-gradient (for UI styling)



```bash
npm start         # Starts Metro bundler
npm run android   # Opens app in Android emulator/device
npm run ios       # Opens app in iOS simulator (macOS only)
npm run web       # Opens app in web browser
```

## License

This project is licensed under the MIT License.
