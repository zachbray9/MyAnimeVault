export const HomePageQuery: string = `
    query {
        featured: Page(perPage: 10) {
            media(sort: TRENDING_DESC, type: ANIME) {
                id
                title {
                    romaji
                    english
                }
                coverImage {
                    extraLarge
                    large
                    medium
                }
                banner
                description
                episodes
                format
                genres
                season
                seasonYear
            }
        }
        trending: Page(perPage: 20) {
            media(sort: TRENDING_DESC, type: ANIME) {
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
        popular: Page(perPage: 20) {
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
        upcoming: Page(perPage: 20) {
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