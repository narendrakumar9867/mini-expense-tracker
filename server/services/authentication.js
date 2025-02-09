import JWT from 'jsonwebtoken';
const secret = "+_)(0987poiu";

export function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

export function validateToken(token) {
    const payload = JWT.verify(token, secret);
    return payload;
}
