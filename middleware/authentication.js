import {validateToken} from "../services/authentication.js";

function checkforAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookievalue = req.cookies[cookieName];
        if (!tokenCookievalue) {
            return next();
        }

        try {
            const userpayload = validateToken(tokenCookievalue);
            req.user = userpayload;
        } catch (error) {
            console.error("token failed:" , error);
        }
        return next();
    }
}


export default checkforAuthenticationCookie;