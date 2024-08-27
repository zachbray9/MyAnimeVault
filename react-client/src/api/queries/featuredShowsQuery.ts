export const FeaturedShowsQuery = () => {
    return ({
        query: `
            query {
                Page(perPage: 10) {
                    media(sort: TRENDING_DESC, type: ANIME, status: RELEASING) {
                        id
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            large
                        }
                        bannerImage
                        description
                        genres
                    }
                }
            }
        `
    })
}