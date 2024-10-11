import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ProductList">
                <Stack.Screen name="ProductList" component={ProductList} />
                <Stack.Screen name="ProductForm" component={ProductForm} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
