
//Collection of characters in the match
Characters = new Meteor.Collection("Characters");

var Schemas = {};

//Character Schema
Schemas.Character = new SimpleSchema({
    name: {
        type: String,
        label: "Character Name",
        max: 200
    },
    owner: {
        type: String,
        label: "Owner ID"
    },
    x1: {
        type: Number,
        label: "X1 Coordinate"
    },
    y1: {
        type: Number,
        label: "Y1 Coordinate"
    },
    x2: {
        type: Number,
        label: "X2 Coordinate"
    },
    y2: {
        type: Number,
        label: "Y2 Coordinate"
    },
    size: {
        type: Number,
        label: "Character size (1 <=Med, 2 Large, 3 Huge, 5 Gargantuan, 6 Colossal",
        min: 1,
        max: 6
    },
    initiative: {
        type: Number,
        label: "Character's Initiative Roll",
        optional: true
    },
    icon: {
        type: String,
        label: "Character Icon",
        optional: true
    }
});

//Attaches the character schema to the collection
Characters.attachSchema(Schemas.Character); 

//User Schema
Schema.User = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    createdAt: {
        type: Date
    }
});

Meteor.users.attachSchema(Schema.User);