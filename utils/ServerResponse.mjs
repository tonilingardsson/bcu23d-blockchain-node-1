const ServerResponse = class {
    constructor({ status, error, data }) {
        this.success = status >= 200 && status < 300;
        this.status = status;
        this.error = error || null;
        this.items = data ? (Array.isArray(data) ? data.length : 1) : 0;
        this.data = data || null;
    }
};

export default ServerResponse;