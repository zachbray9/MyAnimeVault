export const LoadAnimeDetailsQuery = (animeId: number) => {
    return ({
        query: `
        query ($id: Int!) {
            Media(id: $id, type: ANIME) {
                id
                title {
                    romaji
                    english
                }
                description
                bannerImage
                coverImage {
                    large
                }
                genres
                episodes
                status
                averageScore
                popularity
                format
                season
                seasonYear
                studios {
                    edges {
                        node {
                            name
                        }
                    }
                }
            }
        }
    `,
    variables: {
            id: animeId
        }
    })

}

