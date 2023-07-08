const express = require('express')
const {  getAllUser ,DeleteUser,checkToken } = require('../controller/admin')






const adminRouter = express.Router()

adminRouter.get('/getAllUser',checkToken  ,getAllUser )
adminRouter.delete('/delete' ,checkToken,DeleteUser)

module.exports = {adminRouter}