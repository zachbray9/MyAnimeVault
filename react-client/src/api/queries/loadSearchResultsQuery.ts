export const LoadSearchResultsQuery = (query: string) => {
    return ({
        query: `
            query ($search: String) {
                Page(perPage: 25) {
                    media(search: $search, type: ANIME) {
                        id
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            large
                        }
                    }
                }
            }
            `
        ,
        variables: {
            search: query
        }
    })
}
