const Post = require('../models/posts')
const fs = require('fs')
const posts = require('../models/posts')

exports.addPost = async (req, res, next) => {
    let PostObject = req.body //get the req sent from the front
    delete PostObject._id //deletes the id automatically created (to link the object to the userId)
    if(PostObject.value.includes("<" || "javascript" || "script")
    ) {
        return res.status(403).json({error: "Requête refusée"}) //to protect from scripts being added
    } else {
        let timeOfUpload = Date.now().toString()
        const post = new Post({ // creates a new object
            user: PostObject.user,
            value: PostObject.value,
            timeOfUpload: timeOfUpload,
            imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "",
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: [],
        })
        post.save() //saves the new object to the DB
        .then(() => res.status(201).json({
            post
        }))
        .catch(error => res.status(400).json({error}))
    }
}

exports.updatePost = async (req, res, next)=> {
    Post.findOne({ _id: req.params.id}) //gets the Post that will be modified from DB
    .then(post => {
        if(post.imageUrl !== ''){
            const filename = post.imageUrl.split('/images/')[1]
            if (fs.existsSync(`images/${filename}`) && req.file || (fs.existsSync(`images/${filename}`) && req.body.image === "[object Object]")){ //if the file already exists and a file is added in the request
                fs.unlink(`images/${filename}`, err => {if(err) { throw err}}) //deletes the file from the server
            }
        }        
        const PostObject = req.file ? 
        { //if a file is added
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //get the req and the infos of the file
        } : { 
            ...req.body,
            imageUrl: ""
        } //else just get the modified info from request
        if(PostObject.value.includes("<" || "javascript" || "script")
    ) {
        return res.status(403).json({error: "Requête refusée"}) //to protect from scripts being added
    }
        Post.updateOne({ _id: req.params.id}, { ...PostObject, _id: req.params.id}) //updates DB
        .then(() => res.status(200).json({message: 'Post modifiée'}))
        .catch(error => res.status(400).json({ error }))
    })
}

exports.deletePost = async (req, res, next) => {
    Post.findOne({ _id: req.params.id}) //checks the DB for specific object
    .then(post => {
        if(post.imageUrl !== ''){
            const filename = post.imageUrl.split('/images/')[1]
            if (fs.existsSync(`images/${filename}`)){
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) throw err;
                })
            }
        }
        Post.deleteOne({ _id: req.params.id}) //deletes the object from DB
        .then(()=> res.status(200).json({ message: 'Post supprimée!' }))
        .catch(error => res.status(400).json(new Error))
    })
    .catch(error => res.status(500).json({error}))
}

exports.getOnePost = async (req, res, next) => {//get the specific object from DB
    Post.findOne({ _id: req.params.id})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllPosts = async (req, res, next) => { // get all object
    Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))
}

exports.likeOnePost = async (req, res, next) => {
    let like = req.body.like
    let userId = req.body.userId
    Post.findOne({ _id: req.params.id}) //gets the specific object from DB
    .then(post => {
        let usersLiked = post.usersLiked
        let usersDisliked = post.usersDisliked

        let add = (user) => { //adds the user to DB and adds a like or dislike to DB
            user.push(userId)
            user === usersLiked? post.likes++ : post.dislikes++
        }
        let remove = (user) => { //removes the user to DB and removes a like or dislike to DB
            let index = user.indexOf(userId)
            user.splice(index, 1)
            user == usersLiked ? post.likes-- : post.dislikes--
        }

        if([like] == -1){ //prevent user from adding a dislike and a like at the same time
            if(!usersDisliked.includes(userId)){ 
            add(usersDisliked)
            } 
            if (usersLiked.includes(userId)){
                remove(usersLiked)
            }
        } else if([like] == 0) { //checks if the arrays usersLiked and usersDisliked include the user
            if(usersDisliked.includes(userId)) {
                remove(usersDisliked) 
            } 
            if (usersLiked.includes(userId)){
                remove(usersLiked)
            }
        } else { //prevent user from adding a dislike and a like at the same time
            if(usersDisliked.includes(userId)){
                remove(usersDisliked)
            }
            if (!usersLiked.includes(userId)){
                add(usersLiked)
            }
        }
        post.save()
        .then(() => res.status(200).json({message: 'avis ajouté'}))
        .catch(error => res.status(400).json({ error }))
    })
}
