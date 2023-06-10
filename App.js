// import the screens
import Chat from './components/Chat';
import Start from './components/Start';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Firebase SDK
import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	enableNetwork,
	disableNetwork,
} from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

// Ignore a specific warning about AsyncStorage
import { LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

// Import the NetInfo hook
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
	// use the NetInfo hook to get the network connection status
	const connectionStatus = useNetInfo();

	// useEffect hook to enable/disable network access based on the connection status
	useEffect(() => {
		if (connectionStatus.isConnected === false) {
			Alert.alert('Connection Lost!');
			disableNetwork(db);
		} else if (connectionStatus.isConnected === true) {
			enableNetwork(db);
		}
	}, [connectionStatus.isConnected]);

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

	const storage = getStorage(app);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Start'>
				<Stack.Screen name='Start' component={Start} />
				<Stack.Screen name='Chat'>
					{(props) => (
						<Chat
							isConnected={connectionStatus.isConnected}
							db={db}
							storage={storage}
							{...props}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
