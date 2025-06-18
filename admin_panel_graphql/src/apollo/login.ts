import {gql} from '@apollo/client'

export const LOGIN_ADMIN = gql`
    mutation loginAdmin($userEmail:String!, $userPassword:String!) {
        loginAdmin(email: $userEmail, password: $userPassword) {
            logged
        }
    }
`