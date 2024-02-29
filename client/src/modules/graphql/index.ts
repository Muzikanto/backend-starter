import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NEXT_DATA } from 'next/dist/shared/lib/utils';
import { APP_BACKEND_URL } from '../../config/config';

let cachedClient: ApolloClient<object>;
const isServer = typeof window === 'undefined';
const windowApolloState =
  !isServer && (window.__NEXT_DATA__ as NEXT_DATA & { apolloState: NormalizedCacheObject }).apolloState;

function createApolloClient(forceNew = false) {
  if (cachedClient && !forceNew) {
    return cachedClient;
  }

  const httpLink = createHttpLink({
    uri: `${APP_BACKEND_URL}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : undefined;
    // return the headers to the context so httpLink can read them

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(windowApolloState || {}),
  });

  cachedClient = apolloClient;

  return apolloClient;
}

export default createApolloClient;
