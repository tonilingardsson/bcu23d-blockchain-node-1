const ErrorResponseModel = class extends Error {
    constructor(message, statusCode = 500) {
        // Doing an ext of error,
        // to use other class parameters in the constructor use super
        super(message);
        this.success = statusCode >= 200 && statusCode < 300;
        this.statusCode = statusCode;
        this.status = this.setStatus();
    }
    setStatus() {
        switch (this.statusCode) {
            case 400:
                return 'Bad Request';

            case 401:
                return 'Unauthorized';

            case 403:
                return 'Forbidden';

            case 404:
                return 'Not Found';

            default:
                return 'Internal Server Error';
        }
    }
};

export default ErrorResponseModel;