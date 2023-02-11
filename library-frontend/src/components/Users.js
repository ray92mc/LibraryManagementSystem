import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const USERS_URL = "/api/v1/users";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(USERS_URL)
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
      .post(USERS_URL, { ...user })
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
      .delete(USERS_URL)
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
      .put(`/api/v1/users/${id}`, {
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => updateUser(user.id)}>Edit</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
</tr>
))}
</tbody>
</table>
)}
<button onClick={() => addUser({})}>Add User</button>
</div>
);
}

export default Users;