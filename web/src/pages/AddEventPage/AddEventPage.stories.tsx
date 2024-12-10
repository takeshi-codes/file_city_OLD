import type { Meta, StoryObj } from '@storybook/react'

import AddEventPage from './AddEventPage'

const meta: Meta<typeof AddEventPage> = {
  component: AddEventPage,
}

export default meta

type Story = StoryObj<typeof AddEventPage>

export const Primary: Story = {}
