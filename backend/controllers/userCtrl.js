const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userController = {

    register: async (req,res) => {
        try {
            const {username,email,password,confirmPassword} = req.body
            
            if( !username || !email || !password || !confirmPassword )
            return res.status(400).json({msg: 'please fill in all fields.'})

            if(!validateEmail(email))
            return res.status(400).json({msg: 'Invalid email'})

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: 'This email already exists'})

            if(password.length <6)
            return res.status(400).json({msg: 'Password must be at least 6 character'})

            if(password !== confirmPassword)
            return res.status(400).json({msg: 'Password did not match!'})

            const salted = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salted)
        
            
            const newUser =new Users ({
                username, email, password: passwordHash
            })

            const savedUser = await newUser.save()
            
            res.json({msg: 'User Registered'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    login: async (req,res) => {
        
        try{
            const { email, password } = req.body
        
            if( !email || !password )
            return res.status(400).json({msg: 'please fill in all fields.'})

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: 'This email does not exist.' })

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: 'Password is incorrect .' })

            const token = jwt.sign({id: user._id}, process.env.JWT_REFRESH_TOKEN, {expiresIn: '7d'})
                

            res.json({
                token,
                user: {
                    avatar: user.avatar,
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin
                },  
                msg: 'Login succes'
            })

            // res.cookie('refreshtoken22', '1', {
            //     httpOnly: true,
            //     maxAge: 7*24*60*1000 //7days
            // })

            // res.status(201).json({
            //     refresh_token,
            //         user: {
            //         id: user._id,
            //         displayName: user.name,
            //         email: user.email
            //     }
            // }) 
            

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // isValid: async (req, res) => {
    //     try {
    //         const token = req.header('Auth-token')
    //         if(!token) return res.json(false)

    //         const verified = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
    //         if(!verified) return res.json(false)

    //         const user =await Users.findById(verified.id)
    //         if(!user) return res.json(false)

    //         return res.json(true)

    //     } catch (err) {
    //         res.status(500).json({msg: err.message})
    //     }
    // },

    get: async (req,res) => {
        try {
            const getUser = await Users.findById(req.user)
            .select('-password')

            res.json(getUser)
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },

    getAll: async (req,res) => {
        try {
            const users = await Users.find().select('-password')
            
            res.json(users)
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },

    logout: async (req, res) => {
        // try {
        //     res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
        //     return res.json({msg: 'Logged out'})
        // } catch (error) {
        //     res.status(500).json({msg: err.message})
        // }
    },

    updateUser: async (req,res) => {
        try {
            const {username,avatar} = req.body

            await Users.findByIdAndUpdate(req.user, {username,avatar})

            res.json({msg: 'Update success', username})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },

    updateUserRole: async (req,res) => {
        try {
            const { isAdmin} = req.body

            await Users.findByIdAndUpdate(req.params.id, { isAdmin})

            res.json({msg: 'Updated success'})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },

    deleteUser: async (req,res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: 'Deleted success',id: req.params.id})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }

}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


module.exports = userController