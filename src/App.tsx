import React from 'react';
import GlobalStyle from './components/GlobalStyle';
import Main from './pages/Main';

const App: React.FC = () => (
  <div className="App">
    <GlobalStyle/>
    <Main/>
  </div>
);

export default App;
