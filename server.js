if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' })
}

const express = require ("express")
const app = express()
const expressLayouts = require ("express-ejs-layouts")
const bodyParser = require("body-parser")


//routes


const indexRouter = require("./routes/index")
const ownerRouter = require("./routes/owners")



app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public"))
app.use(express.urlencoded({ limit: "10mb", extended: false }))


const mongoose = require ("mongoose")

const db = require ("./config/keys").MongoURI

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology : true
})
.then(() => console.log("connection establsihed..."))
.catch(error => console.log(error))

/*mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology : true,
    useNewUrlParser: true,
    useCreateIndex : true
})



const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("connection established..."))
*/




//use routes


app.use("/", indexRouter)
app.use("/owners", ownerRouter)


app.listen(process.env.PORT || 3000)