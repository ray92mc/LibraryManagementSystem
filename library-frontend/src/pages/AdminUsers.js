import { useState, useEffect } from "react";
import axios from "../api/axios";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  axios
    .get("/users")
    .then((res) => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);



return (
  <div className="container mt-2">
    {loading ? (
    <p>Loading...</p>
    ) : (
    <>
    <div className="container py-5 input-group">
        <input type="text" 
        className="form-control py-2" 
        placeholder="Search users by ID..." 
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
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>Balance Owed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.email}</td>
          <td>€{user.fine}</td>
          <td>
            <button onClick={() => alert(user.id)}>Manage</button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    <Link to={`/add-user`}><button className="mb-5">Add User</button></Link>
    </>
    
    )
    }
    
  </div>
  );
}

export default UserTable;