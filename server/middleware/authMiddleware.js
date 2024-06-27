const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(403).json({ message: "Invalid token" });
      }

      console.log("Decoded user:", decoded);
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: Only admins can access this resource" });
  }
  next();
};
