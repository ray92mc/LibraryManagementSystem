"# code-and-docs-ray92mc" 
Online system to manage a library. Admin will add and remove books, and keep track of books. Customers will reserve/check out and return books. The system will keep track of overdue books and manage fines for not returning books on time. A database will store information about books, customers, admin, library cards, etc. An external payment API will be used to pay fines for late returns. An email client will be used to notify users to return books and inform them if a book return is overdue.

All data will be persisted in a database, I'm currently thinking about mySQL but also considering noSQL. I will have a number of tables some of the main tables being: 

Library:{
name:String,
address: Address
}
Book:{
ISBN: String,
title: String,
category: String,
authors: [Author, Author......]
}
BookReservation:{
books: [Book, Book....]
createdAt: timestamp,
reserved: Boolean
}
Fine:{
amount: double
}

There will be an admin interface and a customer interface. APIs will be created to add and remove books, display the catalog, and search through the catalog by author, title, etc. Customers can reserve and return books. If a book return is late the customer will be notified by email and fined accordingly. Customers can renew their book lease if it has not already been reserved. Many instances of the same book exist but with different serial numbers. Books become unavailable if all instances are checkout out or reserved. I timestamp of the expected next available date for a book will be displayed to the customers. I would also like to add functionality for creating library cards with expiration dates. 
