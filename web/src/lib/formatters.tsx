import React from 'react'

import humanize from 'humanize-string'

const MAX_STRING_LENGTH = 150

export const formatEnum = (values: string | string[] | null | undefined) => {
  let output = ''

  if (Array.isArray(values)) {
    const humanizedValues = values.map((value) => humanize(value))
    output = humanizedValues.join(', ')
  } else if (typeof values === 'string' && values.length <= 3) {
    output = humanize(values).toUpperCase()
  } else if (typeof values === 'string') {
    output = humanize(values)
  }

  return output
}

export const jsonDisplay = (obj: unknown) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

export const truncate = (value: string | number) => {
  let output = value?.toString() ?? ''

  if (output.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }

  return output
}

export const jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2))
}

export const timeTag = (dateTime?: string) => {
  let output: string | JSX.Element = ''

  if (dateTime) {
    // Create a Date object from the UTC string
    const date = new Date(dateTime)

    // Format it explicitly as 'YYYY-MM-DD' to prevent timezone shifts
    // Format the date as 'DayOfTheWeek MM/DD/YYYY'
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'UTC', // Ensure consistent UTC formatting
    }
    const formattedDate = date.toLocaleDateString('en-US', options)
    output = (
      <time dateTime={dateTime} title={dateTime}>
        {formattedDate}
      </time>
    )
  }

  return output
}

export const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}
