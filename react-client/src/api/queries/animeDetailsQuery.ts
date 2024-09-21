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
                trailer {
                    id
                    site
                    thumbnail
                }
                characters (role: MAIN) {
                    edges {
                        node {
                            name{
                                full
                            }
                            image {
                                large
                            }
                        }
                        role
                        voiceActors (language: JAPANESE) {
                            name {
                                full
                            }
                            language
                            image {
                                large
                            }
                        }
                    }
                }
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

