import { React, useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Books = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
      <div><h2>Admin Books</h2><p style={{ color: 'red' }}>To-do: Pagination, Sorting</p></div>
      <div className="table-responsive">
      { books.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Quantity Av.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
          <tr key={book?.id}>
            <td>{book?.id}</td>
            <td>{book?.title}</td>
            <td>{book?.author}</td>
            <td>{book?.genre}</td>
            <td>{book?.rating}/5</td>
            <td>{book?.quantityAvailable}</td>
            <td>
            { book.quantityAvailable > 0 ? (
            <Link to={`/reserve-book/${book?.id}`}><button>Reserve</button></Link>) : <button
            disabled={book.quantityAvailable < 1}
            className={book.quantityAvailable < 1 ? "btn btn-secondary" : "button"}
          >
            {book.quantityAvailable<1 ? "Out of Stock": "Reserve"}
            </button>
            }
            <Link to={`/edit-book/${book?.id}`}><button>Manage</button></Link>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      ) : <h1 className="py-5">No books found...</h1>
      }
      </div>
      </>
      )
      }
      <Link to="/add-book"><button className="mb-5">Add Book</button></Link>
    </div>
    );
  }

export default Books;