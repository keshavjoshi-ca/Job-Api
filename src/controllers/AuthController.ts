import CustomError from "../models/CustomError";
import User from "../models/UserModel";

const validateLogin = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.model.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User does not exist'
            })
        }

        const isMatch = await User.validatePassword(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Password does not Match'
            })   
        }

        const token = User.generateToken(user.name, user._id);
        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        })   
    }catch(err){
        throw new CustomError(err.message, 400)
    }
}

const registerUser = (req, res) => {
    try{
        const {email, password, name} = req.body;
        if(!email || !password || !name){
            throw new CustomError('Provide Email, Password, and Name', 400)
        }

        User.model.create(req.body).then(user => {

            const token = User.generateToken(user.name, user._id);
            if(!token){
                return res.status(400).json({
                    success: false,
                    message: 'Token Generate Issue'
                })
            }
    
            return res.status(201).json({
                success: true,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    password: user.password
                },
                token
            })
        }).catch(error => {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        })
    }catch(err){
        throw new CustomError(err.message, 500)
    }
}

const getAllUsers = async (req, res) => {
    const users = await User.model.find({});
    return res.status(200).json({
        success: true,
        users
    })
}

export const AuthController = {
    validateLogin,
    registerUser,
    getAllUsers
};