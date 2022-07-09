import { API, graphqlOperation } from 'aws-amplify';
import { listUserInformations } from './graphql/queries';
import { createUserInformation } from './graphql/mutations';
import contacts from './contacts.json';

export default async function populateDB() {
    // First check if the DB is empty with a list query
    const contactsDB = await API.graphql(graphqlOperation(listUserInformations))
    console.log(contactsDB.data.listUserInformations.items.length);
    // If the DB is not empty, do nothing
    if (contactsDB.data.listUserInformations.items.length !== 0)
        return
    
    // If the DB is empty, populate it with the contacts.json file
    console.log('Populating DB...')

    for (let i = 0; i < contacts.length; i++){
        // Create the userInformation with the contact data
        const userInformation = {
            name: contacts[i].name.toLocaleLowerCase(),
            address: contacts[i].address,
            phone: contacts[i].phone_number.replace(/\D/g, ''),
            birthday: contacts[i].birthday.replace(" ", ""),
            profilePicture: {
                key: contacts[i].picture
            }
        }
        //console.log(userInformation)
        // Send the userInformation to the API
        API.graphql(graphqlOperation(createUserInformation, { input: userInformation })).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }
}