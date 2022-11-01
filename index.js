import  'dotenv/config';
import mongoose from 'mongoose'
import  express  from 'express';
import cors from 'cors';
import client from './routes/clients.routes.js'
import provider from './routes/providers.routes.js'


const app = express()

const db_uri = process.env.DB_URI
const port = process.env.PORT

mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) =>{
    err?console.log("db connection error",err.message): console.log("database connected successfully")
})
const db = mongoose.connection
db.on('error',  console.error.bind(console,"database connection timed out"))
app.use(cors());
app.use(express.json())
app.use('/api/clients',client);
app.use('/api/providers',provider)

app.listen(port, console.log(`server is running at ${port}`))


