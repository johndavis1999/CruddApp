// components/ProductList.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import axios from 'axios';

const ProductList = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    // Función para obtener los productos
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://192.168.31.94:8000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Función para eliminar un producto
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://192.168.31.94:8000/api/products/${id}`);
            fetchProducts(); // Volver a obtener los productos después de eliminar
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Función para confirmar la eliminación
    const confirmDelete = (id) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas eliminar este producto?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Eliminar", onPress: () => deleteProduct(id) }
            ]
        );
    };

    useEffect(() => {
        fetchProducts(); // Obtener los productos al montar el componente
    }, []);

    // Renderizar cada elemento de la lista
    const renderItem = ({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text>{item.description}</Text>
            <Text>Precio: ${item.price}</Text>
            <Text>Stock: {item.stock}</Text>
            <Button title="Editar" onPress={() => navigation.navigate('ProductForm', { product: item })} />
            <Button title="Eliminar" color="red" onPress={() => confirmDelete(item.id)} />
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default ProductList;
