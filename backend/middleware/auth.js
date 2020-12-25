const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        
        const token = req.header('Auth-token')
    
        if(!token) return res.status(401).json({msg: 'Invalid authentication'})

        const verified = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)

        if(!verified)
        return res
            .status(401)
            .json({msg: 'Token verification failed, authorization denied.'})

        req.user = verified.id
        next()
        
    } catch (err){
        res.status(500).json({msg: err.message})
    }
}

module.exports = auth