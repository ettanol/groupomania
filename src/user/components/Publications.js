import posts from "../assets/posts"

const Publications = () => {
  return (
    <div className="publications">{
      posts.map( post => {
        return (<div className="publication" key={post._id}>
          <div className="publication-value">{post.value}</div>
          <div className="user">{post.user}</div>
        </div>)
  
      })
      }
    </div>
  )
}

export default Publications