import * as dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import router from './route/router'
dotenv.config()
const app = express()
const server_port: number | string = process.env.PORT || 4000
app.use(morgan('dev'))
app.use('/', router)
app.listen(server_port, () => {
  console.log(`the server started at http://localhost:${server_port}`)
})
export default app
