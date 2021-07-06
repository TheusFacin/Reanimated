import React, { useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
  withSequence,
} from 'react-native-reanimated'
import { View, StyleSheet, StatusBar } from 'react-native'

import heroImage from '../assets/hero.png'
import { Back } from '../components/Back'

const Login = () => {
  const titlePosition = useSharedValue(30)
  const imagePosition = useSharedValue(-50)

  useEffect(() => {
    imagePosition.value = withTiming(
      0,
      {
        duration: 1000,
      },
      () => {
        titlePosition.value = withSequence(
          withTiming(0, {
            duration: 1000,
            easing: Easing.bounce,
          }),
          withTiming(-350, {
            duration: 1000,
            easing: Easing.bounce,
          })
        )
      }
    )
  }, [])

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titlePosition.value }],
      opacity: interpolate(
        titlePosition.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP
      ),
    }
  })

  const heroStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: imagePosition.value }],
      opacity: interpolate(
        imagePosition.value,
        [-50, 0],
        [0, 1],
        Extrapolate.CLAMP
      ),
    }
  })

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#13131a" />

        <Animated.Image source={heroImage} style={[styles.hero, heroStyle]} />

        <Animated.Text style={[styles.title, titleStyle]}>
          Bem vindo ao app
        </Animated.Text>
      </View>
      <Back />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#13131a',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  hero: {
    width: 288,
    height: 200,
    marginBottom: 40,
  },

  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
  },
})

export { Login }
