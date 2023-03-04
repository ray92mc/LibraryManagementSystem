import { React, useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Books = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const addBook = (book) => {
    setLoading(true);
    axios
      .post("/books", { ...book })
      .then((res) => {
        setBooks([...books, res.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  
  
  
  const updateBook = (id, updatedBook) => {
    setLoading(true);
    axios
      .put(`/books/${id}`, {
        ...updatedBook,
      })
      .then((res) => {
        setBooks(
          books.map((book) => (book.id === id ? res.data : book))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="container-xxl mt-2">
      {loading ? (
      <p>Loading...</p>
      ) : (
      <>
      <div className="container py-5 input-group">
        <input type="text" 
        className="form-control py-2" 
        placeholder="Search books by title, author or category..." 
        aria-label="Search reservations by title, author or category" 
        aria-describedby="basic-addon2"
        />
        <span className="input-group-text p-3" id="basic-addon2">
            <BsSearch className='fs-5'/>
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
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
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>{book.rating}/5</td>
            <td>
            <Link to={`/edit-book/${book.id}`}><button>Manage</button></Link>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      </>
      )
      }
      <button className="mb-5" onClick={() => addBook({})}>Add Book</button>
    </div>
    );
  }

export default Books;