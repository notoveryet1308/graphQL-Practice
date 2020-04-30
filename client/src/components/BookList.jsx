import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import './style.scss';
export const getBooksQuery = gql`
  {
    books{
      name,
      id,
      genre,
      author{
        name,
        age
      }
    }
  }
`
class BookList extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoading: null,
      books:[]
    }
 
  }
 
 displayBooks(){
   const {loading, books} = this.props.data;
   if(loading){
     return <div>Loadinggg</div>
   }else{
     return <ul className='bookList-list'>
        {books.map((book,index)=> 
         <li className='book' key={index}>{book.name}</li>
       )} 
      </ul>
    
   }
 }
  render() {
    return (
      <div className='bookList'>
        <h1 className='bookList-heading'>Books</h1>
        {this.displayBooks()}  
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);