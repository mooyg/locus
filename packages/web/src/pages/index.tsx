import { GET_USER } from '@graphql/queries';
import { devtoolsExchange } from '@urql/devtools';
import { GetServerSidePropsResult } from 'next';
import { initUrqlClient, withUrqlClient } from 'next-urql';
import { setUser } from '@redux/features/user/userSlice';
import { wrapper } from '@redux/store';
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql';
import { Navbar } from '@Components/Navbar/Navbar';

const Index = () => {
  return (
    <>
      <div className="font-semibold bg-gray-900 h-screen text-textPrimary">
        <Navbar />
      </div>
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
      if (!data?.data.getUser) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
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
)(Index);
