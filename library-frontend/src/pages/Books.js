import { React, useState, useEffect } from "react";
import axios from "../api/axios";

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
  
  const reserveBook = (id, updatedBook) => {
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
            <button
              onClick={() => reserveBook(book.id)}
              disabled={book.quantityAvailable < 1}
              className={book.quantityAvailable < 1 ? "btn btn-secondary" : "button"}
            >
              Reserve
            </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      )
      }
    </div>
    );
  }

export default Books;