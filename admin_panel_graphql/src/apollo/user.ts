import {gql} from '@apollo/client'

export const GET_USERS = gql`
    query getUsers($pageSize: Int!){
        getUsers(pageSize: $pageSize){
            users{
                id
                userName
                createdAt
                profile {
                    userName
                    createdAt
                }
            }
        }
    }
`

