import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'

import { Back } from '../components/Back'

const Drag = () => {
  const [doGoBack, setDoGoBack] = useState(false)

  let lastTap = 0

  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  const posX = useSharedValue(windowWidth / 2 - 75)
  const posY = useSharedValue(windowHeight / 2 - 75 - 50)

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      posX: number
      posY: number
    }
  >({
    onStart(_, ctx) {
      ctx.posX = posX.value
      ctx.posY = posY.value
    },

    onActive(event, ctx) {
      if (ctx.posX + event.translationX < 0) posX.value = 0
      else if (ctx.posX + event.translationX + 150 > windowWidth)
        posX.value = windowWidth - 150
      else posX.value = ctx.posX + event.translationX

      if (ctx.posY + event.translationY < 0) posY.value = 0
      else if (ctx.posY + event.translationY + 150 + 50 > windowHeight)
        posY.value = windowHeight - 150 - 50
      else posY.value = ctx.posY + event.translationY
    },

    onEnd() {
      if (doGoBack) {
        posX.value = withSpring(windowWidth / 2 - 75)
        posY.value = withSpring(windowHeight / 2 - 75 - 50)
      }
    },
  })

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: posX.value }, { translateY: posY.value }],
    }
  })

  const handlePress = () => {
    const now = Date.now()
    const DOUBLE_PRESS_DELAY = 300
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      setDoGoBack(state => {
        if (!state) {
          posX.value = withSpring(windowWidth / 2 - 75)
          posY.value = withSpring(windowHeight / 2 - 75 - 50)
        }
        return !state
      })
    } else {
      lastTap = now
    }
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#eef" />

        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              styles.block,
              doGoBack ? styles.goBack : styles.dontGoBack,
              positionStyle,
            ]}
          >
            <TouchableWithoutFeedback onPress={handlePress}>
              <Text style={styles.text}>
                Arraste esse item{'\n\n'}Ele{!doGoBack ? ' não' : ''} irá voltar
              </Text>
            </TouchableWithoutFeedback>
          </Animated.View>
        </PanGestureHandler>
      </View>
      <Back />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
  },

  block: {
    width: 150,
    height: 150,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  goBack: {
    backgroundColor: '#c25',
  },

  dontGoBack: {
    backgroundColor: '#2c5',
  },

  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fef',
    fontWeight: 'bold',
  },
})

export { Drag }
