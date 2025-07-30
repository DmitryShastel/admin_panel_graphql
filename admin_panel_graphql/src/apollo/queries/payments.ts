import {gql} from '@apollo/client'

export const GET_PAYMENTS = gql `
    query GET_PAYMENTS(
        $userId: Int!
        $pageSize: Int = 10
        $pageNumber: Int = 1
        $sortBy: String = "createdAt"
        $sortDirection: SortDirection = desc
    ) {
        getPaymentsByUser(
            userId: $userId
            pageSize: $pageSize
            pageNumber: $pageNumber
            sortBy: $sortBy
            sortDirection: $sortDirection
        ) {
            pagesCount
            page
            pageSize
            totalCount
            items {
                dateOfPayment
                endDate
                price
                type
                paymentType
                payments {
                    amount
                    currency
                }
            }
        }
    }
`