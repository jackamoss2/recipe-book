import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

dotenv.config();

var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

// This class implements the RandomDie GraphQL type
class RandomDie {
    numSides: number;
  constructor(numSides: number) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}:{numRolls:number}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// The root provides the top-level API endpoints
var root = {
  getDie: ({numSides}:{numSides:number}) => {
    return new RandomDie(numSides || 6);
  }
}
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
const port = process.env.PORT;

app.listen(port, () => {
    console.log(port)
});

console.log(`running server at ${ port }`)