const ResponseModel = class {

    constructor({ statusCode, error, data }) {
        this.success = statusCode >= 200 && statusCode < 300;
        this.statusCode = statusCode;
        this.error = error;
        this.items = data ? (Array.isArray(data) ? data.length : 1) : 0;
        this.data = data;
    }
};

export default ResponseModel