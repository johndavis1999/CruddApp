// components/ProductForm.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.31.94:8000/api/products';

const ProductForm = ({ route, navigation }) => {
    const { product } = route.params || {};
    const [description, setDescription] = useState(product ? product.description : '');
    const [price, setPrice] = useState(product ? product.price.toString() : '');
    const [stock, setStock] = useState(product ? product.stock.toString() : '');

    const handleSubmit = async () => {
        try {
            if (product) {
                // Update existing product
                await axios.put(`${API_URL}/${product.id}`, { description, price, stock });
                Alert.alert('Éxito', 'Producto actualizado correctamente.');
            } else {
                // Create new product
                await axios.post(API_URL, { description, price, stock });
                Alert.alert('Éxito', 'Producto creado correctamente.');
            }
            navigation.navigate('ProductList');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo guardar el producto.');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                placeholder="Precio"
                value={price}
                keyboardType="numeric"
                onChangeText={setPrice}
            />
            <TextInput
                placeholder="Stock"
                value={stock}
                keyboardType="numeric"
                onChangeText={setStock}
            />
            <Button title="Guardar" onPress={handleSubmit} />
        </View>
    );
};

export default ProductForm;