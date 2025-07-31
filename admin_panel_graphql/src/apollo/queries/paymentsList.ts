import {gql} from '@apollo/client'

export const GET_PAYMENTS_LIST = gql`
    query GetPayments($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $searchTerm: String) {
        getPayments(
            pageSize: $pageSize
            pageNumber: $pageNumber
            sortBy: $sortBy
            sortDirection: $sortDirection
            searchTerm: $searchTerm
        ) {
            items {
                userName 
                createdAt 
                amount 
                type 
                paymentMethod 
                avatars {
                    url
                } 
            }
            totalCount
            page
            pageSize
            pagesCount
        }
    }
`
