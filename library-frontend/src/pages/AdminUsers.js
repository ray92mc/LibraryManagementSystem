import { useState, useEffect } from "react";
import axios from "../api/axios";
import { BsSearch } from "react-icons/bs";

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

const addUser = (user) => {
  setLoading(true);
  axios
    .post("/users", { ...user })
    .then((res) => {
      setUsers([...users, res.data]);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
};

const deleteUser = (id) => {
  setLoading(true);
  axios
    .delete(`/users/${id}`)
    .then(() => {
      setUsers(users.filter((user) => user.id !== id));
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
};

const updateUser = (id, updatedUser) => {
  setLoading(true);
  axios
    .put(`/users/${id}`, {
      ...updatedUser,
    })
    .then((res) => {
      setUsers(
        users.map((user) => (user.id === id ? res.data : user))
      );
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
};

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
            <button onClick={() => updateUser(user.id)}>Manage</button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    </>
    )
    }
    <button className="mb-5" onClick={() => addUser({})}>Add User</button>
  </div>
  );
}

export default UserTable;