import React from 'react'
import { StyleSheet, View, Image, Text, StatusBar } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

import { Back } from '../components/Back'

const Scroll = () => {
  const scrollY = useSharedValue(0)

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 150],
        [250, 100], // 100 = 300 - 200
        Extrapolate.CLAMP
      ),
    }
  })

  const avatarStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [50, 120], [1, 0], Extrapolate.CLAMP),
    }
  })

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6c63ff" />
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: 250 }}
        >
          <Text style={styles.listItem}>1º Item da lista</Text>
          <Text style={styles.listItem}>2º Item da lista</Text>
          <Text style={styles.listItem}>3º Item da lista</Text>
          <Text style={styles.listItem}>4º Item da lista</Text>
          <Text style={styles.listItem}>5º Item da lista</Text>
          <Text style={styles.listItem}>6º Item da lista</Text>
          <Text style={styles.listItem}>7º Item da lista</Text>
          <Text style={styles.listItem}>8º Item da lista</Text>
          <Text style={styles.listItem}>9º Item da lista</Text>
          <Text style={styles.listItem}>10º Item da lista</Text>
          <Text style={styles.listItem}>11º Item da lista</Text>
          <Text style={styles.listItem}>12º Item da lista</Text>
          <Text style={styles.listItem}>13º Item da lista</Text>
          <Text style={styles.listItem}>14º Item da lista</Text>
          <Text style={styles.listItem}>15º Item da lista</Text>
          <Text style={styles.listItem}>16º Item da lista</Text>
        </Animated.ScrollView>

        <Animated.View style={[styles.header, headerStyle]}>
          <Animated.Image
            style={[styles.avatar, avatarStyle]}
            source={{ uri: 'https://github.com/TheusFacin.png' }}
          />
          <Text style={styles.name}>Matheus Facin</Text>
        </Animated.View>
      </View>
      <Back />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  header: {
    height: 250,
    backgroundColor: '#6c63ff',
    paddingVertical: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',

    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
  },

  avatar: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#fff',
  },

  listItem: {
    padding: 20,
    fontSize: 18,
  },
})

export { Scroll }
