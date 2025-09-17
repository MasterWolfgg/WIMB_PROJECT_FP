
require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(requiredRoles = []) {
    return (req, res, next) => {


        // console.log("Incoming Headers: ", req.headers);
            
        const header = req.get('Authorization') || req.headers['authorization'];

        // const header1= req.headers['authorization'];
        // const header2= req.get("authorization");

        // console.log("Header1: ",header1);
        // console.log("Header2: ",header2);
        

        // const header = header2 || header1;
        if (!header || !header.startsWith("Bearer ")){
            return res.status(401).json({message: "No token provided" });

        } 


        const token =header.split(" ")[1]; // Bearer <Token>
        if(!token) return res.status(401).json({message: "Invalid token Foramt "});

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Decoded token ",decoded);
            req.user = decoded;

            if(requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
                return res.status(403).json({message:" Forbidden: insufficient rights  "});
            }

            return next();
        } catch  (err) {
            console.error('JWT Verify error: ', err.message);
            res.status(401).json({ message: "token invalid or expired "});
        }

    };
}


module.exports = auth;