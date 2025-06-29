import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { COLORS, SPACING, fontSizes } from '../../config/Theme/Theme';

const { width: screenWidth } = Dimensions.get('window');

const Carousel = ({ data = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderDots = () => {
    return data.map((_, index) => (
      <View
        key={index}
        style={[styles.dot, index === activeIndex && styles.activeDot]}
      />
    ));
  };

  const renderCarouselItem = (item, index) => (
    <View key={index} style={styles.carouselItem}>
      <View style={styles.carouselImageContainer}>
        <Text style={styles.carouselEmoji}>{item.emoji}</Text>
      </View>
      <View style={styles.carouselContent}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
        <TouchableOpacity style={styles.carouselButton}>
          <Text style={styles.carouselButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {data.map(renderCarouselItem)}
      </ScrollView>
      <View style={styles.pagination}>{renderDots()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginBottom: SPACING.SMALL,
  },
  scrollView: {
    flex: 1,
  },
  carouselItem: {
    width: screenWidth - SPACING.SMALL * 2,
    marginHorizontal: SPACING.SMALL,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  carouselImageContainer: {
    height: 90,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselEmoji: {
    fontSize: 48,
  },
  carouselContent: {
    padding: SPACING.SMALL,
  },
  carouselTitle: {
    fontSize: fontSizes.h5,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  carouselSubtitle: {
    fontSize: fontSizes.xxs,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SMALL,
  },
  carouselButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: SPACING.XXS,
    paddingHorizontal: SPACING.SMALL,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  carouselButtonText: {
    color: COLORS.WHITE,
    fontSize: fontSizes.xxs,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.SMALL,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.BORDER_COLOR,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: COLORS.PRIMARY,
    width: 18,
  },
});

export default Carousel;
