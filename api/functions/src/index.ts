'use strict';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export enum CategoryIds {
	'Bunion Surgery' = 1,
	'Digital Surgery' = 2
}

export interface IAnswer {
	id: number;
	text: string;
	correct: boolean;
}

export interface IQuestion {
	question: string;
	answers: IAnswer[];
}

export class Question {
	public question: string;
	public answers: IAnswer[];
	public category: string;
	constructor(q: any) {
		this.question = q.title;
		this.category = CategoryIds[q.category];
		this.answers = q.options.map((item: any, i:number): IAnswer => ({
			id: i + 1,
			text: item,
			correct: q.answer === i
		}));
	}
}

export interface IQuestionsResponse {
	[key:string]: IQuestion[];
}

// Initialize
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const groupBy = (array: IQuestion[], key: string): IQuestionsResponse => {
	const noSpaces = (str: string) => str.replace(/\s/g, '');
	return array.reduce((result: IQuestionsResponse, currentValue: IQuestion) => {
		(result[noSpaces((currentValue as any)[key])] = result[noSpaces((currentValue as any)[key])] || []).push(
			currentValue
		);
		return result;
	}, <IQuestionsResponse>{});
};

/**
 * Get Questions
 * https://us-central1-sweetfeet-a76e4.cloudfunctions.net/getQuestions
 */
export const getQuestions = functions.https.onRequest(async (request: any, response: any) => {
    try {
        const q = await db.collection('questions').get();
		const questions: IQuestion[] = q.docs.map(doc => new Question(doc.data()));
		const result: IQuestionsResponse = groupBy(questions, 'category');
		response.status(200).send(result);
    }
    catch (error) {
        // Handle the error
        console.log(error)
        response.status(500).send(error)
    }
});
