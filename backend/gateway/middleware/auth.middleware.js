import redis from "../../shared/redis/redis.js"
export const protect = async (req, res, next) => {
    try {
        const sessionId = req?.cookies?.session
        if (!sessionId) {
            return res.status(400).json({ message: "unauthorized |session not found" })
        }
        const session = await redis.get(`session-${sessionId}`)
        if (!session) {
            return res.status(401).json({ message: "Please Login again |session expired" })
        }
        req.user = JSON.parse(session);
        next();
    } catch (err) {
        return res.status(500).json({ message: "protect error" + err })
    }
}