import { useState, useEffect } from 'react';
import { parseSearchInfo, defaultSearch, filteredSearch } from "../../utils/utils"

import UserCard from "../UserInfo/UserCard";

import "./YellowPage.css";

export default function YellowPage() {
    const [searchInfo, setSearchInfo] = useState({
        name: "",
        phone: "",
        age: "",
    });
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchTimeoutHandler, setSearchTimeoutHandler] = useState(-1);

    useEffect(() => {
        if (searchInfo.name || searchInfo.phone || searchInfo.age) {
            filteredSearch(searchInfo.name, searchInfo.age, searchInfo.phone).then(searchResult => {
                setContacts(searchResult);
                setLoading(false);
            }).catch(error => {
                setError(true);
                setLoading(false);
            })
        }
        else{
            defaultSearch().then(searchResult => {
                //console.log("Search object: " + JSON.stringify(searchInfo))
                //console.log(searchInfo)
                setContacts(searchResult);
                setLoading(false);
            }).catch(error => {
                console.log(error)
                setError(true);
                setLoading(false);
            })
        }
    }, [searchInfo])

    // Handle the user input and set a 1 second timeout before searching for the contacts and set the loading state to true
    function inputHandler(event) {
        clearTimeout(searchTimeoutHandler);
        setSearchTimeoutHandler(
            setTimeout(() => {
                const input = event.target.value;
                try{
                    setSearchInfo(parseSearchInfo(input));
                }catch(error){
                    console.log(error)
                    setLoading(false);
                    setError(true);
                }
            }, 1000)
        )
        setError(false);
        setLoading(true);
    }

    const contactsToRender = contacts.map(contact => {
        return <UserCard key={contact.id} name={contact.name} phone={contact.phone} address={contact.address} profilePicture={contact.profilePicture} />
    })

    return (
        <div className="yellow-page">
            <div className="yellow-page-title">
                <h1 >Yellow Page</h1>
                <h4 >Find what you're looking for</h4>
            </div>
            <form className="yellow-page-search">
                <label> <span className='yellow-page-search-label'>You're looking for who?</span>
                    <input type="text" placeholder="Search..." className="yellow-page-search-input" onInput={inputHandler} />
                </label>
            </form>
            
            <div className="yellow-page-results">
                {
                    error ? <p className='yellow-page-results-error'>No results, please review your search or try a different one</p> :
                        loading ? <p className='yellow-page-results-loading'>Loading...</p> :
                            contacts.length > 0 ? contactsToRender :
                                <p className='yellow-page-results-empty'>No results,<br /> please review your search or try a different one</p>
                }
            </div>
        </div>
    )
}