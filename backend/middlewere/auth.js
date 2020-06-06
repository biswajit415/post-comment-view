var { user } = require('../models/user');

let auth = (req, res, next) => {

    user.findById({ _id: req.params.id }, (err, result) => {

        token = result.token;
        if (token) {

            next()
        } else
            res.json(
                {
                    authentication: false
                }
            )

    })
}
module.exports = auth;