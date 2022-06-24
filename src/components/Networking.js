import { useState } from "react"

import posts from "../assets/posts"

const Networking = () => {
    const [input, setInput] = useState("")
    const handleChange = (e) => {
        setInput(e.target.value)
    }
  return (
    <div className="networking">
        <form className="publish-post"
            onSubmit={(e) => {
                e.preventDefault()
                console.log(input)
                posts.push(
                    {
                        _id : posts.length + 1,
                        value: input,
                        user: "John Doe",
                    }
                )
                setInput("")
            }}>
            <input type="text" className="publish-text__area" name="post" placeholder="Une idée à partager ?" value={input} maxLength="250" onChange={handleChange}/>
            <button type="submit" 
                // onClick={(e) => {
                // e.preventDefault()
                // addPost()}} 
                className="submitPost" 
                >Envoyer</button>
        </form>
    </div>
  )
}

export default Networking