import axios from 'axios';

const BOOK_API_BASE_URL = 'http://localhost:8080';

class BookService{
    getBooks(){
        return axios.get(BOOK_API_BASE_URL+"/books");
    }
}

export default new BookService()