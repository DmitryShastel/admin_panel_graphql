import {gql} from '@apollo/client'

export const DELETE_USER = gql`
    mutation removeUser($id: Int!) {
        removeUser(userId: $id)
    }
`