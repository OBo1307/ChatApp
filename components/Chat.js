import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
	const { name, backgroundColor } = route.params;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: name,
		});
	}, [navigation, name]);

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Text style={styles.text}>Hello, {name}!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
	},
});

export default Chat;
