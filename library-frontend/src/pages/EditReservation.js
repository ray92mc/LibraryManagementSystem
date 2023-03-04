import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';

const EditReservation = () => {

    const [reservation, setReservation] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    
    useEffect(() => {
        setLoading(true);
        axios
          .get(`/reservations/${id}`)
          .then((res) => {
            setReservation(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      }, [id]);

      const formatDate = (date) => {
    
        if(date){
            const newDate = new Date(date[0], date[1], date[2], date[3], date[4]);
            const formattedDate = newDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });
    
          return formattedDate;
    
        }
        
        return "Null";
    }

    if (loading) {
        return <p>Loading...</p>;
    }

  return (
    <>
    <div className='container-xxl'>
      <h2 className='m-5'>Reservation #{reservation.id}</h2>
      <Row className="align-items-stretch">
        <Col className='mb-5'>
          <Card>
            <Card.Body>
              <Card.Title>Book Details</Card.Title>
              <Card.Text>
                <p>Title: {reservation?.book?.title}</p>
                <p>Author: {reservation?.book?.author}</p>
                <p>Genre: {reservation?.book?.genre}</p>
                <p>Publication Year: {reservation?.book?.publicationYear}</p>
                <p>Quantity Available: {reservation?.book?.quantityAvailable}</p>
                <p>Rating: {reservation?.book?.rating}</p>
                <p>Rating Count: {reservation?.book?.ratingCount}</p>
                <p>Rating Total: {reservation?.book?.ratingTotal}</p>
                <p>ISBN: {reservation?.book?.isbn || 'N/A'}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-5'>
          <Card>
            <Card.Body>
              <Card.Title>User Details</Card.Title>
              <Card.Text>
                <p>First Name: {reservation?.user?.firstname}</p>
                <p>Last Name: {reservation?.user?.lastname}</p>
                <p>Email: {reservation?.user?.email}</p>
                <p>Role: {reservation?.user?.role}</p>
                <p>Fine: €{reservation?.user?.fine}</p>
                <p>Enabled: {reservation?.user?.enabled ? 'Yes' : 'No'}</p>
                <p>Account Non-Expired: {reservation?.user?.accountNonExpired ? 'Yes' : 'No'}</p>
                <p>Credentials Non-Expired: {reservation?.user?.credentialsNonExpired ? 'Yes' : 'No'}</p>
                <p>Account Non-Locked: {reservation?.user?.accountNonLocked ? 'Yes' : 'No'}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className='mb-5'>
            <Card.Body>
              <Card.Title>Reservation Details</Card.Title>
              
              
              <Card.Text>
                <p>Reserved At: {formatDate(reservation?.reservedAt)}</p>
                <p>Pick Up By: {formatDate(reservation?.pickUpBy)}</p>
                <p>Checked Out At: {reservation?.checkedOutAt ? formatDate(reservation?.checkedOutAt) : 'N/A'}</p>
                <p>Due Date: {formatDate(reservation?.dueDate)}</p>
                <p>Returned: {reservation.checkedOut? (reservation?.returned ? 'Yes' : 'No') : 'N/A'}</p>
              </Card.Text>
              
                <button>Extend</button>
                <button>Cancel</button>
                <button>Checkin</button>
                <button>Checkout</button>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    <div className="btn-container">
    <Row>
        
      </Row>
    </div>
    </>
  );
};


export default EditReservation

