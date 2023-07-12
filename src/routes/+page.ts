import type { PageLoad } from "./$types"

type ApiMonster = {
  name: string
  url: string
}

export type IndexMonster = ApiMonster & {
  id: string
  image: string
}

export const load: PageLoad = (async ({ fetch, url }) => {
  const generationId = url.searchParams.get('generation_id') || '1'
  let monList: ApiMonster[] = [] // Specify the type as an array of ApiMonster

  if (generationId == 'all') {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1008")
    const json = await response.json()
    monList = json.results
  } else {
    const generationResponse = await fetch(`https://pokeapi.co/api/v2/generation/${generationId}`)
    const generationJson = await generationResponse.json()
    monList = generationJson.pokemon_species
  }

  const mons: IndexMonster[] = monList.map((mon: ApiMonster) => {
    const splitUrl = mon.url.split('/')
    const id = splitUrl[splitUrl.length - 2]
    return {
      name: mon.name,
      url: mon.url,
      id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
  })

  return {
    mons
  }
})
