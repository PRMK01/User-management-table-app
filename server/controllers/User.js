import { User, validate } from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
};

export const updateUsers = async (req, res) => {
    try {
        await User.deleteMany();
        const users = await User.insertMany(req.body);
        res.status(200).json(users);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
};


export const createUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const user = await User.findOne({email: req.body.email });
        if (user) {
            return res.status(404).send({ message: "User with given email already exists!" })
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error"})
    }
}