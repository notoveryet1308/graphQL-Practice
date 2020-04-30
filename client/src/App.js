import React from 'react';
import './App.scss';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import AddBook from './components/addBook';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App"> 
         <div className='sec-1'>
           <BookList/>
           <AddBook/>
         </div>
         <div className='sec-2'></div>
      </div>
    </ApolloProvider>
  );
}

export default App;
