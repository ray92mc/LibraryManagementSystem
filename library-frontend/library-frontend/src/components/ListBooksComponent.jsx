import React, { Component } from 'react';
import BookService from '../services/BookService';
import {Card, Table, Button, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ToastComponent from './ToastComponent';


class ListBooksComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            books: []
        }
    }
    componentDidMount(){
        this.findAllBooks();
    }

    findAllBooks(){
        BookService.getBooks().then((res) =>{
            this.setState({books: res.data});
        });
    }

    deleteBook = (bookId) => {
        axios.delete("http://localhost:8080/books/"+bookId).then(res => {
            if(res.data != null){
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.setState({
                    books: this.state.books.filter(book => book.id !== bookId)
                });
            }else{
                this.setState({"show":false});
            }
        });
    }

    render() {
        return (
            <>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                    <ToastComponent children={{show:this.state.show, message:"Book Deleted!", type:"danger"}}/>
            </div>
            <div>
            <Card className={"border border-dark bg-dark text-white"} style={{marginTop:"20px"}}>
                <Card.Header><FontAwesomeIcon icon={faList}/> Book List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                    <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.books.map(
                                    book => 
                                    <tr key = {book.id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.isbn}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit}/></Button>
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this, book.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            </div>
            </>
        );
    }
}

export default ListBooksComponent;