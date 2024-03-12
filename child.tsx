import {
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export type ChildType = {
  next: () => void;
  prev: () => void;
};

interface IProps {
  DATA?: any;
}

export const Child = forwardRef(({DATA}: IProps, ref) => {
  useImperativeHandle(ref, () => ({
    next: () => goNextSlide(),
    prev: () => goPrevtSlide(),
  }));

  const slidesRef = useRef<FlatList>(null);
  const {height} = Dimensions.get('screen');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [disabledPrev, setDisablePrev] = useState(true);
  const [disabledNext, setDisableNext] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    controlContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      top: height * 0.42,
    },
    controlBtn: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      zIndex: 1,
    },
    icon: {
      fontSize: 18,
      color: 'black',
    },
    disabled: {
      color: '#c7c7c7',
    },
    indicatorContainer: {
      display: 'flex',
    },
    indicatorRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    indicator: {
      width: 20,
      height: 20,
      borderRadius: 20,
      marginHorizontal: 10,
    },
    indicatorActive: {
      backgroundColor: 'blue',
    },
    indicatorInactive: {
      backgroundColor: '#c7c7c7',
    },
  });

  const handleScroll = (event: any) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(xPosition / totalWidth);
    setCurrentSlide(index);
  };

  const goNextSlide = () => {
    slidesRef.current!.scrollToIndex({
      index: currentSlide < DATA.length - 1 ? currentSlide + 1 : 0,
      animated: true,
    });
    setCurrentSlide(currentSlide + 1);
  };

  const goPrevtSlide = () => {
    slidesRef.current!.scrollToIndex({
      index: currentSlide ? currentSlide - 1 : DATA.length - 1,
      animated: true,
    });
    setCurrentSlide(currentSlide - 1);
  };

  function renderItem(item: any) {
    return item.item.description;
  }

  const renderIndicator = (index: any) => {
    return (
      <View
        style={[
          styles.indicator,
          currentSlide === index
            ? styles.indicatorActive
            : styles.indicatorInactive,
        ]}
        key={index}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        ref={slidesRef}
        horizontal
        renderItem={item => renderItem(item)}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate={'fast'}
        onScroll={handleScroll}
      />
      <View style={styles.controlContainer}>
        <Pressable
          style={styles.controlBtn}
          onPress={goPrevtSlide}
          disabled={disabledPrev}>
          <Text style={[styles.icon, disabledPrev && styles.disabled]}>
            {'izq'}
          </Text>
        </Pressable>
        <Pressable
          style={styles.controlBtn}
          onPress={goNextSlide}
          disabled={disabledNext}>
          <Text style={[styles.icon, disabledNext && styles.disabled]}>
            {'der'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.indicatorContainer}>
        <View style={styles.indicatorRow}>
          {DATA.map((_: any, index: any) => renderIndicator(index))}
        </View>
      </View>
    </View>
  );
});
