import React from 'react'

const AddUser = () => {
  return (
    <div>AddUser</div>
  )
}

export default AddUser

// const addUser = (user) => {
//     setLoading(true);
//     axios
//       .post("/users", { ...user })
//       .then((res) => {
//         setUsers([...users, res.data]);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   };
  
//   const deleteUser = (id) => {
//     setLoading(true);
//     axios
//       .delete(`/users/${id}`)
//       .then(() => {
//         setUsers(users.filter((user) => user.id !== id));
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   };
  
//   const updateUser = (id, updatedUser) => {
//     setLoading(true);
//     axios
//       .put(`/users/${id}`, {
//         ...updatedUser,
//       })
//       .then((res) => {
//         setUsers(
//           users.map((user) => (user.id === id ? res.data : user))
//         );
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   };