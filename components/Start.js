import { useState } from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	Text,
	TouchableOpacity,
	ImageBackground,
	KeyboardAvoidingView,
} from 'react-native';

const Start = ({ navigation }) => {
	// Initialize the `name` and `backgroundColor` states with empty strings
	const [name, setName] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('');

	// Function to navigate to the `Chat` screen and pass `name` and `backgroundColor` as parameters
	const onPress = () => navigation.navigate('Chat', { name, backgroundColor });

	// Function to set the `backgroundColor` state to the selected color
	const handleColorPress = (color) => {
		setBackgroundColor(color);
	};

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				source={require('../assets/backgroundImage.png')}
				resizeMode='cover'
				style={styles.image}
			>
				<Text style={styles.title}>Chat App!</Text>

				<View style={styles.box}>
					<TextInput
						style={[styles.input, styles.text]}
						onChangeText={setName}
						value={name}
						placeholder='Your Name'
					/>

					<View>
						<Text style={styles.text}>Choose Background Color:</Text>
						<View style={[styles.colors, styles.colorsBox]}>
							<TouchableOpacity
								style={{
									backgroundColor: '#090C08',
									borderRadius: 25,
									width: 50,
									height: 50,
									marginRight: 20,
								}}
								onPress={() => handleColorPress('#090C08')}
							/>
							<TouchableOpacity
								style={{
									backgroundColor: '#474056',
									borderRadius: 25,
									width: 50,
									height: 50,
									marginRight: 20,
								}}
								onPress={() => handleColorPress('#474056')}
							/>
							<TouchableOpacity
								style={{
									backgroundColor: '#8A95A5',
									borderRadius: 25,
									width: 50,
									height: 50,
									marginRight: 20,
								}}
								onPress={() => handleColorPress('#8A95A5')}
							/>
							<TouchableOpacity
								style={{
									backgroundColor: '#B9C6AE',
									borderRadius: 25,
									width: 50,
									height: 50,
									marginRight: 20,
								}}
								onPress={() => handleColorPress('#B9C6AE')}
							/>
						</View>
					</View>

					<TouchableOpacity style={styles.button} onPress={onPress}>
						<Text style={styles.buttonText}>Start Chatting</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
			{/* Render the `KeyboardAvoidingView` component on iOS devices to adjust the layout when the keyboard is shown */}
			{Platform.OS === 'ios' ? (
				<KeyboardAvoidingView behavior='padding' />
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	nameInput: {
		fontSize: 16,
		fontWeight: '300',
		color: '#757083',
		opacity: 50,
	},

	image: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		resizeMode: 'cover',
	},

	title: {
		fontSize: 45,
		fontWeight: '600',
		color: '#fff',
	},

	text: {
		color: '#757083',
		fontSize: 18,
		fontWeight: '300',
		textAlign: 'center',
	},

	colors: {
		flexDirection: 'row',
	},

	box: {
		backgroundColor: '#fff',
		width: '88%',
		alignItems: 'center',
		height: '44%',
		justifyContent: 'space-evenly',
	},

	colorSelected: {
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: '#5f5f5f',
	},

	input: {
		height: 50,
		width: '88%',
		borderColor: 'gray',
		color: '#757083',
		borderWidth: 2,
		borderRadius: 20,
	},

	button: {
		height: 50,
		width: '50%',
		backgroundColor: '#757083',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
	},

	buttonText: {
		padding: 10,
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},

	colorsBox: {
		marginTop: 20,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Start;
