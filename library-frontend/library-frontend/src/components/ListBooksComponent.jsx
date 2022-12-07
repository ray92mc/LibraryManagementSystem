import React, { Component } from 'react';
import BookService from '../services/BookService';
import {Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';


class ListBooksComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            books: []
        }
    }
    componentDidMount(){
        BookService.getBooks().then((res) =>{
            this.setState({books: res.data});
        });
    }
    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/>
                    Book List
                </Card.Header>
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
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}

export default ListBooksComponent;