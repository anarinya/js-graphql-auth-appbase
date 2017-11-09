import React from 'react';
import { Header } from './';

const App = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">
        { children }
      </div>
    </div>
  );
};

export default App;