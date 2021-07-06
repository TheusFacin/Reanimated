import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import { useHistory } from 'react-router-native'

const Home = () => {
  const history = useHistory()

  const handleNavigateToPage = (page: string) => {
    history.push(page)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#eef" />

      <TouchableOpacity
        style={[styles.button, { marginBottom: 20 }]}
        activeOpacity={0.7}
        onPress={() => handleNavigateToPage('/login')}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginBottom: 20 }]}
        activeOpacity={0.7}
        onPress={() => handleNavigateToPage('/scroll')}
      >
        <Text style={styles.text}>Scroll</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => handleNavigateToPage('/drag')}
      >
        <Text style={styles.text}>Drag</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef',
  },

  button: {
    width: 150,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5a8',
    borderRadius: 8,
  },

  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
})

export { Home }
