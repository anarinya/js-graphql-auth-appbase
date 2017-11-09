import React, { Component } from 'react';

class AuthForm extends Component {

  state = {
    email: '',
    password: ''
  };

  // On form submission, call from onSubmit and pass in form values
  handleSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();

    this.props.onSubmit({ email, password });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="row">
        <form onSubmit={this.handleSubmit} className="col s6">
          <div className="input-field">
            <input 
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-field">
            <input 
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password" 
            />
          </div>

          { errors.map((error) => <div className="red-text" key={error}>{error}</div>) }
          <br />
          <button className="btn indigo darken-4">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;