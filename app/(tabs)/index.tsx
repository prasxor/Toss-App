import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, PanResponder, Easing } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
// import sound from "../../assets/"

const SLIDER_HEIGHT = 250;
const SLIDER_WIDTH = 68;
const SLIDER_BTN_SIZE = 65;
const SLIDER_TOP = 0;
const SLIDER_BOTTOM = SLIDER_HEIGHT - SLIDER_BTN_SIZE;

function Coin3D({ result, theme, animate, spinAnim }: { result: string, theme: 'light' | 'dark', animate: Animated.Value, spinAnim: Animated.Value }) {
  // Color for heads/tails
  const bgColor = result === 'TAILS' ? '#D5451B' : '#4DA8DA';
  const borderColor = theme === 'dark' ? '#fff' : bgColor;
  return (
    <Animated.View style={{
      alignItems: 'center', justifyContent: 'center',
      transform: [
        { scale: animate.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) },
        { rotate: animate.interpolate({ inputRange: [0, 1], outputRange: ['-10deg', '0deg'] }) },
      ],
      opacity: animate,
    }}>
      <View style={{ width: 200, height: 200, alignItems: 'center', justifyContent: 'center' }}>
        {/* Spinning dashed border only */}
        <Animated.View style={{
          position: 'absolute',
          width: 200, height: 200,
          alignItems: 'center', justifyContent: 'center',
          transform: [{ rotate: spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }],
        }}>
          <View style={[styles.coinOuter, { borderColor }]} pointerEvents="none" />
        </Animated.View>
        {/* Static middle and inner coin */}
        <View style={[styles.coinMiddle, { borderColor }]}>
          <View style={[styles.coinInner, { backgroundColor: bgColor, borderColor: borderColor }]}>
            <Text style={[styles.coinText, theme === 'dark' && { color: '#fff' }]}>{result || 'HEADS'}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const [result, setResult] = useState('HEADS');
  const [spinning, setSpinning] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showResult, setShowResult] = useState(false);
  const sliderY = useRef(new Animated.Value(SLIDER_BOTTOM)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resultAnim = useRef(new Animated.Value(1)).current;

  const spinAnim = useRef(new Animated.Value(0)).current;

  // PanResponder for smooth drag and spring-back
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !spinning && !showResult,
      onMoveShouldSetPanResponder: () => !spinning && !showResult,
      onPanResponderMove: (_, gestureState) => {
        let newY = SLIDER_BOTTOM + gestureState.dy;
        if (newY < SLIDER_TOP) newY = SLIDER_TOP;
        if (newY > SLIDER_BOTTOM) newY = SLIDER_BOTTOM;
        sliderY.setValue(newY);
      },
      onPanResponderRelease: async (_, gestureState) => {
        let newY = SLIDER_BOTTOM + gestureState.dy;
        if (newY < SLIDER_TOP + 30 && !spinning && !showResult) {
          setSpinning(true);
          setShowResult(false);
          // Play sound
          try {
            const { sound } = await Audio.Sound.createAsync(require('../../assets/coinflip.mp3'));
            await sound.playAsync();
          } catch {}
          let flip = true;
          intervalRef.current = setInterval(() => {
            setResult(flip ? 'HEADS' : 'TAILS');
            flip = !flip;
          }, 100);
          setTimeout(() => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            const tossResult = Math.random() > 0.5 ? 'HEADS' : 'TAILS';
            setResult(tossResult);
            setSpinning(false);
            setShowResult(true);
            // Animate in result (OneUI flex effect)
            resultAnim.setValue(1); // Keep coin visible immediately after reset
            Animated.timing(resultAnim, {
              toValue: 1,
              duration: 600,
              easing: Easing.elastic(1.1),
              useNativeDriver: true,
            }).start();
          }, 2000);
          Animated.spring(sliderY, {
            toValue: SLIDER_BOTTOM,
            useNativeDriver: false,
            friction: 5,
            tension: 80,
          }).start();
        } else {
          Animated.spring(sliderY, {
            toValue: SLIDER_BOTTOM,
            useNativeDriver: false,
            friction: 5,
            tension: 80,
          }).start();
        }
      },
    })
  ).current;

  const handleReset = () => {
    setShowResult(false);
    setResult('HEADS');
    sliderY.setValue(SLIDER_BOTTOM);
    resultAnim.setValue(1); // Keep coin visible immediately after reset
  };

  // Spin dashed border forever
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, theme === 'dark' && styles.darkBg]}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Pressable style={[styles.themeBtn, theme === 'dark' && styles.themeBtnDark]} onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <MaterialIcons name={theme === 'dark' ? 'wb-sunny' : 'dark-mode'} size={28} color={theme === 'dark' ? '#4DA8DA' : '#357'} />
          </Pressable>
          <Pressable style={styles.settingsBtn}>
            <MaterialIcons name="settings" size={28} color={theme === 'dark' ? '#fff' : '#357'} />
          </Pressable>
        </View>
        {/* Coin */}
        <View style={styles.coinContainer}>
          <Coin3D result={result} theme={theme} animate={resultAnim} spinAnim={spinAnim} />
          {showResult && (
            <Animated.View style={{
              opacity: resultAnim,
              transform: [{ scale: resultAnim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }],
            }}>
              <Pressable style={styles.retryBtn} onPress={handleReset} android_ripple={{ color: '#4DA8DA' }}>
                <MaterialIcons name="refresh" size={22} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.retryBtnText}>Retry</Text>
              </Pressable>
            </Animated.View>
          )}
        </View>
        {/* Slider (hide when showing result) */}
        {!showResult && (
          <View style={styles.sliderContainer}>
            <View style={[styles.slider, theme === 'dark' && styles.sliderDark] }>
              <Animated.View
                style={[styles.sliderBtn, { top: sliderY, backgroundColor: theme === 'dark' ? '#fff' : '#357', borderColor: theme === 'dark' ? '#4DA8DA' : '#eaf2fa' }]}
                {...panResponder.panHandlers}
              >
                <MaterialIcons name="keyboard-arrow-up" size={32} color={theme === 'dark' ? '#4DA8DA' : '#fff'} />
              </Animated.View>
            </View>
            <Text style={[styles.tossText, theme === 'dark' && { color: '#fff', fontFamily: 'Roboto', fontWeight: '700' }]}>TOSS</Text>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  darkBg: {
    backgroundColor: '#323947',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    marginBottom: 16,
  },
  themeBtn: {
    backgroundColor: '#cce6fa',
    borderRadius: 12,
    padding: 8,
  },
  themeBtnDark: {
    backgroundColor: '#22303C',
  },
  settingsBtn: {
    padding: 8,
  },
  coinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  coinOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
  },
  coinMiddle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#4DA8DA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  coinText: {
    fontSize: 32,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: 1,
    fontFamily: 'Roboto',
  },
  sliderContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 5,
  },
  slider: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    backgroundColor: '#eaf2fa',
    borderRadius: SLIDER_WIDTH / 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8ab6d6',
    marginBottom: 10,
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: 20,
  },
  sliderDark: {
    backgroundColor: '#22303C',
    borderColor: '#4DA8DA',
  },
  sliderBtn: {
    width: SLIDER_BTN_SIZE,
    height: SLIDER_BTN_SIZE,
    borderRadius: SLIDER_BTN_SIZE / 2,
    backgroundColor: '#357',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // left: (SLIDER_WIDTH - SLIDER_BTN_SIZE) / 2,
    borderWidth: 2,
    borderColor: '#eaf2fa',
    shadowColor: '#357',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 8,
  },
  tossText: {
    fontSize: 28,
    fontWeight: 800,
    color: '#357',
    marginTop: 12,
    letterSpacing: 1,
    fontFamily: 'Roboto',
  },
  retryBtn: {
    marginTop: 32,
    backgroundColor: '#4285F4',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#357',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  retryBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
  },
});

