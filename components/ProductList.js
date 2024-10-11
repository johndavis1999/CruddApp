import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const ProductList = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://192.168.31.94:8000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProducts(); // Cargar productos al enfocar la pantalla
        }, [])
    );

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://192.168.31.94:8000/api/products/${id}`);
            fetchProducts(); // Recargar productos después de eliminar
        } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el producto.');
            console.error('Error deleting product:', error);
        }
    };

    return (
        <View>
            <Button
                title="Crear Producto"
                onPress={() => navigation.navigate('ProductForm', { product: null })} // Navegar a la pantalla de creación
            />
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.description}</Text>
                        <Button title="Edit" onPress={() => navigation.navigate('ProductForm', { product: item })} />
                        <Button title="Delete" onPress={() => deleteProduct(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

export default ProductList;
