export class AppError extends Error {
    constructor({ message, httpStaus, domain, url, method, timeStemp }) {
        super(message);
        this.httpStaus = httpStaus;
        this.domain = domain;
        this.url = url;
        this.method = method;
        this.timeStemp = timeStemp;
    };
};