import React, { useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


const initialCategories = [
    { label: "Home", color: "#FF5733" },
    { label: "Food", color: "#33FF57" },
    { label: "Transporte", color: "#3357FF" },
    { label: "Personal", color: "#FF33A1" },
];

const Categorias = () => {
 
    const [categories, setCategories] = useState(initialCategories);
    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ label: '', color: initialCategories[0].color });
    
    const addNewCategory = () => {
        if (newCategory.label.trim() !== '') {
            setCategories([...categories, newCategory]);
            setNewCategory({ label: '', color: initialCategories[0].color });
            setAddCategoryModal(false);
        }
    };    

    return (
        <View>
            <Text style={styles.title}>Category</Text>
                {categories.map((category, index) => (
                        <View key={index} style={styles.categoryItem}>
                            <View style={[styles.colorBox, { backgroundColor: category.color }]}></View>
                            <Text style={styles.transactionValue}>{category.label}</Text>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addIcon} onPress={() => setAddCategoryModal(true)}>
                        <Ionicons name="add-circle-outline" size={24} color="black" />
                    </TouchableOpacity>

            <Modal animationType="none" transparent={true} visible={addCategoryModal} onRequestClose={() => setAddCategoryModal(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput 
                            placeholder="Category Name"
                            value={newCategory.label}
                            onChangeText={(text) => setNewCategory({ ...newCategory, label: text })}
                            style={styles.input}
                        />
                        <FlatList
                            data={initialCategories}
                            keyExtractor={(item) => item.color}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={[styles.colorOption, { backgroundColor: item.color }]} 
                                    onPress={() => setNewCategory({ ...newCategory, color: item.color })}
                                />
                            )}
                            horizontal
                        />
                        <TouchableOpacity onPress={addNewCategory} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}; 

const styles = StyleSheet.create ({
    title: {
        fontSize: 18,
        marginLeft: 15,
        marginTop: 10,
        color: '#666',
    },
    iconContainerWeak: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 0, // Espaço entre o ícone e o texto
    },
    transactionName: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4, // Espaçamento entre nome e data
        marginLeft: 5,
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    transactionInfo: {
        flexDirection: 'row', // Para alinhar ícone e texto lado a lado
        alignItems: 'center', // Centraliza verticalmente
    },
    transactionValue: {
        fontSize: 16,
        //fontWeight: 'bold',
        marginRight: 20,
    },
    colorBox: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginRight: 8,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
    addIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end', 
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
        width: '100%',
        height: '60%', 
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,

    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        fontSize: 24,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    },  
    colorOption: {
        width: 25,
        height: 25,
        borderRadius: 15,
        margin: 5,
        borderWidth: 2,
        borderColor: '#fff',
    },
});

export default Categorias;