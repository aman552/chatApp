const mongoose = require("mongoose");
const Chat = require("./models/chat");

main().then(() => {
    console.log("Connection successful");
})
.catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
    {
        from: "Neha",
        to: "Priya",
        message: "Send me your exam sheet",
        created_at: new Date()
    },
    {
        from: "Aman",
        to: "Ankit",
        message: "Hi! How are you?",
        created_at: new Date()
    },
    {
        from: "Aparna",
        to: "Aman",
        message: "Teach me JS",
        created_at: new Date()
    },
    {
        from: "Amit",
        to: "Mohit",
        message: "Send me exam notes",
        created_at: new Date()
    },
    {
        from: "Amit",
        to: "Sumit",
        message: "All the best!",
        created_at: new Date()
    },
    {
        from: "Ankita",
        to: "Ramesh",
        message: "Bring some fruits",
        created_at: new Date()
    },
]

Chat.insertMany(allChats);