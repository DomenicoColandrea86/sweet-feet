import gql from 'graphql-tag';

export const Questions = gql`
	query AllQuestions {
		questions @rest(type: "QuestionsPayload", path: "getQuestions") {
			BunionSurgery @type(name: "BunionSurgery") {
				question
				category
				answers
			}
			DigitalSurgery @type(name: "DigitalSurgery") {
				question
				category
				answers
			}
		}
	}
`;
