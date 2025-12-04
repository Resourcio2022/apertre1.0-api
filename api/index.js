import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

import { connectDB } from '../db/connect.js'
import { mentorRoute } from '../router/mentor.route.js'
import { menteeRoute } from '../router/mentee.route.js'
import { repoRoute } from '../router/repo.route.js'


const app = express()


app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(morgan('tiny'))



app.get('/', (req, res) => res.json('Apertre Server 🚀'))

app.use('/mentor', mentorRoute)
app.use('/mentee', menteeRoute)
app.use('/repo', repoRoute)


const port = process.env.PORT || 3000
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`SERVER PORT : ${port}`)
    })
})
