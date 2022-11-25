import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListBooksComponent from './components/ListBooksComponent';
import AddBooksComponent from './components/AddBooksComponent';
import LoginComponent from './components/LoginComponent';
import { useLocalState } from './util/useLocalStorage';

function App() {

  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    if(!jwt){
    const reqBody = {
      "username": "ray",
      "password": "asdfasdf"
    }
  
    fetch('auth/login', {
      headers: {
        "Content-Type":"application/json"
      }, 
      method:"post",
      body: JSON.stringify(reqBody)
    })
    .then((response)=>Promise.all([response.json(), response.headers]))
    .then(([body, headers]) => {
      setJwt(headers.get("authorization"));
    });
    }
  });

  useEffect(()=> {
    console.log(`${jwt}`)
  }, [jwt]);

  return (
    <div>
      <Router>
          <HeaderComponent/>
            <div className="container">
              <Routes> 
                <Route exact path= "/" element = {<LoginComponent/>} />
                <Route exact path= "/books" element = {<ListBooksComponent/>}/>
                <Route exact path= "/books/add" element = {<AddBooksComponent/>}/>
                <Route exact path= "/login" element = {<LoginComponent/>}/>
              </Routes>
            </div>
          <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
