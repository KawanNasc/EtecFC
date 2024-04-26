import {createStackNavigator} from '@react-navigation/stack';

import Home from './pagesApp/Home';
import CadastrarClube from './pagesApp/CadastrarClube';
import AlterarClube from './pagesApp/AlterarClube';

const Stack = createStackNavigator();

export default function Rotas(){
    return(
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="Cadastrar Clube" component={CadastrarClube} options={{headerShown: false}}/>
            <Stack.Screen name="Alterar Clube" component={AlterarClube} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}