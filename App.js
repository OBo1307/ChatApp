// import the screens
import Chat from './components/Chat';
import Start from './components/Start';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Ignore a specific warning about AsyncStorage
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
	// Set up the Firebase configuration object
	const firebaseConfig = {
		apiKey: 'AIzaSyA0b4pdBg69mREVb4NrcRfixkaqUiPRtUE',
		authDomain: 'chatapp-45788.firebaseapp.com',
		projectId: 'chatapp-45788',
		storageBucket: 'chatapp-45788.appspot.com',
		messagingSenderId: '686039233102',
		appId: '1:686039233102:web:1a4af2bc3fe561f81ac91f',
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	// Initialize Cloud Firestore and get a reference to the service
	const db = getFirestore(app);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Start'>
				<Stack.Screen name='Start' component={Start} />
				<Stack.Screen name='Chat'>
					{(props) => <Chat db={db} {...props} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
