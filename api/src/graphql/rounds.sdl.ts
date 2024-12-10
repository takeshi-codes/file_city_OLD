export const schema = gql`
  type Round {
    id: String!
    roundNumber: Int!
    opponentDeck: String!
    result: ResultsType!
    eventId: String!
    userId: String!
    event: Event!
    user: User!
  }

  enum ResultsType {
    WW
    LL
    WLW
    WLL
    LWW
    LWL
    TIE
  }

  type Query {
    rounds: [Round!]! @requireAuth
    roundsByEvent(eventId: String!): [Round!]! @requireAuth
    round(id: String!): Round @requireAuth
  }

  input CreateRoundInput {
    roundNumber: Int!
    opponentDeck: String!
    result: ResultsType!
    eventId: String!
    userId: String!
  }

  input UpdateRoundInput {
    roundNumber: Int
    opponentDeck: String
    result: ResultsType
    eventId: String
    userId: String
  }

  type Mutation {
    createRound(input: CreateRoundInput!): Round! @requireAuth
    updateRound(id: String!, input: UpdateRoundInput!): Round! @requireAuth
    deleteRound(id: String!): Round! @requireAuth
  }
`
