import { User } from '../models/User.js';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

const authenticateUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        if (user.status === 'blocked') {
            return res.status(403).send({ message: "Blocked Users cannot login" });
        }
        const token = user.generateAuthToken();
        user.lastLoggedAt = new Date();
        user.save();
        res.status(200).send({ user: user, data: token, messsage: "Logged successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};


export default authenticateUser;