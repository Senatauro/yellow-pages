import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

const ERROR_MESSAGES = {
  ERROR_PARSE: ["SPECIAL_CHAR"],
};

function parseSearchInfo(searchInfo) {
  //ADD FILTER TO CHECK SPECIAL CHARACTERS

  const hasSpecialChar = searchInfo.match(/[^a-zA-Z0-9 ]/g);
  console.log(hasSpecialChar);
  if (hasSpecialChar) {
    throw ERROR_MESSAGES.ERROR_PARSE[0];
  }

  console.time("search");
  // This RegEx will get the name
  const name = searchInfo.match(/[a-zA-Z ]+/g);

  // This RegEx will get only numbers of size 1 or 2, they will be classified as age.
  const age = searchInfo.match(
    /((\s[0-9]{1,2}\s)|(\s[0-9]{1,2}$))|^(([0-9]{1,2}\s)|([0-9]{1,2}$))/g
  );

  // This RegEx is based on the EUA phone number format, so it will only get numbers of the EUA without the country code
  const phone = searchInfo.match(
    /((\([0-9]{3}\)|[0-9]{3})\s?(([0-9]{1,3}-[0-9]{1,5})|([0-9]{1,7}))?)/g
  );

  console.timeEnd("search");

  return {
    name: name ? name[0].trim().toLocaleLowerCase() : "",
    age: age ? age[0].trim() : "",
    phone: phone ? phone[0].trim() : "",
  };
}

async function defaultSearch() {
  const result = await API.graphql({
    query: queries.listUserInformations,
    variables: { limit: 30 },
  });
  return result.data.listUserInformations.items;
}

async function filteredSearch(name, age, phone) {
    const filter = {};
    if (name !== "") {
        filter.name = {
            contains: name,
        };
    }
    if (age !== "") {
        // Convert the age years to epoch time and them to a date time
        const closestYear = new Date(
            new Date().getTime() - age * 365 * 24 * 60 * 60 * 1000
        );
        // Add a year
        const farYear = new Date(closestYear.getTime() - 364 * 24 * 60 * 60 * 1000);
        console.log(closestYear, farYear);
        filter.birthday = {
            between: [farYear, closestYear],
        };
    }
    if (phone !== "") {
        filter.phone = {
            contains: phone,
        };
    }

    let nextToken = null
    const contacts = []
    do {
        const result = await API.graphql({
            query: queries.listUserInformations,
            variables: { filter, nextToken },
        });
        nextToken = result.data.listUserInformations.nextToken;
        contacts.push(...result.data.listUserInformations.items);
    } while (nextToken !== null)
    return contacts;
}


export { parseSearchInfo, defaultSearch, filteredSearch };
