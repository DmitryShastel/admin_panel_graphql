import {ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://inctagram.work/api/v1/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu'
    }
})

export default client;
