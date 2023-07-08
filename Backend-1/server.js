const { adminRouter } = require('./router/AdminRouter')
const {userRouter} = require('./router/UserRouter')
const cors = require ('cors')

const express = require('express')

const app = express()

const port = 3000 

app.use(express.json())
app.use(cors())

app.get("/" , (req,res) => {
    res.send('server is okay')
})

app.use('/apiv1' ,userRouter)


app.use('/apiv2' , adminRouter)

app.listen(port ,() => {
    console.log("server is gud")
})