import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  })

  try {
    const apiUrl = 'https://nest-json.jcloud-ver-jpe.ik-server.com/items/3'
    console.log('Fetching data from external API:', apiUrl)

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    console.log('response:', response)

    console.log('External API response status:', response.status)

    if (!response.ok) {
      console.error('Error fetching data:', response.statusText)
      throw new Error(`Error: ${response.statusText}`)
    }

    const text = await response.text()
    console.log('Raw response text:', text)

    let data
    if (text) {
      try {
        data = JSON.parse(text)
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError)
        throw new Error('Error parsing JSON response from external API')
      }
    } else {
      console.error('Received empty response')
      throw new Error('Received empty response from external API')
    }

    console.log('Data fetched successfully:', data)

    res.status(200).json(data)
  } catch (error: any) {
    console.error('Error in API route handler:', error.message)
    res.status(500).json({ error: error.message })
  }
}
