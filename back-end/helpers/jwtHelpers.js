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
    if (!req.headers["authorization"]) return next(creatError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return next(createHttpError.Unauthorized());
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
      JWT.sign(payload, secret, options, (error, token) => {
        if (error) reject(error);
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
