import { render } from '@redwoodjs/testing/web'

import AddEventPage from './AddEventPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AddEventPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddEventPage />)
    }).not.toThrow()
  })
})
