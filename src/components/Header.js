import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../global';

export const Header = ({ title, children }) => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.header}>
      <View>
        <TouchableOpacity onPress={goBack}>
          <MI name="arrow-left" size={32} color="#333333" />
        </TouchableOpacity>
      </View>
      {title && (
        <Text style={[styles.textBold, { textTransform: 'uppercase' }]}>
          {title}
        </Text>
      )}
      {children ? <View>{children}</View> : <View style={{ marginLeft: 32 }} />}
    </View>
  );
};

export const CustomHeader = ({ action, icon, children }) => (
  <View style={styles.header}>
    <View>
      <TouchableOpacity onPress={action}>
        <MI name={icon} size={32} color="#333333" />
      </TouchableOpacity>
    </View>
    <View>{children}</View>
  </View>
);

export function TransparentHeader({ children }) {
  const { goBack } = useNavigation();

  return (
    <View
      style={[
        styles.boxFluid,
        {
          position: 'absolute',
          zIndex: 999,
          top: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      ]}
    >
      <View>
        <TouchableOpacity onPress={goBack}>
          <MI name="arrow-left" size={32} color="#333333" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {children}
      </View>
    </View>
  );
}
