import React, {
  Component
} from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {gql} from 'apollo-boost';
import {getBooksQuery} from './BookList';
import './style.scss'
const getAuthor = gql`
  {
    authors{
     id
     name
    }
  }
`
const addbookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId:ID!){
    addBook(name:$name, genre:$genre, authorId:$authorId){
      name,
      id
    }
  }
`

class AddBook extends Component {
  constructor(props){
    super(props);
    this.state={
      bookname:"",
      genre: "",
      authorId:""
    }
    this.handlChange= this.handlChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }
  displayAuthor(){
    const {loading, authors} = this.props.getAuthorQuery;
    if(loading){
      return <option>Loading</option>
    }else{
      return authors.map((author)=> <option key={author.id} value={author.id}>{author.name}</option>)
    }
  }
  handlChange(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value 
    })
    
  }
  handleSubmit(e){
     e.preventDefault();
    

    
    this.props.addBookMutation({
      variables:{
        name: this.state.bookname,
        genre:this.state.genre,
        authorId:this.state.authorId

      },
      refetchQueries:[ {query: getBooksQuery}]
    });
     this.setState({
       bookname:'',
       genre:'',
       authorId:''
     })
  }
  render() {
    return ( 
    <div className='addbook'>
    <h3>Add Books</h3>
      <form onSubmit={this.handleSubmit}>
        <div className='input-field'>
          <label htmlFor='bookname'>Book Name</label>
          <input name='bookname' value={this.state.bookname} type='text' placeholder='Book name' onChange={this.handlChange}/>
        </div>
        <div className='input-field'>
          <label htmlFor='genre'>Genre</label>
          <input name='genre' value={this.state.genre} type='text' placeholder='Genre' onChange={this.handlChange}/>
        </div>
        <div className='input-field'>
          <label htmlFor='authorId'>Author:</label>
          <select name='authorId' value={this.state.authorId} onChange={this.handlChange}>
            <option>Select Author</option>
            {this.displayAuthor()}
          </select>
        </div>
        <div className='btn-field'>
          <button type='submit'> Add</button>
        </div>
      </form>
    </div>
    )
  }

}

export default compose(
  graphql(getAuthor, {name:"getAuthorQuery"}),
  graphql(addbookMutation, {name:"addBookMutation"})
)(AddBook);