import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Home = () => {


    return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello World!</Text>
            <Text style = {{ marginTop: 10 }}>Isto vai ser uma app de gestao de financas</Text>
        </View>
    );
};

const styles = StyleSheet.create ({

});

export default Home;