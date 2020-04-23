import gql from 'graphql-tag';

export const Questions = gql`
	query AllQuestions {
		questions @rest(type: "Questions", path: "getQuestions") {
			BunionSurgery @type(name:"bunion") {
				question
				category
				answers
			}
			DigitalSurgery @type(name: "digital") {
				question
				category
				answers
			}
		}
	}
`;
