import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(404).json({
                message: 'Something is missing',
                success: false
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(404).json({
                message: 'User already registered',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save()
        return res.status(200).json({
            message: 'User registered successfully',
            user,
            success: true
        })
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

export const getAll = async (req,res) => {
    try {
        const userData = await User.find()
        if(!userData){
            return res.status(404).json({
                message: 'Userdata not found',
                success: false
            })
        }
        return res.status(200).json({
            userData,
            success: true
        })
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

export const getOne = async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        }
        return res.status(200).json({
            user,
            success: true
        })
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

export const update = async (req,res) => {
    try {
        const id = req.params.id
        const updateData = req.body
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        }
        const updatedData = await User.findByIdAndUpdate(id, updateData, {new: true})
        return res.status(200).json({
            message: 'Updates successfully made',
            updatedData,
            success: true
        })

    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

export const deleteUser = async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        }
        await User.findByIdAndDelete(id)
        return res.status(200).json({
            message: 'User deleted successfully',
            success: true
        })
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}