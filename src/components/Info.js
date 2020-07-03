import React, { useEffect, useState } from 'react';
import { View, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from '@buttercup/react-formatted-input';
import { WhatsappFormat, treatPrice } from '../utils/treatString';
import { getDateNow } from '../utils/getDateNow';

import styles from '../global';

import { Button, ActionButton } from '../components/Button';

export function InfoOrder(props) {

    const navigation = useNavigation();

    const customerWhatsapp = format(props.data.customer.whatsapp, WhatsappFormat);

    const sendWhatsapp = () => Linking.openURL(`whatsapp://send?phone=55${props.data.customer.whatsapp}`)

    const navigateToDelivery = () => navigation.navigate('StoreDelivery', { order: props.data });

    const [ dateNow, setDateNow ] = useState('')

    useEffect(() => {
        setDateNow(getDateNow());
    },[])

    return (

        <View style={{ marginTop: 64 }}>

            {props.children}

            <View style={[styles.row,{ marginBottom: 8 }]}>
                <Text style={styles.subtitle}>Pagamento:</Text>
            </View>

            <View style={[styles.row,{ marginBottom: 16 }]}>
                
                <View style={[styles.box, styles.column,{ marginRight: 8 }]}>
                    <Text style={styles.text}>Total</Text>
                    <Text style={styles.textBold}>{treatPrice(props.data.value + props.data.fees.payment + props.data.fees.delivery)}</Text> 
                </View>

                { props.data.paymentMethod.money && <>
                    <View style={[styles.box, styles.column,{ marginRight: 8 }]}>
                        <Text style={styles.text}>Dinheiro</Text>
                        <Text style={styles.textBold}>{treatPrice(props.data.paymentMethod.money.amount)}</Text>   
                    </View>
                    <View style={[styles.box, styles.column, { flexGrow: 1 }]}>
                        <Text style={styles.text}>Troco</Text>
                        <Text style={styles.textBold}>{treatPrice(props.data.paymentMethod.money.amount - ( props.data.value + props.data.fees.payment + props.data.fees.delivery ))}</Text>   
                    </View>
                    </>
                }
                { props.data.paymentMethod.card &&
                    <View style={[styles.box, styles.column]}>
                        <Text style={styles.text}>Cartão</Text>
                        <Text style={styles.textBold}>
                            {props.data.paymentMethod.card.method == 'credit' && `Crédito`}
                            {props.data.paymentMethod.card.method == 'debit' && `Dédito`}
                        </Text>    
                    </View>
                }   
            </View>

            <View style={[styles.row,{ marginBottom: 8 }]}>
                <Text style={styles.subtitle}>Entrega:</Text>
            </View>

            <View style={[styles.column, { marginBottom: 8 }]}>
                <View style={[styles.box, styles.row, { justifyContent: 'space-between' }]}>
                    <View>
                        <Text style={styles.text}>Nome:</Text>
                        <Text style={styles.textBold}>{props.data.customer.name}</Text>
                        <Text style={styles.textBold}>{customerWhatsapp.formatted}</Text> 
                    </View>
                    <ActionButton icon={'whatsapp'} action={sendWhatsapp}/>  
                </View>
            </View>

            <View style={[styles.column, { marginBottom: 16 }]}>
                <View style={[styles.box, styles.row, { justifyContent: 'space-between' }]}>
                    <View>
                        <Text style={styles.text}>Endereço</Text>
                        <Text style={styles.textBold}>{props.data.customer.address} {props.data.customer.complement} {props.data.customer.number}</Text>    
                    </View>
                    <ActionButton icon={'map-marker'} action={navigateToDelivery}/>  
                </View>
            </View>
           

            <View style={styles.column}>
                {props.data.date == dateNow && props.data.status == 'waiting' && 
                    <Button title='Enviar para a Entrega' action={props.action} />}
                {props.data.date != dateNow && props.data.status == 'waiting' &&
                    <Button disabled={true} disabledText='Pedido Perdido'/>}
                {props.data.status == 'done' &&
                    <Button disabled={true} disabledText='Pedido Encerrado'/>}
            </View>
        </View>
    )
}