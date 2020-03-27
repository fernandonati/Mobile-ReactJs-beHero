import React, {useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents,setIncidents] = useState([]);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);

    function navigateToDetail(incident) {
        navigation.navigate('Detail',{incident});
    }

    async function loadIncidents() {
        if (loading) { //to avoid multiple requisitions.
            return; 
        }

        if (total > 0 && incidents.length === total) { //if all already loaded
            return;
        }

        setLoading(true);
        const response = await api.get('incidents',{
            params: {page}
        });

        setIncidents([ ... incidents, ... response.data]); //to attach two vectors to avoid replace, only add new values.
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }   

    useEffect(() => {
       loadIncidents();
    },[]);


    return (
          <View style ={styles.container} >
            <View style ={styles.header} >
               <Image source={logoImg} />
               <Text style={styles.headerText}>
                   Total of <Text style={styles.headerTextBold}>{total} incidents</Text>
               </Text>
            </View>  
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.description}>Select one of these incidents bellow and help the institution.</Text>

            <FlatList 
                sytle={styles.incidentList}  
                data={incidents} 
                keyExtractor={incident => String(incident.id)}
                //showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item:incident })=>( //item:incident only to rename var.
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}> ORG:</Text>  
                        <Text style={styles.incidentValue}>{incident.name}</Text>  
                        <Text style={styles.incidentProperty}> INCIDENT:</Text>  
                        <Text style={styles.incidentValue}> {incident.title}</Text>  
                        <Text style={styles.incidentProperty}> VALUE:</Text>  
                        <Text style={styles.incidentValue}>
                               {Intl.NumberFormat('en-US',
                                    {style: 'currency', 
                                     currency: 'USD'
                                }).format(incident.value)}</Text>  
                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                        >                            
                        <Text style={styles.detailsButtonText}>See Details...</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>  
                    </View>    
                )}
            />           
          </View> 
      );
}