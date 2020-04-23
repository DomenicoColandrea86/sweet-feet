import React, { Fragment, useState, useEffect } from 'react';
import {
	ScrollView,
	StatusBar,
	ActivityIndicator,
	StyleSheet,
	View,
} from 'react-native';
import { client } from '../graphql/Client';
import { Questions } from '../graphql/Queries';
import { RowItem } from '../components/RowItem';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 50,
	},
});

const colors = ['#36b1f0', '#799496'];

const Quizzes = ({ questions, navigation, loading }) => (
	<Fragment>
		{!loading ? (
			Object.keys(questions).map(
				(t, k) =>
					t !== '__typename' && (
						<RowItem
							key={k}
							name={questions[t][k]?.category}
							color={colors[k]}
							onPress={() => {
								navigation.navigate('Quiz', {
									title: questions[t][k]?.category,
									questions: questions[t],
									color: colors[k],
								});
							}}
						/>
					)
			)
		) : (
			<View style={[styles.container, styles.horizontal]}>
				<ActivityIndicator size="large" />
			</View>
		)}
	</Fragment>
);

export default ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState({
		BunionSurgery: [],
		DigitalSurgery: [],
	});

	useEffect(() => {
		let isCancelled = false;
		const requestQuestions = async () => {
			setLoading(true);
			try {
				if (!isCancelled) {
					let { data } = await client.query({ query: Questions });
					setQuestions(data.questions);
					setLoading(false);
				}
			} catch (err) {
				if (!isCancelled) {
					setLoading(false);
					throw new Error(err);
				}
			}
		};
		requestQuestions();
		return () => {
			// cleanup
			isCancelled = true;
		};
	}, [questions]);

	return (
		<ScrollView>
			<StatusBar barStyle="dark-content" />
			<Quizzes
				loading={loading}
				questions={questions}
				navigation={navigation}
			/>
		</ScrollView>
	);
};
