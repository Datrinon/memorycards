import '../../css/App.css';

import StateManager from './StateManager';
import Footer from './Footer';

import React from 'react';



function App() {
  return (
    <React.Fragment>
      <main className="App content">
        <StateManager />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
