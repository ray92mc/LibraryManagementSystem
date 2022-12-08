import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './services/store';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';
import ListBooksComponent from './components/ListBooksComponent';
import AddBooksComponent from './components/AddBooksComponent';
import LoginComponent from './components/LoginComponent';
import HomepageComponent from './components/HomepageComponent';

function App() {

  return (
    <div>
      <Router>
          <Provider store={store}><NavBarComponent/></Provider>
            <div className="container">
              <Routes> 
                <Route exact path= "/" element = {<HomepageComponent/>} />
                <Route exact path= "/books" element = {<ListBooksComponent/>}/>
                <Route exact path= "/books/add" element = {<AddBooksComponent/>}/>
                <Route exact path= "/login" element = {<Provider store={store}><LoginComponent/></Provider>}/>
                <Route exact path= "/logout" element = {<Provider store={store}><LoginComponent/></Provider>}/>
              </Routes>
            </div>
          <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
