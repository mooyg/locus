import { Login } from '@Components/Login/Login';
import { GetServerSidePropsResult } from 'next';
import { wrapper } from '@redux/store';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { GET_USER } from '@graphql/queries';
import { setUser } from '@redux/features/user/userSlice';
const LoginIndex = () => {
  return (
    <>
      <Login />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      console.log('GET SERVER SIDE PROPS');
      const ssrCache = ssrExchange({ isClient: false });
      const client = initUrqlClient(
        {
          url: process.env.NODE_ENV
            ? `${process.env.SERVER_URL}/graphql`
            : 'http://localhost:4000/graphql',
          exchanges: [
            dedupExchange,
            cacheExchange,
            ssrCache,
            fetchExchange,
            devtoolsExchange,
          ],
          fetchOptions: () => {
            return {
              headers: {
                cookie: req.headers.cookie ? req.headers.cookie : '',
              },
            };
          },
        },
        false
      );
      const data = await client?.query(GET_USER).toPromise();
      console.log(data);

      store.dispatch(setUser(data?.data.getUser));
      return {
        props: {
          urqlState: ssrCache.extractData(),
        },
      };
    }
);
export default withUrqlClient(
  (_ssr) => ({
    url: process.env.NODE_ENV
      ? `${process.env.SERVER_URL}/graphql`
      : 'http://localhost:4000/graphql',
  }),
  { ssr: false } // Important so we don't wrap our component in getInitialProps
)(LoginIndex);
