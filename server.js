const express = require("express")
const mongoose  = require("mongoose")
const articleRouter = require("./routes/articles")
const Article = require("./models/article")
const methodOverride = require("method-override")
const app = express()
const Port = 3000

const dbURL = 'mongodb+srv://list_user:user123@cluster0.f88bnq0.mongodb.net/ToDoList?retryWrites=true&w=majority'
mongoose.connect(dbURL)
    .then((result) =>{
        app.listen(Port)
        console.log("server started")
    })
    .catch((e) => console.log(e))


app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))


app.get("/", async (req, res) => {
    const articles = await Article.find().sort({createdAt: "desc"})
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)


