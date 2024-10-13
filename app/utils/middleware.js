import jwt from "jsonwebtoken";

// Middleware to validate JWT and extract user ID
export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("decoded: " + decoded.id);

        // Check if the user ID in the token matches the request user ID
        if (req.user && decoded.id == req.user.id) {
            return next();
        } else {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token has expired" });
        }
        console.error("JWT verification error:", err);
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};
