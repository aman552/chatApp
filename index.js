const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//Create connection to mongodb database
main().then(() => {
    console.log("Connection successful");
})
.catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//to verfiy the application
app.get("/", (req, res) => {
    res.send("App is working");
});

//Home page
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats });
});

//GET Route to edit page
app.get("/chat/new", (req, res) => {
    res.render("newChat.ejs");
});

//Post Route to create new chat
app.post("/chats", (req, res) => {
    let {from, to, msg} = req.body;
    let newChat =new Chat({
        from: from,
        to: to,
        message: msg,
        created_at: new Date()
    });
    newChat.save().then(() => {
        console.log("Chat was saved");
    })
    .catch((err) => {
        console.log(err);
    })
    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//UPDATE Route
app.put("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(id, {message: newMsg}, {runValidators: true, new: true});
    console.log(updatedChat);
    res.redirect("/chats");
});

//DELETE Route
app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.listen(8080, () => {
    console.log("App is listening on port: 8080");
});