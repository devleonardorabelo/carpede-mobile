import React, { useEffect, useState } from 'react';
import { View, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from '@buttercup/react-formatted-input';
import { WhatsappFormat, treatPrice } from '../utils/treatString';
import { getDateNow } from '../utils/getDateNow';

import styles from '../global';

import { Button, ActionButton } from './Button';

export const InfoOrder = ({ data, children, action }) => {
  const { navigate } = useNavigation();

  const customerWhatsapp = format(data.customer.whatsapp, WhatsappFormat);

  const [dateNow, setDateNow] = useState('');

  useEffect(() => {
    setDateNow(getDateNow());
  }, []);

  return (
    <View style={{ marginTop: 64 }}>
      {children}

      <View style={[styles.row, { marginBottom: 8 }]}>
        <Text style={styles.subtitle}>Pagamento:</Text>
      </View>

      <View style={[styles.row, { marginBottom: 16 }]}>
        <View style={[styles.box, styles.column, { marginRight: 8 }]}>
          <Text style={styles.text}>Total</Text>
          <Text style={styles.textBold}>{treatPrice(data.value)}</Text>
        </View>

        {data.paymentMethod.money && (
          <>
            <View style={[styles.box, styles.column, { marginRight: 8 }]}>
              <Text style={styles.text}>Dinheiro</Text>
              <Text style={styles.textBold}>
                {treatPrice(data.paymentMethod.money.amount)}
              </Text>
            </View>
            <View style={[styles.box, styles.column, { flexGrow: 1 }]}>
              <Text style={styles.text}>Troco</Text>
              <Text style={styles.textBold}>
                {treatPrice(data.paymentMethod.money.amount - data.value)}
              </Text>
            </View>
          </>
        )}
        {data.paymentMethod.card && (
          <View style={[styles.box, styles.column]}>
            <Text style={styles.text}>Cartão</Text>
            <Text style={styles.textBold}>
              {data.paymentMethod.card.method === 'credit' && `Crédito`}
              {data.paymentMethod.card.method === 'debit' && `Dédito`}
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.row, { marginBottom: 8 }]}>
        <Text style={styles.subtitle}>Entrega:</Text>
      </View>

      <View style={[styles.column, { marginBottom: 8 }]}>
        <View
          style={[styles.box, styles.row, { justifyContent: 'space-between' }]}
        >
          <View>
            <Text style={styles.text}>Nome:</Text>
            <Text style={styles.textBold}>{data.customer.name}</Text>
            <Text style={styles.textBold}>{customerWhatsapp.formatted}</Text>
          </View>
          <ActionButton
            icon="whatsapp"
            action={() =>
              Linking.openURL(
                `whatsapp://send?phone=55${data.customer.whatsapp}`
              )
            }
          />
        </View>
      </View>

      <View style={[styles.column, { marginBottom: 16 }]}>
        <View
          style={[styles.box, styles.row, { justifyContent: 'space-between' }]}
        >
          <View>
            <Text style={styles.text}>Endereço</Text>
            <Text
              style={[styles.textBold, styles.textWrap, { maxWidth: '80%' }]}
            >
              {data.customer.address} {data.customer.complement}{' '}
              {data.customer.number}
            </Text>
          </View>
          <ActionButton
            icon="map-marker"
            action={() => navigate('StoreDelivery', { order: data })}
          />
        </View>
      </View>

      <View style={styles.column}>
        {data.date === dateNow && data.status === 'waiting' && (
          <Button title="Enviar para a Entrega" action={action} />
        )}
        {data.date !== dateNow && data.status === 'waiting' && (
          <Button disabled disabledText="Pedido Perdido" />
        )}
        {data.status === 'done' && (
          <Button disabled disabledText="Pedido Encerrado" />
        )}
      </View>
    </View>
  );
};
