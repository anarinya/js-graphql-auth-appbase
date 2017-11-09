import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { currentUser } from '../../queries';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      const { history, data: { user, loading } } = nextProps;
      // if the user doesn't exist, redirect them back to login
      if (!user && !loading) {
        history.replace({ pathname: '/login' });
      }
    }

    render() {
      return <WrappedComponent { ...this.props } />;
    }
  }

  return graphql(currentUser)(withRouter(RequireAuth));
}