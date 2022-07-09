import { useEffect, useState } from "react"
import { Storage } from "aws-amplify"
import { UrlExists } from "../../utils/utils"

import "./UserCard.css"

export default function UserCard(props) {
    const [image, setImage] = useState("")
    const [randomColor, setRandomColor] = useState("")
    useEffect(() => {
        // if the user has a profile picture, get it on the S3 storage
        if (props.profilePicture) {
            Storage.get(props.profilePicture.key, {
                level: "public",
            }).then(result => {

                // when the S3 returns the image, check if is a valid url
                fetch(result).then(response => {

                    // if the url is valid, set the image
                    if (response.status === 200) {
                        setImage(result)
                    }
                    else {
                        setRandomColor("#" + Math.floor(Math.random() * 16777215).toString(16))
                    }
                }).catch(error => {
                    console.log(error)
                    setRandomColor("#" + Math.floor(Math.random() * 16777215).toString(16))
                })
            }).catch(error => {
                console.log("No image")
                setRandomColor("#" + Math.floor(Math.random() * 16777215).toString(16))
            })
        }
        else {
            setRandomColor("#" + Math.floor(Math.random() * 16777215).toString(16))
        }
    }, [])

    return (
        <div className="user-card">
            {
                image !== "" ?
                    <img className="user-card-picture" src={image} />
                    :
                    <div className="user-card-picture-placeholder" style={{ backgroundColor: randomColor }}>
                        <span className="user-card-picture-placeholder-letter">{props.name.at(0)}</span>
                    </div>
            }
            <div className="user-card-info">
                <div className="user-card-name border-botton">I'm <span className="text-accent">{props.name}</span></div>
                <div className="user-card-address border-botton">My address: <span className="text-accent">{props.address}</span></div>
                <div className="user-card-phone border-botton">My phone: <span className="text-accent">{props.phone}</span></div>
            </div>
        </div>
    )
}