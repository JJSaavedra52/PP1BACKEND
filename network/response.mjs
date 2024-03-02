export const success = (req, res, message, status) => {
    res.status(status || 200).send({
        error: '',
        message
    });
};

export const error = (req, res, message, status, details) => {
    console.error('[response error] ' + details);
    if (res.headersSent) { // Verificar si ya se han enviado las cabeceras
        return; // Si ya se enviaron, se detiene la ejecución
    }
    res.status(status || 500).send({
        error: message,
        body: ''
    });
};
