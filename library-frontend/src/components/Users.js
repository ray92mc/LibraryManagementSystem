import { useState, useEffect } from "react";
import axios from "../api/axios";

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
      .post("users", { ...user })
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
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

export default UserTable;