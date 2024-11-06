export const CategoryQuery = (genre: string | undefined, sortBy: string) => {
    return ({
        query: `
        query ($genre: String, $sortBy: [MediaSort]) {
            Page(perPage: 20) {
                    media(genre: $genre, sort: $sortBy, type: ANIME) {
                        id
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            large
                        }
                        description
                        averageScore
                        episodes
                        format
                        season
                        seasonYear
                    }
                }
        }
    `,
        variables: {
            genre: genre || null,
            sortBy: sortByQueryMap.get(sortBy) || 'trending'
        }
    })
}

const sortByQueryMap = new Map<string, string>([
    ["new", "START_DATE_DESC"],
    ["popular", "POPULARITY_DESC"],
    ["trending", "TRENDING_DESC"]
])