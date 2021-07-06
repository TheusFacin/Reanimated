import React from 'react'
import { Link } from 'react-router-native'
import { View, Text, StyleSheet } from 'react-native'

const Back = () => {
  return (
    <Link to="/">
      <View style={styles.container}>
        <Text style={styles.text}>Voltar</Text>
      </View>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5a8',
  },

  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
})

export { Back }
