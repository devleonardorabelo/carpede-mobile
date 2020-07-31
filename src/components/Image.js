import React from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import Gradient from 'react-native-linear-gradient';
import styles, { Colors } from '../global';

export const PreviewImage = ({ image, action, loading, icon }) => (
  <View style={{ justifyContent: 'flex-end', marginBottom: 16 }}>
    {image.uri ? (
      <Image source={image} style={styles.fullImage} resizeMode="cover" />
    ) : (
      <View style={{ height: 100 }} />
    )}

    <View style={styles.groupFloatButton}>
      <TouchableOpacity onPress={action}>
        <Gradient
          style={styles.actionButton}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 1.0, y: 1.0 }}
          colors={[Colors.secondary, Colors.primary]}
        >
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primaryWhite} />
          ) : (
            <MI name={icon} color={Colors.primaryWhite} size={32} />
          )}
        </Gradient>
      </TouchableOpacity>
    </View>
  </View>
);
