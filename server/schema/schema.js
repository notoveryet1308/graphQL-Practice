const graphql = require('graphql');
const Book = require('../models/Book');
const Author = require('../models/Author');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
         return Author.findById(parent.authorId)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({authorId: parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // code to get data db /other data
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find({});
      }
    }

  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt) 
        }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })

        return book.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})



































































































































// var books = [{
//     name: 'Name of the wind',
//     genre: 'Fantasy',
//     id: '1',
//     authorid: '1'
//   },
//   {
//     name: 'The final Empire',
//     genre: 'Fantasy',
//     id: '2',
//     authorid: '2'
//   },
//   {
//     name: 'The Long Earth',
//     genre: 'Sci-Fi',
//     id: '3',
//     authorid: '3'
//   },
//   {
//     name: 'Think and Grow Rich',
//     genre: 'Business',
//     id: '4',
//     authorid: '2'
//   },
//   {
//     name: 'Beyond',
//     genre: 'Fantasy',
//     id: '5',
//     authorid: '1'
//   },
//   {
//     name: 'The Loving Earth',
//     genre: 'Sci-Fi',
//     id: '6',
//     authorid: '3'
//   }
// ]

// var authors = [{
//   name: 'Patrick Rothfuss',
//   age: 44,
//   id: '1'
// }, {
//   name: 'Brandan Sanderous',
//   age: 35,
//   id: '2'
// }, {
//   name: 'Terry Patrick',
//   age: 43,
//   id: '3'
// }]