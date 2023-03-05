import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import formatDate from '../components/formatDate';
import { Link } from 'react-router-dom';

const OverdueBooks = () => {

  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get('/reservations/overdue-checkins')
      .then((res) => {
        setReservations(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <h2 className='m-5'>Overdue Returns</h2>
    <div className='m-5'>
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
          {reservations && reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.user.email}</td>
              <td>{formatDate(reservation.reservedAt)}</td>
              <td>{formatDate(reservation.pickUpBy)}</td>
              <td>{formatDate(reservation.checkedOutAt)}</td>
              <td>{formatDate(reservation.dueDate)}</td>
              <td>{reservation.returned ? "Yes" : "No"}</td>
              <td>
                <Link to={`/edit-reservation/${reservation.id}`}>
                  <button>Manage</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='m-5'>Purge non pick-ups</button>
    </div>
    </>
  );
};

export default OverdueBooks;
