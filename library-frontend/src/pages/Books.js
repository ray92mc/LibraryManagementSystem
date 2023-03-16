import { React, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { BsSearch } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart  } from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Books = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn, id } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get("/books")
    .then((res) => {
      setBooks(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, []);
  
  const search = async () => {
    try {
      const response = await axios.get(`/books/search/${searchQuery}`);
      const data = response.data;
      setBooks(data);
    } catch (error) {
      console.error(error);
      setBooks([]);
    }
  };

  const reserveBook = async (bookId) => {
    setLoading(true)
    try{
      const response = await axios.post('/reservations', {
        userId: id,
        bookId,
      });
      console.log(response);
      alert("Book reserved")
      setLoading(false);
    }catch (err){
      console.error(err);
      setLoading(false);
    }
  };

  const addFavourite = async (bookId) => {
    setLoading(true)
    try{
      const response = await axios.put('/users/add-to-favourites', {
        userId: id,
        bookId,
      });
      console.log(response);
      alert("Book added to favourites")
      setLoading(false);
      navigate('/favourites');
    }catch (err){
      console.error(err);
      alert(err);
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl mt-2">
      {loading ? (
      <p>Loading...</p>
      ) : (
<>
        <div className="container py-5 input-group">
        <input 
            type="text"
            className="form-control py-2"
            placeholder="Search books by title, author or category..."
            aria-label="Search reservations by title, author or category"
            aria-describedby="basic-addon2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="admin-search p-3">
            <BsSearch className='fs-5' onClick={search}/>
        </span>
      </div>
      <div><h2>All Books</h2><p style={{ color: 'red' }}>To-do: Pagination, Sorting</p></div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>{book.rating}/5</td>
            <td>
            { isLoggedIn ? (
            <button
              onClick={() => reserveBook(book.id)}
              disabled={book.quantityAvailable < 1}
              className={book.quantityAvailable < 1 ? "btn btn-secondary" : "button"}
            >
              {book.quantityAvailable<1 ? "Out of Stock": "Reserve"}
            </button> ) : ( <Link to="/login"><button
              disabled={book.quantityAvailable < 1}
              className={book.quantityAvailable < 1 ? "btn btn-secondary" : "button"}
            >
              {book.quantityAvailable<1 ? "Out of Stock": "Reserve"}
            </button></Link> )
            }
            { isLoggedIn ? (
            <button onClick={() => addFavourite(book.id)}>
              <FontAwesomeIcon icon={faHeart} />
            </button> ) : (" ")
            }
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      </>
      )
      }
    </div>
    );
  }

export default Books;