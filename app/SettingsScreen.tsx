// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   Switch,
//   ScrollView,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";

// export default function SettingsScreen({
//   navigation,
//   soundEnabled,
//   setSoundEnabled,
// }: {
//   navigation: { goBack: () => void };
//   soundEnabled: boolean;
//   setSoundEnabled: (value: boolean) => void;
// }) {
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Pressable onPress={navigation.goBack}>
//           <MaterialIcons name="arrow-back" size={28} color="#357" />
//         </Pressable>
//         <Text style={styles.headerTitle}>Settings</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.content}>
//         {/* Sound Toggle */}
//         <View style={styles.row}>
//           <Text style={styles.label}>Sound</Text>
//           <Switch
//             value={soundEnabled}
//             onValueChange={setSoundEnabled}
//             thumbColor={soundEnabled ? "#4DA8DA" : "#ccc"}
//             trackColor={{ true: "#cce6fa", false: "#eee" }}
//           />
//         </View>

//         {/* About App */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>About App</Text>
//           <Text style={styles.infoText}>🎯 Coin Toss App made for fun & decision making.</Text>
//         </View>

//         {/* Founder */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Founder</Text>
//           <Text style={styles.infoText}>🚀 Built with ❤️ by Prasxor</Text>
//         </View>

//         {/* App Version */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>App Version</Text>
//           <Text style={styles.infoText}>v1.0.0</Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff", // update this if you want to support dark theme too
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 20,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginLeft: 12,
//     color: "#357",
//   },
//   content: {
//     padding: 20,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderColor: "#f0f0f0",
//   },
//   label: {
//     fontSize: 18,
//     color: "#222",
//   },
//   section: {
//     marginTop: 28,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 8,
//     color: "#357",
//   },
//   infoText: {
//     fontSize: 15,
//     color: "#444",
//     lineHeight: 22,
//   },
// });

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Switch } from "react-native";
import { Linking } from "react-native";

export default function SettingsScreen({
  navigation,
  soundEnabled,
  setSoundEnabled,
  theme,
  setTheme,
}: {
  navigation: { goBack: () => void };
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
}) {
  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#fefefe" },
      ]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDark ? "#1c1b1f" : "#fff",
            borderColor: isDark ? "#2c2b2e" : "#eee",
          },
        ]}
      >
        <Pressable
          onPress={navigation.goBack}
          style={[
            styles.iconBtn,
            { backgroundColor: isDark ? "#2d2d2d" : "#e6ecf5" },
          ]}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={isDark ? "#fefefe" : "#1c1b1f"}
          />
        </Pressable>
        <Text
          style={[
            styles.headerTitle,
            {
              fontFamily: "Roboto_500Medium",
              color: isDark ? "#fefefe" : "#1c1b1f",
            },
          ]}
        >
          Settings
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Sound Toggle */}
        <View
          style={[
            styles.settingCard,
            {
              backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
              borderColor: isDark ? "#2a2a2a" : "#e3e3e3",
            },
          ]}
        >
          <View>
            <Text
              style={[
                styles.label,
                {
                  fontFamily: "Roboto_500Medium",
                  color: isDark ? "#fefefe" : "#1c1b1f",
                },
              ]}
            >
              Sound
            </Text>
            <Text
              style={[
                styles.helperText,
                {
                  fontFamily: "Roboto_400Regular",
                  color: isDark ? "#aaa" : "#666",
                },
              ]}
            >
              {soundEnabled ? "Sound is ON" : "Sound is OFF"}
            </Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={(val) => {
              console.log("Toggling Sound to", val); // ✅ add this
              setSoundEnabled(val);
            }}
            thumbColor={soundEnabled ? "#4DA8DA" : "#999"}
            trackColor={{ false: "#777", true: "#cce6fa" }}
            ios_backgroundColor={isDark ? "#555" : "#ccc"}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          />
        </View>

        {/* About App */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                fontFamily: "Roboto_500Medium",
                color: isDark ? "#90caf9" : "#357",
              },
            ]}
          >
            About App
          </Text>
          <Text
            style={[
              styles.infoText,
              {
                fontFamily: "Roboto_400Regular",
                color: isDark ? "#ccc" : "#444",
              },
            ]}
          >
            🎯 Coin Toss App made for fun & decision making.
          </Text>
          <Pressable onPress={() => Linking.openURL("https://prasxor.me")}>
            <Text
              style={[
                styles.infoText,
                {
                  fontFamily: "Roboto_400Regular",
                  color: isDark ? "#90caf9" : "#357",
                  textDecorationLine: "underline",
                  marginTop: 6,
                },
              ]}
            >
              🔗 Visit prasxor.me
            </Text>
          </Pressable>
        </View>

        {/* Founder */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                fontFamily: "Roboto_500Medium",
                color: isDark ? "#90caf9" : "#357",
              },
            ]}
          >
            Founder
          </Text>
          <Text
            style={[
              styles.infoText,
              {
                fontFamily: "Roboto_400Regular",
                color: isDark ? "#ccc" : "#444",
              },
            ]}
          >
            🚀 Built with ❤️ by Prasxor
          </Text>
        </View>

        {/* App Version */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                fontFamily: "Roboto_500Medium",
                color: isDark ? "#90caf9" : "#357",
              },
            ]}
          >
            App Version
          </Text>
          <Text
            style={[
              styles.infoText,
              {
                fontFamily: "Roboto_400Regular",
                color: isDark ? "#ccc" : "#444",
              },
            ]}
          >
            v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor is set dynamically in the component
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    elevation: 3,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
  },
  content: {
    padding: 20,
  },
  settingCard: {
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  helperText: {
    fontSize: 14,
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
