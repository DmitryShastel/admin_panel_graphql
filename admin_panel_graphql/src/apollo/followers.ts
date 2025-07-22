import {gql} from '@apollo/client'

export const GET_FOLLOWERS = gql `
    query GetFollowers($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {
        getFollowers(
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