import React from 'react';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const rout = useRoute();
    const incident = rout.params.incident;
    const message = `Hello ${incident.title}, I like to help with this incident "${incident.title}`;

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Incident: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        });
    }

    function sendWhats() {
        //deep linking.
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
          <View style={styles.container}>
            <View style ={styles.header} >
               <Image source={logoImg} />
               <TouchableOpacity onPress={navigateBack}>
                   <Feather name="arrow-left" size={28} color="#E82041" />
               </TouchableOpacity>
            </View>  
            
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty,{ marginTop:0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} - {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>INCIDENT:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALUE:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('en-US',
                                      {style: 'currency', 
                                       currency: 'USD'
                    }).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Save the date.</Text>
                <Text style={styles.heroTitle}>Be hero of this incident.</Text>
                <Text style={styles.heroDescription}>Make Contact:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhats}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity> 
                    
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity> 
                </View> 
            </View>
          </View>
      )  
}