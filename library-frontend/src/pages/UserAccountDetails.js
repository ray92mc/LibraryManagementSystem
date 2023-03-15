import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { Card, Col, Row } from "react-bootstrap";
import AuthContext from "../context/AuthProvider";
import formatDate from "../components/formatDate";

const UserAccountDetails = () => {

  const [user, setUser] = useState({});
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/id/${id}`)
      .then((res) => {
        setUser(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/reservations/userId/${id}`)
      .then((res) => {
        setReservations(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className='container-xxl'>
      <h1 className='m-5'>Account Details</h1>
      <Row className="align-items-stretch">
        <Col className='mb-5'>
          <Card>
            <Card.Body>
              <Card.Title>User Details</Card.Title>
              <Card.Text>
                <div className='mb-4 mt-4'>
                <p>Account ID: {user?.id}</p>
                <p>First Name: {user?.firstname}</p>
                <p>Last Name: {user?.lastname}</p>
                <p>Email: {user?.email}</p>
                <p>Role: {user?.role}</p>
                <p>Fine: €{user?.fine}</p>
                <p>Enabled: {user?.enabled ? 'Yes' : 'No'}</p>
                <p>Account Non-Expired: {user?.accountNonExpired ? 'Yes' : 'No'}</p>
                <p>Credentials Non-Expired: {user?.credentialsNonExpired ? 'Yes' : 'No'}</p>
                <p>Account Non-Locked: {user?.accountNonLocked ? 'Yes' : 'No'}</p>
                </div>
              </Card.Text>
              <button onClick={() => alert()}>Edit Details</button>
              <button onClick={() => alert()}>Pay Fine</button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className='mb-5'>
          <Card>
            <Card.Body>
              <Card.Title>Reservations</Card.Title>
              <Card.Text>
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
              <td>ID: {reservation.id}</td>
              <td>{reservation.user.email}</td>
              <td>{formatDate(reservation.reservedAt)}</td>
              <td>{formatDate(reservation.pickUpBy)}</td>
              <td>{formatDate(reservation.checkedOutAt)}</td>
              <td>{formatDate(reservation.dueDate)}</td>
              <td>{reservation.returned ? "Yes" : "No"}</td>           
              <td>
              <button>Cancel</button>
              </td>
              </tr>
              ))}
              </tbody>
              </table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default UserAccountDetails