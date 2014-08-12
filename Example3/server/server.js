// D&D Table Top -- server

Meteor.publish("directory", function () {
    return Meteor.users.find({}, { fields: { username: 1, profile: 1 } });
});

Meteor.publish("Characters", function () {
    return Characters.find({});
});
