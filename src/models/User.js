const mongoose = require ('mongoose')
const {schema} = mongoose.Aggregate
const bcrypt = require ('bcrypt')

 const UserSchema = new Schema({
    name: {type: string, require: true},
    email: {type: string, require: true},
    password: {type: string, require: true},
    date: {type: Date, default: Date.now},
})

UserSchema.methods.encryptPassword = async (password) =>{
    const salt = await abcrypt.getSalt(10);
    const encryptPassword = bcrypt.hash(password, salt)
    return encryptPassword
}

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema)