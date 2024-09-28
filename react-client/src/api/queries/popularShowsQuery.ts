export const LoadPopularShowsQuery = () => {
    return ({
        query: `
            query {
                Page(perPage: 20) {
                    media(sort: POPULARITY_DESC, type: ANIME) {
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
        `
    })
}