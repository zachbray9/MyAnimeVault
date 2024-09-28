export const LoadUpcomingShowsQuery = () => {
    return ({
        query: `
                query {
                    Page(perPage: 20) {
                        media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED) {
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