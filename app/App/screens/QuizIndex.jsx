import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { client } from '../graphql/Client';
import { Questions } from '../graphql/Queries';
import { RowItem } from '../components/RowItem';

export default ({ navigation }) => {
	const [questions, setQuestions] = useState({
		BunionSurgery: [],
		DigitalSurgery: [],
	});

	useEffect(() => {
		requestQuestions();
	}, []);

	const requestQuestions = async () => {
		try {
			let { data } = await client.query({ query: Questions });
			setQuestions(data.questions);
		} catch (err) {
			throw new Error(err);
		}
	};

	return (
		<ScrollView>
			<StatusBar barStyle="dark-content" />
			<RowItem
				name="Bunion Surgery"
				color="#36b1f0"
				onPress={() => {
					navigation.navigate('Quiz', {
						title: 'Bunion Surgery',
						questions: questions.BunionSurgery,
						color: '#36b1f0',
					});
				}}
			/>
			<RowItem
				name="Digital Surgery"
				color="#799496"
				onPress={() =>
					navigation.navigate('Quiz', {
						title: 'Digital Surgery',
						questions: questions.DigitalSurgery,
						color: '#799496',
					})
				}
			/>
		</ScrollView>
	);
};
