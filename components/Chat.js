import React, { useState } from 'react';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect } from 'react';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

import {
	collection,
	query,
	orderBy,
	onSnapshot,
	addDoc,
} from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
	// Get the `name` prop from the `route` object
	const { name, backgroundColor, userID } = route.params;

	// Initialize the `messages` state with an empty array
	const [messages, setMessages] = useState([]);

	// Function to append new messages to the `messages` state
	const onSend = (newMessages) => {
		addDoc(collection(db, 'messages'), newMessages[0]);
	};

	// Function to customize the appearance of chat bubbles
	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#000',
					},
					left: {
						backgroundColor: '#fff',
					},
				}}
			/>
		);
	};

	let unsubMessages;
	// Initialize the `messages` state with some default messages when the component mounts for the first time
	useEffect(() => {
		if (isConnected === true) {
			// unregister current onSnapshot() listener to avoid registering multiple listeners when
			// useEffect code is re-executed.
			if (unsubMessages) unsubMessages();
			unsubMessages = null;

			navigation.setOptions({ title: name });
			// Query the 'messages' collection in Firestore for the chat messages, ordered by creation date
			const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
			// Subscribe to changes to the 'messages' collection in Firestore
			unsubMessages = onSnapshot(q, (docs) => {
				let newMessages = [];
				// Convert the Firestore document snapshots to an array of message objects
				docs.forEach((doc) => {
					newMessages.push({
						id: doc.id,
						...doc.data(),
						createdAt: new Date(doc.data().createdAt.toMillis()),
					});
				});
				// Update the `messages` state with the new messages
				cachedMessages(newMessages);
				setMessages(newMessages);
			});
		} else {
			// Load cached messages if offline
			loadCachedMessages();
		}

		// Unsubscribe from the 'messages' collection when the component unmounts
		return () => {
			if (unsubMessages) unsubMessages();
		};
	}, [isConnected]);

	// Function to cache the messages in AsyncStorage
	const cachedMessages = async (messagesToCache) => {
		try {
			await AsyncStorage.setItem(
				'messages_stored',
				JSON.stringify(messagesToCache)
			);
		} catch (error) {
			console.log(error.message);
		}
	};

	// Function to load cached messages from AsyncStorage
	const loadCachedMessages = async () => {
		const cachedMessages =
			(await AsyncStorage.getItem('messages_stored')) || [];
		setMessages(JSON.parse(cachedMessages));
	};

	// Function to render the input toolbar based on network connectivity
	const renderInputToolbar = (props) => {
		if (isConnected) return <InputToolbar {...props} />;
		else return null;
	};

	const renderCustomView = (props) => {
		const { currentMessage } = props;
		if (currentMessage.location) {
			return (
				<MapView
					style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
					region={{
						latitude: currentMessage.location.latitude,
						longitude: currentMessage.location.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			);
		}
		return null;
	};

	const renderCustomActions = (props) => {
		return <CustomActions userID={userID} storage={storage} {...props} />;
	};

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				renderInputToolbar={renderInputToolbar}
				onSend={onSend}
				renderActions={renderCustomActions}
				renderCustomView={renderCustomView}
				user={{
					_id: route.params.userID,
					name: route.params.name,
				}}
			/>
			{/* Render the `KeyboardAvoidingView` component on Android devices to adjust the layout when the keyboard is shown */}
			{Platform.OS === 'android' ? (
				<KeyboardAvoidingView behavior='height' />
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
	},
});

export default Chat;
