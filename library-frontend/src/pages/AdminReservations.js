import { React, useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const AdminReservations = () => {

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
setLoading(true);
axios.get("/reservations")
.then((res) => {
    setReservations(res.data);
    setLoading(false);
})
.catch((err) => {
    console.error(err);
    setLoading(false);
});
}, []);

const addReservation = (reservation) => {
setLoading(true);
axios
    .post("/reservations", { ...reservation })
    .then((res) => {
    setReservations([...reservations, res.data]);
    setLoading(false);
    })
    .catch((err) => {
    console.error(err);
    setLoading(false);
    });
};
  
const formatDate = (date) => {
    
    if(date){
        const newDate = new Date(date[0], date[1], date[2], date[3], date[4]);
        const formattedDate = newDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

      return formattedDate;

    }
    
    return "Null";
}

return (
<div className="container-xxl mt-2">
    {loading ? (
    <p>Loading...</p>
    ) : (
    <>
    <div className="container py-5 input-group">
        <input type="text" 
        className="form-control py-2" 
        placeholder="Search reservations by ID..." 
        aria-label="Search reservations by ID" 
        aria-describedby="basic-addon2"
        />
        <span className="input-group-text p-3" id="basic-addon2">
            <BsSearch className='fs-5'/>
        </span>
    </div>
    <div>
    <table>
    <thead>
        <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Reserved At</th>
        <th>Pick Up By</th>
        <th>Checked Out At</th>
        <th>Due Date</th>
        <th>Returned</th>
        <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {reservations.map((reservation) => (
        <tr key={reservation.id}>
        <td>{reservation.id}</td>
        <td>{reservation.user.email}</td>
        <td>{formatDate(reservation.reservedAt)}</td>
        <td>{formatDate(reservation.pickUpBy)}</td>
        <td>{formatDate(reservation.checkedOutAt)}</td>
        <td>{formatDate(reservation.dueDate)}</td>
        <td>{reservation.returned ? "Yes" : "No"}</td>           
        <td>
        <Link to={`/edit-reservation/${reservation.id}`}><button>Manage</button></Link>
        </td>
        </tr>
        ))}
    </tbody>
    </table>
    </div>
    </>
    )
    }
    <Link to="/admin-books">
    <button className="mb-5">Add Reservation</button>
    </Link>
    </div>
);
}

export default AdminReservations;