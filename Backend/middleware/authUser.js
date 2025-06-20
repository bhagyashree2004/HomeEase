// import jwt from 'jsonwebtoken'

// // user authentication middleware
// const authUser = async (req, res, next) => {

//     const authHeader = req.headers['authorization']; // Authorization header
//     const token = authHeader && authHeader.split(' ')[1]; // Extract token after "Bearer"
//     // const { token } = req.headers

    
//     if (!token) {
//         return res.json({ success: false, message: 'Not Authorized Login Again' })
//     }
//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         req.body.userId = token_decode.id
//         next();
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// export default authUser;


// import jwt from 'jsonwebtoken'

// User authentication middleware
// const authUser = async (req, res, next) => {
//     const authHeader = req.headers['authorization']; // Authorization header
//     const token = authHeader && authHeader.split(' ')[1]; // Extract token after "Bearer"

//     if (!token) {
//         return res.json({ success: false, message: 'Not Authorized. Login Again' });
//     }

//     try {
//         // Verify token and decode
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Assign the user info to req.user
//         req.user = { id: token_decode.id };  // Set the user ID here instead of req.body
        
//         next(); // Continue to the next middleware or route handler
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// export default authUser;



import jwt from 'jsonwebtoken';

// User authentication middleware
const authUser = async (req, res, next) => {
    const authHeader = req.headers['authorization']; // Authorization header
    const token = authHeader && authHeader.split(' ')[1]; // Extract token after "Bearer"

    // If no token is provided, respond with an error
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Please login again.' });
    }

    try {
        // Decode the token using JWT_SECRET
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Assign the decoded user ID to req.userId (instead of req.body.userId)
        req.userId = token_decode.id; 

        // Proceed to the next middleware or controller
        next();
    } catch (error) {
        // If token is invalid or expired, respond with an error
        console.error("Error in token verification:", error);
        res.json({ success: false, message: 'Invalid or expired token. Please login again.' });
    }
}

export default authUser;

