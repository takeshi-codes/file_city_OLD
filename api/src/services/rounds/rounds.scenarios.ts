import type { Prisma, Round } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RoundCreateArgs>({
  round: {
    one: {
      data: {
        roundNumber: 6109329,
        opponentDeck: 'String',
        result: 'WW',
        event: {
          create: {
            eventDate: '2024-12-06T17:22:35.039Z',
            eventDeck: 'String',
            eventName: 'String',
            eventType: 'locals',
            placement: 'first',
            user: {
              create: {
                username: 'String5685255',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2024-12-06T17:22:35.039Z',
              },
            },
          },
        },
        user: {
          create: {
            username: 'String2505903',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2024-12-06T17:22:35.039Z',
          },
        },
      },
    },
    two: {
      data: {
        roundNumber: 1287966,
        opponentDeck: 'String',
        result: 'WW',
        event: {
          create: {
            eventDate: '2024-12-06T17:22:35.040Z',
            eventDeck: 'String',
            eventName: 'String',
            eventType: 'locals',
            placement: 'first',
            user: {
              create: {
                username: 'String2687145',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2024-12-06T17:22:35.040Z',
              },
            },
          },
        },
        user: {
          create: {
            username: 'String4493057',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2024-12-06T17:22:35.040Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Round, 'round'>
