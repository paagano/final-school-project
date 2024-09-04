const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");

module.exports = {
  signAccessToken: (userId, userRole) => {
    return new Promise((resolve, reject) => {
      const payload = { userId, roleName: userRole };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "AnayaTechnologies.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (error, token) => {
        if (error) reject(error);
        resolve(token);
      });
    });
  },

  //middleware to verify access token:
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"])
      return next(
        createHttpError.Unauthorized(
          "Unauthorized: No authorization token found"
        )
      );

    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" "); //will return an array with 2 items: "Bearer" and "the token"
    const token = bearerToken[1]; // returns the token only, without the word "Bearer"

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return next(
          createHttpError.Unauthorized(
            "Unauthorized: Kindly sign-in first to be able to perform this action"
          )
        );
      }
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "AnayaTechnologies.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createHttpError.Unauthorized());
          const userId = payload.aud;

          resolve(userId);
        }
      );
    });
  },

  // Restricting resource access by role:
  restrict: (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.payload.role;

      if (!userRole || !allowedRoles.includes(userRole)) {
        return next(
          createHttpError.Forbidden(
            "Sorry, you do not have permission to perform this action!"
          )
        );
      }

      next();
    };
  },
};
