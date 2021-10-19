import '../../css/App.css';

import Header from './Header';
import GameManager from './Game';
import Footer from './Footer';

import React from 'react';



function App() {
  return (
    <React.Fragment>
      <main className="App content">
        <Header />
        <GameManager />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
