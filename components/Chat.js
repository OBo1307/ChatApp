import React, { useLayoutEffect, useState } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import {
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { useEffect } from 'react';

const Chat = ({ route, navigation }) => {
	// Get the `name` prop from the `route` object
	const { name } = route.params;

	// Initialize the `messages` state with an empty array
	const [messages, setMessages] = useState([]);

	// Function to append new messages to the `messages` state
	const onSend = (newMessages) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, newMessages)
		);
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
		setMessages([
			{
				_id: 1,
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
			{
				_id: 2,
				text: 'This is a system message',
				createdAt: new Date(),
				system: true,
			},
		]);
	}, []);

	// Set the title of the chat screen using the `useLayoutEffect` hook
	useLayoutEffect(() => {
		navigation.setOptions({
			title: name,
		});
	}, [navigation, name]);

	return (
		<View style={styles.container}>
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				onSend={(newMessages) => onSend(newMessages)}
				user={{
					_id: 1,
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
