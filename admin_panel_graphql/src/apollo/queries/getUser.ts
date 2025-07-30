import {gql} from '@apollo/client'


export const GET_USER = gql`
    query getUser($id: Int!){
        getUser(userId: $id){
            userName
            email
            createdAt
            profile {
                id
                userName
                firstName
                lastName
                avatars {
                    url
                    width
                    height
                    fileSize
                }
            }
            userBan {
                reason
                createdAt
            }
        }
    }
`

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
                userBan {
                    reason
                    createdAt
                }
            }
        }
    }
`


