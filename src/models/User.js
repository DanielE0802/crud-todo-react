const mongoose = require ('mongoose')
const {Schema} = mongoose
const bcrypt = require ('bcryptjs')

const UserSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    date: {type: Date, default: Date.now},
})

UserSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt)
    return hashedPassword
}

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema)