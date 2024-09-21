import express from 'express'
import { deleteUser, getAll, getOne, register, update } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.get('/getAll', getAll)
userRouter.get('/getOne/:id', getOne)
userRouter.put('/update/:id', update)
userRouter.delete('/delete/:id', deleteUser)

export default userRouter