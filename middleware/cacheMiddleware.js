const cache = new Map();
const TTL = 60000;

function cacheMiddleware(req, res, next) {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        res.on('finish', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                cache.clear();
            }
        });
        return next();
    }

    if (req.method === 'GET') {
        const key = req.originalUrl || req.url;
        const cachedResponse = cache.get(key);

        if (cachedResponse) {
            const isExpired = Date.now() - cachedResponse.createdAt > TTL;
            if (!isExpired) {
                res.set('X-Cache', 'HIT');
                return res.json(cachedResponse.data);
            }
            cache.delete(key);
        }

        res.set('X-Cache', 'MISS');
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                cache.set(key, {
                    data: body,
                    createdAt: Date.now()
                });
            }
            return originalJson(body);
        };
        return next();
    }

    next();
}

module.exports = cacheMiddleware;
