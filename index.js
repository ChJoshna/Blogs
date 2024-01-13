import express from "express";
import bodyParser from "body-parser";

const app=express();
app.set("view engine", "ejs");

const port=3000;
let posts = [];
var nextId = 1;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/Home", (req, res) => {
    res.render("index.ejs", { posts: posts });
});


app.get("/Create",(req,res)=>{
    res.render("create.ejs");
})

app.post("/submit",(req,res)=>{
    let author = req.body["author"];
    let title = req.body["postTitle"];
    let content = req.body["postContent"];
    let newPost = {id:nextId++ ,author:author, postTitle:title, postContent: content}
    posts.push(newPost)
    res.redirect("/")
})

// Edit a blog post
app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postToEdit = posts.find(post => post.id === postId);
    res.render("edit.ejs", { post: postToEdit });
});

// Update the edited blog post
app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === postId);
    // Update the post details based on form submission
    posts[postIndex] = { ...posts[postIndex], postTitle: req.body.postTitle, postContent: req.body.postContent };
    res.redirect("/");
});

// Delete a blog post
app.post("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.redirect("/");
    } else {
        res.status(404).send("Post not found");
    }
});


app.listen(port,() => {
    console.log(`Listening on port ${port}`);
  });