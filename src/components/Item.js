import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Gradient from 'react-native-linear-gradient';
import styles from '../global';

import { regexMed, treatPrice } from '../utils/treatString';

import { InfoOrder } from './Info';

import cardImage from '../assets/illustrations/repeat_food.png';

export const NavItem = ({ action, icon, title, subtitle }) => (
  <TouchableOpacity style={styles.action} onPress={action}>
    <View style={styles.iconAction}>
      <MI name={icon} size={32} color="#333333" />
    </View>
    <View style={{ flexGrow: 1, justifyContent: 'center' }}>
      <Text style={styles.textSemiBold}>{title}</Text>
      <Text style={styles.subtitleTextAction}>{subtitle}</Text>
    </View>
    <View style={styles.arrowAction}>
      <MI name="chevron-right" size={32} color="#666666" />
    </View>
  </TouchableOpacity>
);

export const Avatar = ({
  action,
  loading,
  image,
  isChangeable,
  transparent,
  icon,
  title,
  subtitle,
}) => (
  <View style={styles.store}>
    <TouchableOpacity onPress={action}>
      {!loading ? (
        <Image
          style={styles.storeAvatar}
          source={!image.uri ? cardImage : image}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.storeAvatar,
            {
              backgroundColor: '#E2E2E2',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <ActivityIndicator size="small" color="#FF4700" />
        </View>
      )}
      {isChangeable && !loading && (
        <View style={styles.boxFloatButton}>
          <View
            style={[
              styles.buttonFloat,
              {
                width: 32,
                height: 32,
                display: transparent ? 'none' : 'flex',
              },
            ]}
          >
            <MI name={icon} color="#fff" size={32} />
          </View>
        </View>
      )}
    </TouchableOpacity>

    <View style={{ flexGrow: 1, paddingLeft: 16 }}>
      <View style={{ flexDirection: 'row' }}>
        {title === '' || title === undefined ? (
          <View style={styles.titleHide} />
        ) : (
          <Text
            style={[
              styles.title,
              styles.textWrap,
              {
                marginBottom: 0,
                fontSize: 30 - title.length * 0.3,
              },
            ]}
          >
            {title}
          </Text>
        )}
      </View>
      {!subtitle ? (
        <View style={[styles.textHide, { marginTop: 4 }]} />
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <MI
            name="whatsapp"
            color="#333333"
            size={16}
            style={{ marginTop: 3, marginRight: 4 }}
          />
          <Text style={styles.text}>{subtitle}</Text>
        </View>
      )}
    </View>
  </View>
);

export const Card = ({ style, action, image, title, price, children }) => (
  <TouchableOpacity style={[styles.box, style]} onPress={action}>
    {image && (
      <Image
        style={styles.boxImage}
        source={{ uri: image }}
        resizeMode="cover"
      />
    )}

    {title && (
      <View style={styles.boxBody}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.textWrap, styles.textBold]}>
            {title && regexMed(title)}
          </Text>
        </View>
        {price && <Text style={styles.textSemiBold}>{treatPrice(price)}</Text>}
      </View>
    )}

    {children}
  </TouchableOpacity>
);

export const CardOrder = ({ action, title, address, status, price, time }) => {
  return (
    <TouchableOpacity style={styles.box} onPress={action}>
      <View style={{ flexGrow: 1 }}>
        <Text style={styles.textBold}>{regexMed(title).toUpperCase()}</Text>
        <Text style={[styles.text]}>{regexMed(address).toUpperCase()}</Text>
        {status[0] === 'done' && <Text style={styles.text}>{status[2]}</Text>}
        {status[0] === 'lost' && <Text style={styles.text}>{status[1]}</Text>}
      </View>
      <View>
        <Text style={[styles.textSemiBold, { marginTop: 0 }]}>
          {treatPrice(price)}
        </Text>
        <Text
          style={[styles.textBold, { alignSelf: 'flex-end', color: '#FF4700' }]}
        >
          {time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const CardItem = ({ amount, title, price }) => (
  <View style={[styles.box, { flexDirection: 'row', marginBottom: 8 }]}>
    <Text style={[styles.text, { marginRight: 8 }]}>{amount}x</Text>
    <Text style={[styles.textWrap, styles.text]}>{regexMed(title)}</Text>
    <Text style={[styles.textSemiBold, { marginTop: 0 }]}>
      {treatPrice(price)}
    </Text>
  </View>
);

export const Checkout = ({ data, action }) => {
  const [wasClicked, setWasClicked] = useState(false);
  const [viewSize, setViewSize] = useState(0);

  const translateY = new Animated.Value(0);
  const marginAnim = new Animated.Value(-16);

  let offset = 0;

  const sendInfoClicked = () => {
    setWasClicked(true);
    setTimeout(() => setWasClicked(false), 1000);
  };

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;

      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= -80) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(-430);
        offset = -430;
      }

      Animated.timing(translateY, {
        toValue: opened ? 430 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 0 : -430;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });

      Animated.timing(marginAnim, {
        toValue: opened ? -16 : 16,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }

  return (
    <PanGestureHandler
      onGestureEvent={animatedEvent}
      onHandlerStateChange={onHandlerStateChanged}
    >
      <Animated.View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setViewSize(-(height - 64));
        }}
        style={[
          styles.orderCheckout,
          {
            bottom: viewSize,
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [viewSize, 0],
                  outputRange: [viewSize, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.orderHeader,
            {
              zIndex: 99,
              opacity: translateY.interpolate({
                inputRange: [-50, 0],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <Gradient colors={['#FF4700', '#FF7239']}>
            <TouchableOpacity
              style={styles.orderDropButton}
              onPress={sendInfoClicked}
            >
              {wasClicked ? (
                <View style={{ alignItems: 'center' }}>
                  <MI name="menu-up" color="#FFFFFF" size={32} />
                  <Text
                    style={[styles.text, { marginTop: -10, color: '#FFFFFF' }]}
                  >
                    Segure e arraste pra cima
                  </Text>
                </View>
              ) : (
                <>
                  <View>
                    <MI name="bike" color="#FFFFFF" size={32} />
                  </View>
                </>
              )}
            </TouchableOpacity>
          </Gradient>
        </Animated.View>

        <View style={[styles.orderHeader, { backgroundColor: '#FFFFFF' }]}>
          <TouchableOpacity
            style={styles.orderDropButton}
            onPress={sendInfoClicked}
          >
            <View>
              <MI name="chevron-down" color="#FF4700" size={32} />
            </View>
          </TouchableOpacity>
        </View>

        <InfoOrder data={data} action={action} />
      </Animated.View>
    </PanGestureHandler>
  );
};
