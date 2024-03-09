import React, {useRef} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Child, ChildType} from './child';

function App(): React.JSX.Element {
  const ref = useRef<ChildType>(null);

  const handleButton = () => {
    ref.current?.handleChildButton();
  };

  const sumar = () => {
    ref.current?.up();
  };

  const restar = () => {
    ref.current?.down();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Child ref={ref} />
      <View style={styles.parent}>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable style={styles.counterButton} onPress={sumar}>
            <Text style={styles.label}>+</Text>
          </Pressable>
          <Pressable style={styles.counterButton} onPress={restar}>
            <Text style={styles.label}>-</Text>
          </Pressable>
        </View>
        {/* <Pressable style={styles.parentBtn} onPress={handleButton}>
          <Text style={styles.label}>Parent</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parentBtn: {
    backgroundColor: 'blue',
    width: 360,
    minHeight: 50,
    borderRadius: 50,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 40,
  },
  counterButton: {
    backgroundColor: 'grey',
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
