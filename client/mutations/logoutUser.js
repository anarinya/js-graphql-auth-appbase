import gql from 'graphql-tag';

// Returns information on the current user
// If no user is currently logged in, returns null
export default gql`
  mutation {
    logout {
      id
      email
    }
  }
`;