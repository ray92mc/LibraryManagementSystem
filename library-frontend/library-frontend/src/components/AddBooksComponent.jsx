import React, { Component } from 'react';
import {Card, Form, Button, Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ToastComponent from './ToastComponent';

class AddBooksComponent extends Component {

    constructor(props){
        super(props);
        this.state= this.initialState;
        this.state.show = false;
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    initialState = {title:"", author:"", isbn:""}

    resetForm = () => {
        this.setState(() => this.initialState);
    }

    submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            isbn: this.state.isbn
        };

        axios.post("http://localhost:8080/books", book).then(res => {
            if(res.data != null){
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
            }else{
                this.setState({"show":false});
            }
        });

        this.setState(this.initialState);
    }

    bookChange = event => {
        this.setState({[event.target.name]:event.target.value});
    }

    render() {
        const {title, author, isbn} = this.state;

        return (
            <>
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <ToastComponent children={{show:this.state.show, message:"Book Created!", type:"success"}}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"} style={{margin:"20px"}}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Add Book</Card.Header>
                <Form onReset={this.resetForm} onSubmit={this.submitBook} id="bookFormId">
                    <Card.Body>
                        <Row>
                        <Col>
                        <Form.Group controlId='formGridTitle'>
                            <Form.Label style={{margin:"5px"}}>Title</Form.Label>
                            <Form.Control name="title" value={title} onChange={this.bookChange} autoComplete="off" required type="text" className={"bg-dark text-white"} placeholder="Enter Book Title"></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId='formGridAuthor'>
                            <Form.Label style={{margin:"5px"}}>Author</Form.Label>
                            <Form.Control name="author" value={author} onChange={this.bookChange} autoComplete="off" required type="text" className={"bg-dark text-white"} placeholder="Enter Book Author"></Form.Control>
                        </Form.Group>
                        </Col>
                        <Form.Group controlId='formGridIsbn'>
                            <Form.Label style={{margin:"5px"}}>ISBN</Form.Label>
                            <Form.Control name="isbn" value={isbn} onChange={this.bookChange} autoComplete="off" required type="text" className={"bg-dark text-white"} placeholder="Enter Book ISBN"></Form.Control>  
                        </Form.Group>  
                        </Row>   
                    </Card.Body> 
                    <Card.Footer style={{textAlign:"right"}}>
                        <Button size="sm" variant="info" type="reset"><FontAwesomeIcon icon={faUndo}/></Button>{' '}
                        <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave}/></Button>
                    </Card.Footer>
                    </Form>
            </Card>
            </div>
            </>
        );
    }
}

export default AddBooksComponent;