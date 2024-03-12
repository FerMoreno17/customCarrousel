import React, {useRef} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Child, ChildType} from './child';

function App(): React.JSX.Element {
  const ref = useRef<ChildType>(null);
  const width = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    slide: {
      flex: 1,
      width: width * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
    },
    labelSlide: {
      fontSize: 40,
    },
  });

  const DATA = [
    {
      id: 1,
      description: (
        <View style={styles.slide}>
          <Text style={[styles.labelSlide, {color: 'blue'}]}>UNO</Text>
        </View>
      ),
    },
    {
      id: 2,
      description: (
        <View style={styles.slide}>
          <Text style={[styles.labelSlide, {color: 'red'}]}>DOS</Text>
        </View>
      ),
    },
    {
      id: 3,
      description: (
        <View style={styles.slide}>
          <Text style={[styles.labelSlide, {color: 'green'}]}>TRES</Text>
        </View>
      ),
    },
  ];

  const handleButton = () => {
    ref.current?.next();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Child ref={ref} DATA={DATA} />
    </SafeAreaView>
  );
}

export default App;
