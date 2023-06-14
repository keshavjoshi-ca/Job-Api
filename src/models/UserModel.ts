import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email must be provided'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password must be provided']
    },
    name: {
        type: String,
        required: [true, 'Name is too short'],
        minLength: 3
    }
});

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const generateToken = function(name, id) {
    const token = jwt.sign(
        {name, id},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        }
    )
    return token;
}

const validatePassword = async function(password, hash) {
    return await bcrypt.compare(password, hash);
}

const User = {
    model: mongoose.model('User', UserSchema),
    generateToken,
    validatePassword
};

export default User; 