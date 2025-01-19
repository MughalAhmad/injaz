
const helper = require('../utils/helper');
const intailHelper = async (req, res, next) => {
    res.locals.getLastDigits = helper.getLastDigits;
    res.locals.currentYear = helper.currentYear;
    res.locals.formatDate = helper.formatDate;

    next();
}

module.exports = intailHelper;
