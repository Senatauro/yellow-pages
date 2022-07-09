/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserInformation = /* GraphQL */ `
  query GetUserInformation($id: ID!) {
    getUserInformation(id: $id) {
      id
      name
      address
      phone
      birthday
      profilePicture {
        key
      }
      backgroundPicture {
        key
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserInformations = /* GraphQL */ `
  query ListUserInformations(
    $filter: ModelUserInformationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInformations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        address
        phone
        birthday
        profilePicture {
          key
        }
        backgroundPicture {
          key
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
