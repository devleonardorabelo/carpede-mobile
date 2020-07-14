import React, { useState } from 'react';
import { SafeAreaView, View, Text, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import { LocationMap } from '../../../components/Map';
import styles from '../../../global';

import { TransparentHeader } from '../../../components/Header';
import { LinearButton } from '../../../components/Button';
import { AlertCenter } from '../../../components/Modal';

export default function Delivery() {
  const [copied, setCopied] = useState(false);

  const route = useRoute();
  const { order } = route.params;
  const location = `http://maps.google.com/maps?daddr=${order.location.coordinates[1]},${order.location.coordinates[0]}`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TransparentHeader />
      <LocationMap
        latitude={order.location.coordinates[1]}
        longitude={order.location.coordinates[0]}
      />
      <View style={[styles.deliveryInfo]}>
        <View>
          <Text style={[styles.text, { color: '#FFFFFF' }]}>Endereço</Text>
          <Text style={[styles.textBold, { color: '#FFFFFF' }]}>
            {order.customer.address} {order.customer.complement}{' '}
            {order.customer.number}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <LinearButton
            style={{ padding: 8 }}
            icon="navigation"
            color="#FFFFFF"
            action={() => Linking.openURL(location)}
          />
          <LinearButton
            style={{ padding: 8 }}
            icon="content-copy"
            color="#FFFFFF"
            action={() => {
              Clipboard.setString(location);
              setCopied(true);
              setTimeout(() => setCopied(false), 5000);
            }}
          />
          <LinearButton
            style={{ padding: 8 }}
            icon="whatsapp"
            color="#FFFFFF"
            action={() => Linking.openURL(`whatsapp://send?text=${location}`)}
          />
        </View>
      </View>
      <AlertCenter
        title="Rota de entrega copiada!"
        text="A rota de entrega foi copiada para a área de transferência, você pode compartilhar colando e enviando para o entregador."
        active={copied}
        actionClose={() => {
          setCopied(false);
        }}
      />
    </SafeAreaView>
  );
}
