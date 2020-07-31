import React from 'react';
import { View, Text } from 'react-native';

import styles, { Colors } from '../global';
import { LinearButton, ActionButton } from './Button';

export const AlertCenter = ({ active, title, actionClose, text }) => {
  return active ? (
    <View style={styles.backgroundModal}>
      <View style={styles.modal}>
        <View style={styles.headerModal}>
          <Text style={[styles.textBold, { width: '85%' }]}>{title}</Text>
          <LinearButton
            style={{ width: '10%' }}
            icon="close"
            action={actionClose}
          />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  ) : null;
};

export const AlertNotification = ({ show, title, text }) => (
  <View style={[styles.alertBottom, { bottom: show ? 0 : -999 }]}>
    <Text style={[styles.textBold, { color: Colors.primaryWhite }]}>
      {title}
    </Text>
    <Text style={[styles.text, { color: Colors.primaryWhite }]}>{text}</Text>
  </View>
);

export const ChooseImageMode = ({
  active,
  title,
  actionClose,
  actionCamera,
  actionGallery,
}) => {
  return active ? (
    <View style={styles.backgroundModal}>
      <View style={styles.modal}>
        <View style={styles.headerModal}>
          <Text style={[styles.textBold, { marginRight: 20 }]}>{title}</Text>
          <LinearButton icon="close" action={actionClose} />
        </View>
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <ActionButton
            style={{ marginRight: 8 }}
            icon="camera-outline"
            action={actionCamera}
          />
          <ActionButton
            style={{ marginLeft: 8 }}
            icon="image-filter"
            action={actionGallery}
          />
        </View>
      </View>
    </View>
  ) : null;
};

export const Modal = ({ active, title, actionClose, children }) => {
  return active ? (
    <View style={styles.backgroundModal}>
      <View style={styles.modal}>
        <View style={styles.headerModal}>
          <Text style={[styles.textBold, { marginRight: 20 }]}>{title}</Text>
          <LinearButton icon="close" action={actionClose} />
        </View>
        {children}
      </View>
    </View>
  ) : null;
};
