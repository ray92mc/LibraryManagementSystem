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
  
  const deleteBook = (id) => {
    setLoading(true);
    axios
      .delete(`/books/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
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
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Popularity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>5</td>
            <td>
              <button onClick={() => updateBook(book.id)}>Edit</button>
              <button onClick={() => deleteBook(book.id)}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      )
      }
      <button className="mb-5" onClick={() => addBook({})}>Add Book</button>
    </div>
    );
  }

export default Books;