import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
// import JoiPasswordComplexity from 'joi-password-complexity';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastLoggedAt: {
        type: Date,
        default: () => new Date(),
        // default: () => Date.now(),
    },
    registeredAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    status: {
        type: String,
        default: 'active'
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY);
    return token
};

export const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data)
};


export const User = mongoose.model('User', userSchema);
