const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (UserId, userRole) => {
    return new Promise((resolve, reject) => {
      const payload = { UserId, roleName: userRole };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "AganoTechnologies.com",
        audience: UserId.toString(),
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError(err.message));
        }
        resolve(token);
      });
    });
  },

  //Middleware to verify access token:
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"])
      return next(
        createError.Unauthorized("Unauthorized: No authentication token found")
      );

    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" "); //will return an array with 2 items: "Bearer" and "the token"
    const token = bearerToken[1]; // returns the token only, without the word "Bearer"

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return next(
          createError.Unauthorized(
            "Unauthorized: Kindly sign-in first to be able to perform this action"
          )
        );
      }
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (UserId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "AganoTechnologies.com",
        audience: UserId,
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
          if (err) return reject(createError.Unauthorized());
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
          createError.Forbidden(
            "Sorry, you do not have permission to perform this action!"
          )
        );
      }
      next();
    };
  },
};
