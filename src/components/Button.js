import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Gradient from 'react-native-linear-gradient';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../global';

export const Button = ({
  title,
  status,
  disabled,
  disabledText,
  style,
  action,
}) => {
  const [color, setColor] = useState(['#FF7239', '#FF4700']);
  const [content, setContent] = useState(
    <Text style={styles.textSemiBold}>{title}</Text>
  );
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    switch (status) {
      case 'loading':
        setColor(['#FF4700', '#FF7239']);
        setContent(<ActivityIndicator size="large" color="#FFFFFF" />);
        setIsDisabled(true);
        break;
      case 'done':
        setColor(['#FF7239', '#FF4700']);
        setContent(
          <Text style={[styles.textSemiBold, { color: '#FFFFFF' }]}>
            Feito!
          </Text>
        );
        setIsDisabled(true);
        break;
      default:
        setColor(['#FF7239', '#FF4700']);
        setContent(
          <Text style={[styles.textSemiBold, { color: '#FFFFFF' }]}>
            {title}
          </Text>
        );
        setIsDisabled(false);
    }

    if (disabled === true) {
      setColor(['#F5F5F5', '#F5F5F5']);
      setContent(<Text style={styles.textSemiBold}>{disabledText}</Text>);
      setIsDisabled(true);
    }
  }, [status, disabled]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[style]}
      onPress={action}
      disabled={isDisabled}
    >
      <Gradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={color}
        style={styles.button}
      >
        {content}
      </Gradient>
    </TouchableOpacity>
  );
};

export const ButtonTransparent = ({ action, icon, title }) => (
  <TouchableOpacity style={styles.buttonTransparent} onPress={action}>
    <MI style={{ paddingRight: 8 }} name={icon} size={16} color="#333333" />
    <Text style={styles.textSemiBold}>{title}</Text>
  </TouchableOpacity>
);

export const ActionButton = ({ action, disabled, style, icon }) => (
  <TouchableOpacity onPress={action} disabled={disabled}>
    <Gradient
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      colors={['#FF7239', '#FF4700']}
      style={[styles.actionButton, style]}
    >
      <MI name={icon} size={32} color="#FFFFFF" />
    </Gradient>
  </TouchableOpacity>
);

export const LinearButton = ({ style, action, icon, color }) => (
  <TouchableOpacity style={style} onPress={action}>
    <MI name={icon} size={32} color={color || '#333333'} />
  </TouchableOpacity>
);

export const FilterButton = ({ action, icon, subIcon }) => (
  <TouchableOpacity onPress={action}>
    <MI name={icon} size={32} color="#333333" />
    <MI
      style={{
        position: 'absolute',
        top: 8,
        left: -12,
      }}
      name={subIcon}
      size={24}
      color="#FF4700"
    />
  </TouchableOpacity>
);
