/* eslint-disable consistent-return */
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../global';

export const Input = ({
  error,
  name,
  style,
  title,
  placeholder,
  action,
  defaultValue,
  keyboard,
  focus,
  maxLength,
  capitalize,
}) => {
  const err = () => {
    if (!error) return;
    if (error.input === name) return true;
  };

  const treatContent = (content) => {
    if (typeof content === 'number') return content.toFixed(2);
    return content;
  };

  return (
    <View style={[styles.groupInput, style]}>
      <View style={styles.labelInput}>
        <Text
          style={[
            styles.labelText,
            styles.textSemiBold,
            {
              color: err() ? '#E63B2E' : '#333333',
            },
          ]}
        >
          {title}
        </Text>
      </View>
      <TextInput
        style={[
          styles.textInput,
          {
            borderColor: err() ? '#E63B2E' : '#E2E2E2',
            borderWidth: err() ? 2 : 1,
          },
        ]}
        placeholder={placeholder}
        onChangeText={action}
        defaultValue={treatContent(defaultValue)}
        autoFocus={focus || false}
        keyboardType={keyboard || 'default'}
        maxLength={maxLength || 20}
        autoCapitalize={capitalize || 'sentences'}
      />
      {err() && <Text style={styles.inputTextAlert}>{error.text}</Text>}
    </View>
  );
};

export const InputPassword = ({ error, name, title, action, placeholder }) => {
  const err = () => {
    if (!error) return;
    if (error.input === name) return true;
  };

  return (
    <View style={styles.groupInput}>
      <View style={styles.labelInput}>
        <Text
          style={[
            styles.labelText,
            styles.textSemiBold,
            {
              color: err() ? '#E63B2E' : '#333333',
            },
          ]}
        >
          {title}
        </Text>
      </View>
      <TextInput
        style={[
          styles.textInput,
          {
            borderColor: err() ? '#E63B2E' : '#E2E2E2',
            borderWidth: err() ? 2 : 1,
          },
        ]}
        onChangeText={action}
        placeholder={placeholder}
        maxLength={20}
        secureTextEntry
        password
      />
      {err() && <Text style={styles.inputTextAlert}>{error.text}</Text>}
    </View>
  );
};

export const TextArea = ({
  error,
  name,
  title,
  defaultValue,
  action,
  placeholder,
  maxLength,
}) => {
  const err = () => {
    if (!error) return;
    if (error.input === name) return true;
  };

  return (
    <View style={styles.groupInput}>
      <View style={styles.labelInput}>
        <Text style={[styles.labelText, styles.textSemiBold]}>{title}</Text>
      </View>
      <TextInput
        multiline
        numberOfLines={10}
        style={styles.textareaInput}
        defaultValue={defaultValue}
        onChangeText={action}
        placeholder={placeholder}
        maxLength={100 || maxLength}
      />
      {err() && <Text style={styles.inputTextAlert}>{error.text}</Text>}
    </View>
  );
};

export const Select = ({ error, name, style, action, title, text }) => {
  const err = () => {
    if (!error) return;
    if (error.input === name) return true;
  };

  return (
    <TouchableOpacity style={[styles.groupInput, style]} onPress={action}>
      <View style={styles.labelInput}>
        <Text
          style={[
            styles.labelText,
            styles.textSemiBold,
            {
              color: err() ? '#E63B2E' : '#333333',
            },
          ]}
        >
          {title}
        </Text>
      </View>
      <Text
        style={[
          styles.textInput,
          {
            borderColor: err() ? '#E63B2E' : '#E2E2E2',
            borderWidth: err() ? 2 : 1,
            textAlignVertical: 'center',
          },
        ]}
      >
        {text}
      </Text>
      {err() && <Text style={styles.inputTextAlert}>{error.text}</Text>}
    </TouchableOpacity>
  );
};
