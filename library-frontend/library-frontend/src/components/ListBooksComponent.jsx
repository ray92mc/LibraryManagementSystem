import React, { Component } from 'react';
import BookService from '../services/BookService';

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
            <div>
                <h2 className='text-center'>Book List</h2>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
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
                    </table>
                </div>
            </div>
        );
    }
}

export default ListBooksComponent;