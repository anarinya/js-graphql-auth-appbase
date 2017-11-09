import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { AuthForm } from './';
import { loginUser } from '../../mutations';
import { currentUser } from '../../queries';

class LoginForm extends Component {

  state = {
    errors: []
  };

  componentWillUpdate(nextProps) {
    const { history } = this.props;

    if (nextProps.data.user && !this.props.data.user) {
      history.replace({ pathname: '/dashboard'});
    }
  }

  handleSubmit = ({ email, password }) => {
    this.props.mutate({ 
      variables: { email, password },
      refetchQueries: [{ query: currentUser }]
    }).catch(({ graphQLErrors }) => {
      const errors = graphQLErrors.map(err => err.message);
      this.setState({ errors });
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h5>Log In</h5>
        <AuthForm errors={errors} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default compose(
  graphql(loginUser),
  graphql(currentUser)
)(LoginForm);