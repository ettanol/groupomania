import './App.css'

// importing components from react-router-dom package
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom"

// import Index page from component
import Home from './components/Home'
// import Posts from component
import Posts from './components/Posts'

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" element={<Home />} />
            
          {/* This route is for about component 
          with exact path "/posts", in component 
          props we passes the imported component*/}
          <Route path="/posts" element={<Posts />} />
            
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to index component with to="/" */}
          {/* <Navigate to="/" /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
