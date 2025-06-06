const rateLimitWindowMs = (60 * 1000); //Minute
const maxRequestsPerWindow = 100;
const ipRequestMap = {};

function rateLimiter(req, res, next) {
    const ip = req.ip;
    const currentTime = Date.now();

    if (!ipRequestMap[ip]) {
        ipRequestMap[ip] = [];
    }

    ipRequestMap[ip] = ipRequestMap[ip].filter(
        timeStamp => currentTime - timeStamp < rateLimitWindowMs
    );

    if (ipRequestMap[ip].length >= maxRequestsPerWindow) {
        return res.status(429).json({ message: 'Too many requests, please slow down.' });
    }

    ipRequestMap[ip].push(currentTime);
    next();
}

setInterval(cleanIpAddresses, ((60 * 1000) * 60)); //Per hour
function cleanIpAddresses() {
  const now = Date.now();
  for (const ip in ipRequestMap) {
    ipRequestMap[ip] = ipRequestMap[ip].filter(
      timeStamp => now - timeStamp < rateLimitWindowMs
    );
    if (ipRequestMap[ip].length === 0) {
      delete ipRequestMap[ip];
    }
  }
  console.log("Cleaned old IPs");
}

module.exports = rateLimiter;
