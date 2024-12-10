import type { Prisma, Event } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EventCreateArgs>({
  event: {
    one: {
      data: {
        eventDate: '2024-12-03T19:55:40.638Z',
        eventDeck: 'String',
        eventName: 'String',
        eventType: 'locals',
        placement: 'first',
        user: {
          create: {
            username: 'String7022510',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2024-12-03T19:55:40.638Z',
          },
        },
      },
    },
    two: {
      data: {
        eventDate: '2024-12-03T19:55:40.638Z',
        eventDeck: 'String',
        eventName: 'String',
        eventType: 'locals',
        placement: 'first',
        user: {
          create: {
            username: 'String897485',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2024-12-03T19:55:40.638Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Event, 'event'>
