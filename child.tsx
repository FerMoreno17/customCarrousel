import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';

export type ChildType = {
  handleChildButton: () => void;
  up: () => void;
  down: () => void;
};

interface IProps {}

export const Child = forwardRef((props, ref) => {
  const [counter, setCounter] = useState(0);

  useImperativeHandle(ref, () => ({
    handleChildButton: () => handleButton(),
    up: () => counterUp(),
    down: () => counterDown(),
  }));

  const handleButton = () => {
    Alert.alert('Benja');
  };

  const counterUp = () => {
    setCounter(counter + 1);
  };

  const counterDown = () => {
    if (counter > 0) setCounter(counter - 1);
  };

  return (
    <View style={styles.child}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 100, color: 'black'}}>{counter}</Text>
      </View>
      {/* <Pressable style={styles.childBtn} onPress={handleButton}>
        <Text style={styles.label}>child</Text>
      </Pressable> */}
    </View>
  );
});

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 20,
  },
  child: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childBtn: {
    backgroundColor: 'orange',
    minWidth: 360,
    minHeight: 50,
    borderRadius: 50,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
