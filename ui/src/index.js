import React from 'react';
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({
    uri: "https://us1.prisma.sh/wecottam-131939/api/dev"
});

client
    .query({
        query: gql`
      {
        users {
          name
          email
            about
        }
      }
    `
    })
    .then(result => console.log(result));

const Users = () => (
    <Query
        query={gql`
      {
        users {
          name
          email
          about
          }
        }
    `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.users.map(({Users, name, email, about}) => (
                <div key={{name}}>
                    <p>Name: {`${name}`}: Email: {`${email}`}, About: {`${about}`}</p>
                </div>
            ));
        }}
    </Query>
);

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h1> <span role="img" aria-label="emoji">🚀🚀🚀</span>
                Building my first prisma app using graphQL!!!<span role="img" aria-label="emoji">😭
                </span></h1>
            <h2><span role="img" aria-label="emoji">😎😎😎</span></h2>
            <Users />
        </div>
    </ApolloProvider>
);

render(<App />, document.getElementById("root"));