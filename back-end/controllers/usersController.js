const db = require("../models/dbConnect");
const createError = require("http-errors");
const upload = require("../configs/multerConfig.js");
const path = require("path");
const fs = require("fs");
const csvParser = require("csv-parser");
const { Parser } = require("json2csv"); // To convert JSON to CSV
const { signAccessToken } = require("../auth/jwtHelpers.js");
const { authSchema } = require("../auth/validateSchema");
const bcrypt = require("bcrypt");

//use the model:
const users = db.users;

module.exports = {
  // Register/Create Single User:
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

  // Bulk Upload Users:
  bulkUploadUsers: async (req, res, next) => {
    try {
      // Check if a file was uploaded
      if (!req.file) {
        throw createError.BadRequest("No file uploaded");
      }

      const filePath = path.normalize(req.file.path);
      console.log("File uploaded successfully at path:", filePath);

      const usersData = []; // Collect users data here

      // Parse CSV file and accumulate rows
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          // Push row data into usersData for later processing
          const user = {
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            password: row.password,
            roleName: row.roleName,
            branchCode: row.branchCode,
          };

          usersData.push(user);
        })

        .on("end", async () => {
          console.log("CSV file successfully read. Processing users...");
          const validUsersData = [];
          // Validate each user and check if they already exist
          for (const user of usersData) {
            try {
              await authSchema.validateAsync(user); // Validate user data
              const userExists = await users.findOne({
                where: { email: user.email },
              });

              if (!userExists) {
                // Hash the passwords before adding the users to validUsersData
                const salt = await bcrypt.genSalt(12); // 12 rounds of salting
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.password = hashedPassword; // Replace plain text password with the hashed password

                validUsersData.push(user); // Only add valid and non-existing users
              }
            } catch (error) {
              console.error(`Error processing user: ${error.message}`);
            }
          }

          console.log(`Found ${validUsersData.length} valid users to upload.`);
          console.log("Valid Users:", validUsersData);

          if (validUsersData.length === 0) {
            return res
              .status(400)
              .send({ message: "No valid users to upload." });
          }

          // Bulk insert valid users into the database
          try {
            const savedUsers = await users.bulkCreate(validUsersData);
            res.status(200).send({
              message: `${savedUsers.length} users uploaded successfully!`,
            });

            console.log(`${savedUsers.length} users uploaded successfully!`);
          } catch (bulkError) {
            console.error(
              "Error during bulk user creation:",
              bulkError.message
            );
            next(bulkError);
          } finally {
            const uploadsProcessedDir = path.join(
              __dirname,
              "../uploads_processed"
            );
            const processedFilePath = path.join(
              uploadsProcessedDir,
              path.basename(filePath)
            );
            try {
              // Move processed file from uploads/ to uploads_processed/
              fs.renameSync(filePath, processedFilePath);
              console.log(
                `Processed File successfully moved to: ${processedFilePath}`
              );
            } catch (err) {
              console.error(
                `Error moving file to uploads_processed/: ${err.message}`
              );
            }
          }
        })
        .on("error", (err) => {
          console.error("Error reading CSV file:", err.message);
          next(err); // Handle file reading errors
        });
    } catch (error) {
      next(error); // Global error handling
    }
  },
};
