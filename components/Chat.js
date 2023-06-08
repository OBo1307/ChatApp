import React, { useState } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect } from 'react';

import {
	collection,
	query,
	orderBy,
	onSnapshot,
	addDoc,
} from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
	// Get the `name` prop from the `route` object
	const { name, backgroundColor } = route.params;

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

	// Initialize the `messages` state with some default messages when the component mounts for the first time
	useEffect(() => {
		navigation.setOptions({ title: name });
		// Query the 'messages' collection in Firestore for the chat messages, ordered by creation date
		const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
		// Subscribe to changes to the 'messages' collection in Firestore
		const unsubMessages = onSnapshot(q, (docs) => {
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
			setMessages(newMessages);
		});
		// Unsubscribe from the 'messages' collection when the component unmounts
		return () => {
			if (unsubMessages) unsubMessages();
		};
	}, []);

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				onSend={onSend}
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
