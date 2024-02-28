export const success = (req, res, message, status) => {
    res.status(status || 200).send({
        error: '',
        message
    });
};

export const error = (req, res, message, status, details) => {
    console.log('[response error] ' + details);
    res.status(status || 500).send({
        error: message,
        body: ''
    });
};
