import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListBooksComponent from './components/ListBooksComponent';

function App() {
  return (
    <div>
      <HeaderComponent/>
      <div className='container'>
      <ListBooksComponent/>
      </div>
      <FooterComponent/>
    </div>
  );
}

export default App;
