const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList} = graphql;

const recipes = [
    {id: "0", title: 'pad thai', url: 'url0'},
    {id: "1", title: 'chili', url: 'url1'},
    {id: "2", title: 'bread', url: 'url2'},
]

const RecipeType = new GraphQLObjectType({
    name:'Recipe',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        url: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe: {
            type: RecipeType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(recipes, {id: args.id});
            }
        },
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parent, args){
                return recipes
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});