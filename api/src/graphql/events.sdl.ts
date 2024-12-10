export const schema = gql`
  type Event {
    id: String!
    eventDate: DateTime!
    eventDeck: String!
    eventName: String!
    eventType: EventType!
    placement: PlacementType!
    userId: String!
    user: User!
    rounds: [Round]!
  }

  enum EventType {
    locals
    storeRegional
    onlineRegional
    offlineRegional
    storeUltimateCup
    onlineUltimateCup
    offlineUltimateCup
    nationals
    worlds
  }

  enum PlacementType {
    first
    second
    top4
    top8
    top16
    top32
    top64
    top128
    top256
    top512
  }

  type Query {
    events: [Event!]! @requireAuth
    event(id: String!): Event @requireAuth
  }

  input CreateEventInput {
    eventDate: DateTime!
    eventDeck: String!
    eventName: String!
    eventType: EventType!
    placement: PlacementType!
    userId: String!
  }

  input UpdateEventInput {
    eventDate: DateTime
    eventDeck: String
    eventName: String
    eventType: EventType
    placement: PlacementType
    userId: String
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event! @requireAuth
    updateEvent(id: String!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: String!): Event! @requireAuth
  }
`
