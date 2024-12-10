import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        username: 'String1474478',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-11-26T18:36:32.142Z',
      },
    },
    two: {
      data: {
        username: 'String9804569',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-11-26T18:36:32.142Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
