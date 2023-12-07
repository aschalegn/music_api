import { Router } from "express";
import Joi from "joi";
import { userController } from "./controllers/index.js";
import { asyncWrap } from "../../utils/asyncWrap.js";
import { authenticate, authorize } from "../../middlewares/auth.js";
const router = Router();

const registerSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email({ tlds: { allow: ['il', 'com', 'net'] } }).required(),
});

const validate = (req, res, next) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) throw Error(error);
        // if not error
        next();
    } catch (error) {
        next(error);
    }
};

router.get("/", authenticate, authorize(["admin", "regular"]), asyncWrap(userController.getUsersList));
// router.get("/init", authenticate, (req, res) => { res.send({}) });
router.get("/users-from-api", asyncWrap(userController.getUsersFromAPI));
router.post("/register", validate, asyncWrap(userController.register));
router.post("/login", asyncWrap(userController.loginUser));


const joiSchema = {
    register: Joi.object({
        name: Joi.string().required(),
        password: Joi.string().min(8).required(),
        role: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['il', 'com', 'net'] } }).required(),
    }),
    login: Joi.object({
        password: Joi.string().min(8).required(),
        email: Joi.string().email({ tlds: { allow: ['il', 'com', 'net'] } }).required(),
    })
};

export default router;