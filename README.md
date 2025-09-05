# @infinitui/modalium

✨ **Modalium** — Animated modals with superpowers for React Native & Expo.

Create smooth, elegant, and highly customizable modals with animations, blur effects, and multiple presentation styles. Fully compatible with React Native & Expo.

--- 

![Démo Modalium](https://ik.imagekit.io/xkf4n7joe/bg-modalium.gif?updatedAt=1757073843326)


<img src="https://ik.imagekit.io/xkf4n7joe/bg-modalium.gif?updatedAt=1757073843326" alt="Démo Modalium" width="600" />

---

## 🚀 Installation

```bash
npm install @infinitui/modalium
# or
yarn add @infinitui/modalium
```

---

## 📦 Required Peer Dependencies

Modalium relies on several external packages to function properly. You **must** install these in your project:

```bash
npm install react-native-safe-area-context react-native-gesture-handler react-native-reanimated expo-blur
```

⚠️ **Important Setup Notes:**

Some of these libraries require additional configuration:

- `react-native-reanimated`: Add the Babel plugin and enable Reanimated in your `babel.config.js`
- `react-native-gesture-handler`: Wrap your app in `GestureHandlerRootView`
- `expo-blur`: Works out of the box with Expo, but requires `expo-modules-core` in bare projects

Refer to each library’s documentation for full setup instructions.

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
        modalBgColor="#ffffff"
        statusBarTranslucent={true}
      >
        <View style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 12 }}>
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
| `animationType`             | `'fade' | 'slide' | 'scale' | 'centerCircleZoom' | 'parentZoom'` | `'fade'` | Animation style |
| `statusBarTranslucent`      | `boolean`                        | `false`         | Make status bar translucent |
| `presentationStyle`         | `'fullScreen' | 'overFullScreen' | 'formSheet' | 'pageSheet'` | `'overFullScreen'` | Modal layout style |
| `blockBackgroundInteraction`| `boolean`                        | `true`          | Prevent interaction with background |
| `swipeToClose`              | `boolean`                        | `true`          | Enable swipe-down to close |
| `barStyle`                  | `'light-content' | 'dark-content'` | `'dark-content'` | Status bar style |
| `useBlurOverlay`            | `boolean`                        | `false`         | Enable blur background |
| `blurIntensity`             | `number`                         | `50`            | Blur intensity |
| `blurTint`                  | `'light' | 'dark' | 'default'`   | `'default'`     | Blur tint color |
| `circleBgColor`             | `string`                         | `'white'`       | Background color of animated circle |
| `circleScaleMax`            | `number`                         | `10`            | Maximum scale of the circle animation |
| `circleSize`                | `number`                         | `100`           | Initial size of the circle |
| `startX` / `startY`         | `number`                         | —               | Coordinates for circle origin |
| `modalBgColor`              | `string`                         | —               | Background color of modal content container |

---

## ✅ Compatibility

- ✅ React Native
- ✅ Expo
- ✅ Android & iOS
- ✅ Works with `react-native-safe-area-context`, `expo-blur`, `react-native-reanimated`, and `react-native-gesture-handler`

---

## 🤝 Contributing

Modalium is actively evolving and I’m looking for contributors to help improve it!

If you love animation, UI polish, or just want to help build beautiful React Native components — fork the repo, open a PR, or start a discussion.

👉 [GitHub Repository](https://github.com/J-Ben/infinitui-modalium)

---

## 👨‍💻 Author

**Ben-Jamin MK**  
Creator of modern UI components for React Native.  
[GitHub](https://github.com/J-Ben)
