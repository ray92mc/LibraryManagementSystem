import { React, useState, useEffect } from "react";
import axios from "../api/axios";
import { LocalDateTime, DateTimeFormatter } from 'js-joda';

const Reservations = () => {

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

const deleteReservation = (id) => {
setLoading(true);
axios
    .delete(`/reservations/${id}`)
    .then(() => {
    setReservations(reservations.filter((reservation) => reservation.id !== id));
    setLoading(false);
    })
    .catch((err) => {
    console.error(err);
    setLoading(false);
    });
};

const updateReservation = (id, updatedReservation) => {
setLoading(true);
axios
    .put(`/reservations/${id}`, {
    ...updatedReservation,
    })
    .then((res) => {
    setReservations(
        reservations.map((reservation) => (reservation.id === id ? res.data : reservation))
    );
    setLoading(false);
    })
    .catch((err) => {
    console.error(err);
    setLoading(false);
    });
};

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const formatDate = (date) => {
    return date ? date.toLocaleString('en-US', options) : "not set";
}
  

  return (
    <div className="container-xxl mt-2">
      {loading ? (
      <p>Loading...</p>
      ) : (
      <table>
        <thead>
          <tr>
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
            <td>{reservation.user.email}</td>
            <td>{formatDate(reservation.reservedAt)}</td>
            <td>{formatDate(reservation.pickUpBy)}</td>
            <td>{formatDate(reservation.checkOutAt)}</td>
            <td>{formatDate(reservation.dueDate)}</td>
            <td>{formatDate(reservation.returned)}</td>           
            <td>
              <button onClick={() => updateReservation(reservation.id)}>Edit</button>
              <button onClick={() => deleteReservation(reservation.id)}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      )
      }
      <button className="mb-5" onClick={() => addReservation({})}>Add Reservation</button>
    </div>
    );
  }

export default Reservations;