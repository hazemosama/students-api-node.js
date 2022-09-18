const Ajv = require("ajv");

const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "pattern": "^[A-Z][a-z]*$"
        },
        "dept": {
            "type": "string",
            "enum": ["SD", "SA", "MD", "CS"],
            "minLength": 2,
            "maxLength": 2,
        }
    },
    "required": ["name", "dept"],
    "minProperties": 2,
    "maxProperties": 2
};

const ajv = new Ajv();

module.exports = ajv.compile(schema);