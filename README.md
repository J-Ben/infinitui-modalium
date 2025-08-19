# @infinitui/modalium

✨ **Modalium** — Animated modals with superpowers for React Native & Expo.

Create smooth, elegant, and highly customizable modals with animations, blur effects, and multiple presentation styles. Fully compatible with React Native & Expo.

---

## 🚀 Installation

```bash
npm install @infinitui/modalium
# or
yarn add @infinitui/modalium
```

---

## 🧠 Usage Example

```tsx
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import Modalium from '@infinitui/modalium';

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open Modal" onPress={() => setVisible(true)} />

      <Modalium
        visible={visible}
        onRequestClose={() => setVisible(false)}
        animationType="slide"
        presentationStyle="overFullScreen"
        useBlurOverlay={true}
        blurIntensity={80}
        swipeToClose={true}
      >
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12 }}>
          <Text style={{ fontSize: 18 }}>Hello from Modalium 👋</Text>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </Modalium>
    </View>
  );
}
```

---

## ⚙️ Props Reference

| Prop                        | Type                            | Default         | Description |
|-----------------------------|----------------------------------|-----------------|-------------|
| `visible`                   | `boolean`                        | —               | Show or hide the modal |
| `onRequestClose`            | `() => void`                     | —               | Called when modal should close |
| `onShow`                    | `() => void`                     | —               | Called when modal is shown |
| `onDismiss`                 | `() => void`                     | —               | Called when modal is dismissed |
| `duration`                  | `number`                         | `333`           | Animation duration in ms |
| `children`                  | `React.ReactNode`                | —               | Modal content |
| `transparent`               | `boolean`                        | `true`          | Use semi-transparent background |
| `animationType`             | `'fade' | 'slide' | 'scale'`     | `'fade'`        | Animation style |
| `statusBarTranslucent`      | `boolean`                        | `false`         | Make status bar translucent |
| `presentationStyle`         | `'fullScreen' | 'overFullScreen' | 'formSheet' | 'pageSheet'` | `'overFullScreen'` | Modal layout style |
| `blockBackgroundInteraction`| `boolean`                        | `true`          | Prevent interaction with background |
| `swipeToClose`              | `boolean`                        | `true`          | Enable swipe-down to close |
| `barStyle`                  | `'light-content' | 'dark-content'` | `'dark-content'` | Status bar style |
| `useBlurOverlay`            | `boolean`                        | `false`         | Enable blur background |
| `blurIntensity`             | `number`                         | `50`            | Blur intensity |
| `blurTint`                  | `'light' | 'dark' | 'default'`   | `'default'`     | Blur tint color |

---

## ✅ Compatibility

- React Native
- Expo
- Android & iOS
- `react-native-safe-area-context`
- `expo-blur`

---

## 👨‍💻 Author

**Ben-Jamin MK**  
Creator of modern UI components for React Native.  
[GitHub](https://github.com/benjaminmk)
