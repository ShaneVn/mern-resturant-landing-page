const jwt = require("jsonwebtoken");


const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const getRefreshToekn = (req, res, next) => {
  if (req.cookies?.jwt) {
    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;

    // Verifying refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        // Wrong Refesh Token
        return res.status(406).json({ message: "Incorrect or expired token, please sign in again" });
      } else {
        
        const userinfo = decoded;
        req.user = userinfo    
        // send newaccesstoken to the next middleware
        res.locals.newAccessToken = generateToken(userinfo)
        next();
      }
    });
  } else {
    return res.status(406).json({ message: "No Token found, please sign in again" });
  }
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        
        getRefreshToekn(req,res,next)
        
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

exports.generateRefreshToken = generateRefreshToken;
exports.generateToken = generateToken;
exports.isAuth = isAuth;
