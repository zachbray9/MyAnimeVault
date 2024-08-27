export const TopAiringShowsQuery = () => {
    return ({
        query: `
            query {
                Page(perPage: 20) {
                    media(sort: POPULARITY_DESC, type: ANIME, status: RELEASING) {
                        id
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            large
                        }
                        description
                        episodes
                    }
                }
            }
        `
    })
}