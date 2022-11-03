import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListBooksComponent from './components/ListBooksComponent';

function App() {
  return (
    <div>
      <Router>
        
          <HeaderComponent/>
            <div className="container">
              <Routes> 
                <Route exact path= "/" element = {<ListBooksComponent/>}/>
                <Route exact path= "/books" element = {<ListBooksComponent/>}/>
              </Routes>
            </div>
          <FooterComponent/>
        
      </Router>
    </div>
  );
}

export default App;
