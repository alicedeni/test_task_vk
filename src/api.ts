const API_URL = 'https://rickandmortyapi.com/api/character'

export const fetchCharacters = async (page: number) => {
  const response = await fetch(`${API_URL}?page=${page}`)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}
