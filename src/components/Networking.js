import { useState } from "react"

const Networking = () => {
    const [input, setInput] = useState("")
    const addPost = () => {
        return(
            <div className="post">
                {input}
            </div>
        )
    }
    const PublishPost = () => {
        return(
            <form className="publish-post">
                <input id="publish-text__area" name="post" placeholder="Une idée à partager ?" onChange={(e) => setInput(e.target.value)}/>
                <button type="submit" 
                    // onClick={(e) => {
                    // e.preventDefault()
                    // addPost()}} 
                    className="submitPost" 
                    onSubmit={() => {
                        console.log({input})
                        addPost()
                        setInput("")
                    }}>Envoyer</button>
            </form>
        )
    }
  return (
    <div className="networking">
        <PublishPost />

    </div>
  )
}

export default Networking