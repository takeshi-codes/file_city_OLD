import type { Round } from '@prisma/client'

import { rounds, round, createRound, updateRound, deleteRound } from './rounds'
import type { StandardScenario } from './rounds.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('rounds', () => {
  scenario('returns all rounds', async (scenario: StandardScenario) => {
    const result = await rounds()

    expect(result.length).toEqual(Object.keys(scenario.round).length)
  })

  scenario('returns a single round', async (scenario: StandardScenario) => {
    const result = await round({ id: scenario.round.one.id })

    expect(result).toEqual(scenario.round.one)
  })

  scenario('creates a round', async (scenario: StandardScenario) => {
    const result = await createRound({
      input: {
        roundNumber: 486327,
        opponentDeck: 'String',
        result: 'WW',
        eventId: scenario.round.two.eventId,
        userId: scenario.round.two.userId,
      },
    })

    expect(result.roundNumber).toEqual(486327)
    expect(result.opponentDeck).toEqual('String')
    expect(result.result).toEqual('WW')
    expect(result.eventId).toEqual(scenario.round.two.eventId)
    expect(result.userId).toEqual(scenario.round.two.userId)
  })

  scenario('updates a round', async (scenario: StandardScenario) => {
    const original = (await round({ id: scenario.round.one.id })) as Round
    const result = await updateRound({
      id: original.id,
      input: { roundNumber: 1114164 },
    })

    expect(result.roundNumber).toEqual(1114164)
  })

  scenario('deletes a round', async (scenario: StandardScenario) => {
    const original = (await deleteRound({ id: scenario.round.one.id })) as Round
    const result = await round({ id: original.id })

    expect(result).toEqual(null)
  })
})
