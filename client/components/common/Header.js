import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { currentUser } from '../../queries';
import { logoutUser } from '../../mutations';

class Header extends Component {
  onLogoutClick = () => {
    this.props.mutate({
      refetchQueries: [{ query: currentUser }]
    });
  }

  renderButtons = () => {
    const { loading, user } = this.props.data;
    // Show nothing while the data is still loading
    if (loading) return <div />;
    // If user is authenticated
    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick}>Log Out</a>
        </li>
      );
    }
    // If user isn't authenticated
    return (
      <div>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </div>
    );
  }

  render() {
    return (
      <nav className="light-blue accent-4">
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left">Home</Link>
            <ul className="right">
              {this.renderButtons()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default compose(
  graphql(logoutUser),
  graphql(currentUser)
)(Header);
