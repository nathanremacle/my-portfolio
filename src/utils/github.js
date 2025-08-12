// utils/github.js
// helper pour merger un array de projets locaux avec données GitHub publiques
export async function mergeWithGithubData(localProjects, username = import.meta.env.VITE_GH_USER) {
  if(!Array.isArray(localProjects)) return []
  if(!username) return localProjects
  const out = await Promise.all(localProjects.map(async p => {
    try {
      const repo = p.repo || p.name
      const res = await fetch(`https://api.github.com/repos/${username}/${repo}`)
      if(!res.ok) return p
      const data = await res.json()
      return {
        ...p,
        html_url: data.html_url,
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count,
        description: p.description || data.description,
        language: p.language || data.language
      }
    } catch (e) {
      return p
    }
  }))
  return out
}
