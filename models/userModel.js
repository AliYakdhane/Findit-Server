const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false // 0 = user, 1 = admin
        },
        isConnected: {
            type: Boolean,
            default: false // 0 = user, 1 = admin
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    },
    { collection: 'users' }
)
usersSchema.virtual('userId').get(function () {
    return this._id.toHexString()
})
usersSchema.set('toJSON', {
    virtuals: true
})
usersSchema.pre('save', async function (next) {
    try {
        /* 
    Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
    */
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
            console.log(this.isNew)
        }
        next()
    } catch (error) {
        next(error)
    }
})
usersSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}
const userModel = mongoose.model('users', usersSchema)
module.exports = userModel
