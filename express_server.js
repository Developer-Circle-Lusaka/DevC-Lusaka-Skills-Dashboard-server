import  express  from 'express'
import cors from 'cors'
import mongoose from   'mongoose'
import  bodyParser from 'body-parser'
import config  from './config'
import Database from  './database'
import developerRouter from './routes/developer'
const app = express()
const options={
  origin:'*',
  optionsSuccessStatus:200
}
app.use(cors(options));
app.use(bodyParser.json({limit:'250mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',developerRouter)
app.listen(config.port, () => console.log(`Microservice is listening on port ${config.port}`))

module.exports = app; 