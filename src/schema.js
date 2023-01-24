// https://www.youtube.com/watch?v=ALqNbTik44o
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const BookType = new GraphQLObjectType({
    name:'Recipe',
    fields: () => ({
        id: { type:GraphQLInt },
        title: { type:GraphQLString },
        url: { type:GraphQLString }
    })
});
