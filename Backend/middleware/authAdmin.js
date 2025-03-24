// import jwt from "jsonwebtoken"

// admin authentication middleware
// const authAdmin = async (req, res, next) => {
//     try {
//         const { atoken } = req.headers
//         if (!atoken) {
//             return res.json({ success: false, message: 'Not Authorized Login Again' })
//         }
//         const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
//         if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.json({ success: false, message: 'Not Authorized Login Again' })
//         }
//         next()
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// export default authAdmin;



import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        // console.log("🔹 Incoming Request Headers:", req.headers); // Check headers
        
        // Extract token from Authorization header
        const atoken = req.headers.authorization?.split(" ")[1];
        // console.log("🔹 Extracted Token:", atoken); // Debug extracted token

        if (!atoken) {
            console.log("❌ No Token Found");
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

        // Verify JWT token
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        // console.log("🔹 Decoded Token:", token_decode); // Check token payload

        // Check if token email matches admin email
        if (!token_decode || token_decode.email !== process.env.ADMIN_EMAIL) {
            console.log("❌ Token Email Mismatch");
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // Attach admin info to request
        req.admin = token_decode;

        // console.log("✅ Admin Authenticated");
        next();
    } catch (error) {
        // console.error("❌ JWT Verification Error:", error.message);
        res.status(401).json({ success: false, message: "Invalid Token, Login Again" });
    }
};

export default authAdmin;
