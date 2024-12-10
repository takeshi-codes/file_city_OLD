import type { Event } from '@prisma/client'

import { events, event, createEvent, updateEvent, deleteEvent } from './events'
import type { StandardScenario } from './events.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('events', () => {
  scenario('returns all events', async (scenario: StandardScenario) => {
    const result = await events()

    expect(result.length).toEqual(Object.keys(scenario.event).length)
  })

  scenario('returns a single event', async (scenario: StandardScenario) => {
    const result = await event({ id: scenario.event.one.id })

    expect(result).toEqual(scenario.event.one)
  })

  scenario('creates a event', async (scenario: StandardScenario) => {
    const result = await createEvent({
      input: {
        eventDate: '2024-12-03T19:55:40.593Z',
        eventDeck: 'String',
        eventName: 'String',
        eventType: 'locals',
        placement: 'first',
        userId: scenario.event.two.userId,
      },
    })

    expect(result.eventDate).toEqual(new Date('2024-12-03T19:55:40.593Z'))
    expect(result.eventDeck).toEqual('String')
    expect(result.eventName).toEqual('String')
    expect(result.eventType).toEqual('locals')
    expect(result.placement).toEqual('first')
    expect(result.userId).toEqual(scenario.event.two.userId)
  })

  scenario('updates a event', async (scenario: StandardScenario) => {
    const original = (await event({ id: scenario.event.one.id })) as Event
    const result = await updateEvent({
      id: original.id,
      input: { eventDate: '2024-12-04T19:55:40.593Z' },
    })

    expect(result.eventDate).toEqual(new Date('2024-12-04T19:55:40.593Z'))
  })

  scenario('deletes a event', async (scenario: StandardScenario) => {
    const original = (await deleteEvent({ id: scenario.event.one.id })) as Event
    const result = await event({ id: original.id })

    expect(result).toEqual(null)
  })
})
