import { useState } from "react"
import { FaCross } from 'react-icons/fa'

const Networking = () => {
    const [input, setInput] = useState("")
    const [showModal, setShowModal] = useState(false)

    const [posts, setPosts] = useState(
        [
            {
                _id : 1,
                value: "Bienvenue sur le forum de partage de votre entreprise",
                user : "John Doe",
            },
            {
                _id : 2,
                value: "Wow, super cool de pouvoir discuter avec vous",
                user : "Colonel Moutarde",
            },
        ]
    )

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const addPost = (post) => {
        if(input !== "" || input !== " ") {
            post = {
                _id : posts.length + 1,
                value: input,
                user: "John Doe",
            }
            setPosts([...posts, post])
        }
    }
  return (
    <div className="networking">
        <form className="publish-post"
            onSubmit={(e) => {
                e.preventDefault()
                addPost()
                setInput("")
            }}>
            <textarea type="text" className="publish-text__area" name="post" placeholder="Une idée à partager ?" value={input} maxLength="250" onChange={handleChange}/>
            <button type="submit" 
                className="submitPost">Envoyer</button>
        </form>
        <div className="publications">{
            posts.map( post => {
            return (
                <div className="publication" key={post._id}>
                    <div className="publication-value">{post.value}</div>
                    <div className="user">{post.user}</div>
                    <button type="button" className="modify-button"
                    onClick={ (post) => {
                        setShowModal(true)
                    }}
                    >Modifier</button>
                    <button type="button" className="delete-button"
                    onClick={(e) => {
                        e.target.closest('.publication').remove()
                    }}>Supprimer</button>
                {
                    showModal ?
                    <div className="modal-screen">
                        <div className="modal-modify">
                            <FaCross className = "modal-close" onClick={setShowModal(false)}/>
                            <textarea className="publication-value" value={post.value}></textarea>
                            <button type="button" className="modify-button"
                            onClick={() => {
                                setShowModal(false)
                            }
                            }>Modifier</button>
                        </div>
                    </div> : null
                    }
                    </div>
            )}
            )
            
        }
        </div>
    </div>
  )
}

export default Networking