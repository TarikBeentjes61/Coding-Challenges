const rateLimitWindowMs = (60 * 1000); //Minute
const maxRequestsPerWindow = 100;
const ipRequestMap = {};
let intervalId = null;

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


function startLimiterCleanup() {
  if (!intervalId) {
    intervalId = setInterval(cleanIpAddresses, 60 * 60 * 1000); // every hour
  }
}

function clearLimiterInterval() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

startLimiterCleanup(); 

module.exports = {
  rateLimiter,
  startLimiterCleanup,
  clearLimiterInterval
};

