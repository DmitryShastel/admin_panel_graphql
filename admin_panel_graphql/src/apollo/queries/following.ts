import {gql} from '@apollo/client'

export const GET_FOLLOWING = gql `
    query GetFollowing($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {
        getFollowing(
            userId: $userId
            pageSize: $pageSize
            pageNumber: $pageNumber
            sortBy: $sortBy
            sortDirection: $sortDirection
        ) {
            items {
                userId
                userName
                firstName
                lastName
                createdAt
            }
            totalCount
            page
            pageSize
            pagesCount
        }
    }
`