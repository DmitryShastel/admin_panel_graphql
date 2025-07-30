import {gql} from '@apollo/client'

export const UN_BAN_USER = gql`
    mutation UnbanUser($userId: Int!) {
        unbanUser(userId: $userId)
    }
`