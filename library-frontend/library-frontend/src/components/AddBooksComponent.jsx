import React, { Component } from 'react';
import {Card, Form, Button, Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare} from '@fortawesome/free-solid-svg-icons';

class AddBooksComponent extends Component {

    constructor(props){
        super(props);
        this.state= {title:"", author:"", isbn:""};
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    submitBook(event){
        alert("Title: "+this.state.title+", Author: "+this.state.author+", ISBN: "+this.state.isbn);
        event.preventDefault();
    }

    bookChange(event){
        this.setState({[event.target.name]:event.target.value});
    }

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"} style={{margin:"20px"}}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Add Book</Card.Header>
                <Form onSubmit={this.submitBook} id="bookFormId">
                    <Card.Body>
                        <Row>
                        <Col>
                        <Form.Group controlId='formGridTitle'>
                            <Form.Label style={{margin:"5px"}}>Title</Form.Label>
                            <Form.Control name="title" value={this.state.title} onChange={this.bookChange} required type="text" className={"bg-dark text-white"} placeholder="Enter Book Title"></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId='formGridAuthor'>
                            <Form.Label style={{margin:"5px"}}>Author</Form.Label>
                            <Form.Control name="author" value={this.state.author} onChange={this.bookChange} required type="text" className={"bg-dark text-white"} placeholder="Enter Book Author"></Form.Control>
                        </Form.Group>
                        </Col>
                        <Form.Group controlId='formGridIsbn'>
                            <Form.Label style={{margin:"5px"}}>ISBN</Form.Label>
                            <Form.Control name="isbn" value={this.state.isbn} onChange={this.bookChange} required type="text" className={"bg-dark text-white"} placeholder="Enter Book ISBN"></Form.Control>  
                        </Form.Group>  
                        </Row>   
                    </Card.Body> 
                    <Card.Footer style={{textAlign:"right"}}>
                        <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave}/></Button>  
                    </Card.Footer>
                    </Form>
            </Card>
        );
    }
}

export default AddBooksComponent;