import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {

    const authorization = req.headers.authorization;

    if(!authorization) {
        
        return res.status(401).json({
            message: "Token de autorização não informado!"
        });
    }

    const [scheme, token] = authorization.split(" ");

    if(scheme !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Formato de token inválido"
        });
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                algorithms: ["HS256"],
                issuer: "crud-backend",
                audience: "crud-backend-api"
            }
        );

        if(payload.role !== "admin") {

            return res.status(403).json({
                message: "Acesso não autorizado",
            });
        }

        req.auth = payload;

        next();

    } catch(error) {

        return res.status(401).json({
            message: "Token inválido ou expirado"
        });
    }
}

export default authMiddleware;

