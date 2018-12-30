import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import {Modal} from "../components/Modal";

class Books extends Component {
  state = {
    books: [],
    query: "",
    show: false
  };

 

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.query) {
      API.searchBooks(this.state.query)
        .then(res => {
          this.setState({ books: res.data, query:""});
        })
        .catch(err => console.log(err));
    }
  };

  saveBook = book => {
    var image;
    if(book.volumeInfo.imageLinks) 
      image=book.volumeInfo.imageLinks.thumbnail
    else
      image="http://placehold.jp/100x100.png";

    const bookData = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: image,      
      link: book.volumeInfo.infoLink
    }
    API.saveBook(bookData)
      .then(res => {
        console.log(res.data);
        console.log("book saved");
        this.showModal();
      })
      .catch(err => console.log(err));
  }
  aStyle= {
    'textDecoration': 'none',
    'color': 'white'
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Google Books</h1>
              <h2>Search</h2>
            </Jumbotron>
            <Modal show={this.state.show} handleClose={this.hideModal}>
              <p>Book Saved.</p>
            </Modal>
            <form>
              <Input
                value={this.state.query}
                onChange={this.handleInputChange}
                name="query"
                placeholder="Enter Search Criteria"
              />
              
              <FormBtn
                disabled={!(this.state.query)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                   
                      <strong>
                        {book.volumeInfo.title} 
                      </strong>
                      <button className="btn btn-primary float-right"
                      onClick={() => this.saveBook(book)}>
                      Save
                      </button>
                      <a className="btn btn-primary float-right"
                      href= {book.volumeInfo.infoLink} style={this.aStyle} target="_blank">View</a>

                      <p>{book.volumeInfo.authors}</p>
                      {book.volumeInfo.imageLinks ? (
                        <img src={book.volumeInfo.imageLinks.thumbnail} />
                      ) : (
                        <img src="http://placehold.jp/100x100.png" />
                      )}
                      
                      <p>{book.volumeInfo.description}</p>
                   
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
       
      </Container>
    );
  }
}

export default Books;
