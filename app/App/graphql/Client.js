import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({
	uri: 'https://us-central1-sweetfeet-a76e4.cloudfunctions.net/',
	headers: {
		Authorization: '47e036d83ccc4058b1f85362bc2be1f4',
	},
});

export const client = new ApolloClient({
	link: restLink,
	cache: new InMemoryCache(),
});
