import gql from 'graphql-tag';

// Returns information on the current user
// If no user is currently logged in, returns null
export default gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;