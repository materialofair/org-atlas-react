import { backendIcons, productionCollections } from 'org-atlas-react'

const groups = new Map()
for (const [id, { group }] of Object.entries(backendIcons)) {
  if (!groups.has(group)) groups.set(group, [])
  groups.get(group).push(id)
}
const allSections = Array.from(groups, ([name, icons]) => ({ name, icons }))
const workplaceGroups = ['职场角色与人才接班', '人才 KPI', '制造 KPI']

export const scopes = {
  all: { name: '全部图标', sections: allSections },
  workplace: { name: '职场与 KPI', searchName: '职场', sections: allSections.filter(section => workplaceGroups.includes(section.name)) },
  ...Object.fromEntries(Object.entries(productionCollections).filter(([id]) => id !== 'micron-hq')),
}

function searchText(value) {
  return value.toLowerCase().replace(/\s+/g, '')
}

const byIcon = new Map(Object.entries(backendIcons).map(([id, icon]) =>
  [id, [id, icon.name, icon.group, icon.description].map(searchText)]))
const scopeNames = new Map()
for (const scope of Object.values(scopes)) {
  for (const section of scope.sourceSections ?? scope.sections) {
    for (const key of section.icons) {
      if (!scopeNames.has(key)) scopeNames.set(key, new Set())
      scopeNames.get(key).add(searchText(section.name)).add(searchText(scope.searchName ?? scope.name))
    }
  }
}

function count(sections) {
  return new Set(sections.flatMap(section => section.icons)).size
}

export function catalogResults(query) {
  const normalized = searchText(query)
  const term = normalized === searchText(scopes.workplace.name) ? '职场' : normalized
  return Object.fromEntries(Object.entries(scopes).map(([id, scope]) => {
    const seen = new Set()
    const source = term && scope.sourceSections ? scope.sourceSections : scope.sections
    const sections = source.map(section => {
      const groupMatches = searchText(section.name).includes(term) ||
        searchText(scope.searchName ?? scope.name).includes(term)
      const icons = section.icons.filter(key => {
        if (seen.has(key)) return false
        const words = id === 'all' ? [...byIcon.get(key), ...scopeNames.get(key)] : byIcon.get(key)
        if (!groupMatches && !words.some(word => word.includes(term))) return false
        seen.add(key)
        return true
      })
      return { ...section, icons }
    }).filter(section => section.icons.length)
    return [id, { name: scope.name, sections, matches: seen.size, total: count(scope.sections) }]
  }))
}
