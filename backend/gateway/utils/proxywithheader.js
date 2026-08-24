import proxy from "express-http-proxy"

export const proxyWithHeader = (serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
                        console.log("srcReq.user:", srcReq.user);
            if (srcReq?.user?.userId) {
                proxyReqOpts.headers["x-user-id"] = srcReq.user.userId
            } 
            return proxyReqOpts
        }
    });
}