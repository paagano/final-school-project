const db = require("../models/dbConnect");
const createError = require("http-errors");
const { signAccessToken } = require("../auth/jwtHelpers.js");
const { authSchema } = require("../auth/validateSchema");

//use the model:
const users = db.users;

module.exports = {
  // Register User:
  registerUser: async (req, res, next) => {
    try {
      const { email, password, firstName, lastName, roleName, branchCode } =
        await authSchema.validateAsync(req.body);

      const userExists = await users.findOne({ where: { email } });

      if (userExists)
        throw createError.Conflict(`${email} has already been registered`);
      const newUser = new users({
        email,
        password,
        firstName,
        lastName,
        roleName,
        branchCode,
      });

      const savedUser = await newUser.save();
      const accessToken = await signAccessToken(savedUser.userId);
      res.send({ accessToken });
    } catch (error) {
      next(error);
    }
  },

  //Login User:
  loginUser: async (req, res, next) => {
    try {
      // const result = await authSchema.validateAsync(req.body);
      const result = await req.body;
      const user = await users.findOne({ where: { email: result.email } });

      if (!user) throw createError.NotFound("User not registered");

      //Matching the password
      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch)
        throw createError.Unauthorized("Username/Password is not correct");

      //If Password matches, then generate token:
      const accessToken = await signAccessToken(user.userId, user.roleName);
      const refreshToken = await signAccessToken(user.userId);

      //Extracting the user role IF user is found:
      const roleName = user.roleName;

      res.send({ accessToken, refreshToken, roleName }); // including role name value in the response body
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Invalid username/password"));
      next(error);
    }
  },

  // Get a single user by Id:
  getUser: async (req, res, next) => {
    try {
      let id = req.params.userId;
      let user = await users.findOne({ where: { userId: id } });

      if (!user) {
        throw createError(404, "User does not exist");
      }
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },

  // get all users:
  getAllUsers: async (req, res, next) => {
    try {
      let allUsers = await users.findAll({});
      res.status(200).send(allUsers);
    } catch (error) {
      next(error);
    }
  },

  // update user:
  updateUser: async (req, res, next) => {
    try {
      let id = req.params.userId;

      const user = await users.findOne({ where: { userId: id } });

      // Check if user exists:
      if (!user) {
        throw createError(404, "User does not exist");
      }

      await users.update(req.body, { where: { userId: id } });

      res.status(200).send("User updated successfully");
    } catch (error) {
      next(error);
    }
  },

  // delete user:
  deleteUser: async (req, res, next) => {
    try {
      let id = req.params.userId;

      // Check if user exists:
      const user = await users.findOne({ where: { userId: id } });

      if (!user) {
        return res
          .status(400)
          .json({ error: "The selected user does not exist" });
      } else {
        await users.destroy({ where: { userId: id } });
        res.status(200).send("User deleted successfully");
      }
    } catch (error) {
      next(error);
    }
  },
};
