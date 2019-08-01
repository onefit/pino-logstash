var common = require('pino');

module.exports = function (level, msg, meta, self) {
    return common.log({
        level: level,
        message: msg,
        node_name: self.node_name,
        meta: meta,
        timestamp: self.timestamp,
        json: true,
        label: self.label
    });
};