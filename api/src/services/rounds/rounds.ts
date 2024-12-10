import type {
  QueryResolvers,
  MutationResolvers,
  RoundRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const rounds: QueryResolvers['rounds'] = () => {
  return db.round.findMany()
}

export const roundsByEvent: QueryResolvers['roundsByEvent'] = ({ eventId }) => {
  return db.round.findMany({
    where: {
      eventId: eventId, // Filter rounds by eventId
    },
  })
}

export const round: QueryResolvers['round'] = ({ id }) => {
  return db.round.findUnique({
    where: { id },
  })
}

export const createRound: MutationResolvers['createRound'] = ({ input }) => {
  return db.round.create({
    data: input,
  })
}

export const updateRound: MutationResolvers['updateRound'] = ({
  id,
  input,
}) => {
  return db.round.update({
    data: input,
    where: { id },
  })
}

export const deleteRound: MutationResolvers['deleteRound'] = ({ id }) => {
  return db.round.delete({
    where: { id },
  })
}

export const Round: RoundRelationResolvers = {
  event: (_obj, { root }) => {
    return db.round.findUnique({ where: { id: root?.id } }).event()
  },
  user: (_obj, { root }) => {
    return db.round.findUnique({ where: { id: root?.id } }).user()
  },
}
