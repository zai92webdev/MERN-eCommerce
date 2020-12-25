const uploadImg = require("../middleware/uploadImage")
const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadImgController = {
    uploadAvatar: (req,res) => {
        try {

            const file = req.files.file
            
            cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'avatar', width: 150, height: 150, crop:"fill"
            }, async(err, result) => {
                if(err) throw err;

                removeTmp(file.tempFilePath)

                res.json({url:result.secure_url})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    uploadProduct: (req,res) => {
        try {

            const file = req.files.file
            
            cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'products', width: 470, height: 560, crop:"fill"
            }, async(err, result) => {
                if(err) throw err;

                removeTmp(file.tempFilePath)

                res.json({url:result.secure_url})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}


module.exports = uploadImgController