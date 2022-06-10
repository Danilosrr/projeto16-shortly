export default function validateSchema (schema) {
    return function (req, res, next) {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {return res.status(422).send(error)}
        console.log("middleware passed")
        next();     
    };
};