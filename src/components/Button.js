import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Gradient from 'react-native-linear-gradient';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles, { Colors } from '../global';

export const Button = ({
  title,
  status,
  disabled,
  disabledText,
  style,
  action,
}) => {
  const [color, setColor] = useState([Colors.secondary, Colors.primary]);
  const [content, setContent] = useState(
    <Text style={styles.textSemiBold}>{title}</Text>
  );
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    switch (status) {
      case 'loading':
        setColor([Colors.primary, Colors.secondary]);
        setContent(<ActivityIndicator size="large" color="#FFFFFF" />);
        setIsDisabled(true);
        break;
      case 'done':
        setColor([Colors.secondary, Colors.primary]);
        setContent(
          <Text style={[styles.textSemiBold, { color: '#FFFFFF' }]}>
            Feito!
          </Text>
        );
        setIsDisabled(true);
        break;
      default:
        setColor([Colors.secondary, Colors.primary]);
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
        end={{ x: 1.0, y: 1.0 }}
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
      colors={[Colors.secondary, Colors.primary]}
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
