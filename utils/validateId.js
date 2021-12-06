const ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');

const mongoId = (id) => {
    try {
        var mongoId = ObjectId(id);
        return mongoId;
    } catch(e) {
        return false;
    }
}

const arrMongoId = (arr) => {
    var ids = _.map(arr, _.partialRight(_.pick, ['id']));
    var ids = ids.map((id) => mongoId(id));
}

module.exports = {
    mongoId,
    arrMongoId
};