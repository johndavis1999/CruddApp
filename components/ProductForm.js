import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const ProductForm = ({ route, navigation }) => {
    const { product } = route.params; // Obtener el producto desde los parámetros de la ruta

    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        if (product) {
            setDescription(product.description);
            setPrice(product.price.toString());
            setStock(product.stock.toString());
        }
    }, [product]);

    const handleSubmit = async () => {
        try {
            if (product) {
                // Actualizar el producto existente
                await axios.put(`http://192.168.31.94:8000/api/products/${product.id}`, {
                    description,
                    price,
                    stock,
                });
            } else {
                // Crear un nuevo producto
                await axios.post('http://192.168.31.94:8000/api/products', {
                    description,
                    price,
                    stock,
                });
            }
            navigation.navigate('ProductList'); // Regresar a la lista
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar el producto.');
            console.error('Error saving product:', error);
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
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Stock"
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
            />
            <Button title={product ? "Actualizar Producto" : "Crear Producto"} onPress={handleSubmit} />
        </View>
    );
};

export default ProductForm;
