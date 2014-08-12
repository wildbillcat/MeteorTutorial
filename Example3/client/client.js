//These are the datasubscriptions published by the server code. 
//A complete copy of the query is kept client side, and changes are
//just pushed out by the server.
Meteor.subscribe("directory"); //This is the user Directory
Meteor.subscribe("Characters"); //This is the character Directory


////////////////////////////////////////////////////////
////////Character Details
////////////////////////////////////////////////////////
Template.details.character = function () {
    return Parties.findOne(Session.get("selected"));
};

Template.details.anyParties = function () {
    return Parties.find().count() > 0;
};

//Tests for ownership of the Character
Template.details.canRemove = function () {
    return this.owner === Meteor.userId();
};

//Mouse Clicks
Template.details.events({
    'click .move_up': function () {
        Meteor.call("move", Session.get("selected"), "up");
        return false;
    },
    'click .move_down': function () {
        Meteor.call("move", Session.get("selected"), "down");
        return false;
    },
    'click .move_left': function () {
        Meteor.call("move", Session.get("selected"), "left");
        return false;
    },
    'click .move_right': function () {
        Meteor.call("move", Session.get("selected"), "right");
        return false;
    },
    'click .remove': function () {
        Parties.remove(this._id);
        return false;
    }
});

///////////////////////////////////////////////////////////////////////////////
// Map display

// Use jquery to get the position clicked relative to the map element.
var coordsRelativeToElement = function (element, event) {
    var offset = $(element).offset();
    var x = event.pageX - offset.left;
    var y = event.pageY - offset.top;
    return { x: x, y: y };
};

Template.map.events({
    'mousedown circle, mousedown text': function (event, template) {
        Session.set("selected", event.currentTarget.id);
    },
    'dblclick .map': function (event, template) {
        if (!Meteor.userId()) // must be logged in to create events
            return;
        var coords = coordsRelativeToElement(event.currentTarget, event);
        openCreateDialog(coords.x / 500, coords.y / 500);
    }
});

Template.map.rendered = function () {
    var self = this;
    self.node = self.find("svg");

    if (!self.handle) {
        self.handle = Deps.autorun(function () {
            var selected = Session.get('selected');
            var selectedcharacter = selected && Parties.findOne(selected);
            var radius = function (character) {
                return 10 + Math.sqrt(attending(character)) * 10;
            };

            // Draw a circle for each character
            var updateCircles = function (group) {
                group.attr("id", function (character) { return character._id; })
                .attr("cx", function (character) { return character.x * 500; })
                .attr("cy", function (character) { return character.y * 500; })
                .attr("r", radius)
                .attr("class", function (character) {
                    return  "public";
                })
                .style('opacity', function (character) {
                    return selected === character._id ? 1 : 0.6;
                });
            };

            var circles = d3.select(self.node).select(".circles").selectAll("circle")
              .data(Parties.find().fetch(), function (character) { return character._id; });

            updateCircles(circles.enter().append("circle"));
            updateCircles(circles.transition().duration(250).ease("cubic-out"));
            circles.exit().transition().duration(250).attr("r", 0).remove();

            // Label each with the current attendance count
            var updateLabels = function (group) {
                group.attr("id", function (character) { return character._id; })
                .text(function (character) { return attending(character) || ''; })
                .attr("x", function (character) { return character.x * 500; })
                .attr("y", function (character) { return character.y * 500 + radius(character) / 2 })
                .style('font-size', function (character) {
                    return radius(character) * 1.25 + "px";
                });
            };

            var labels = d3.select(self.node).select(".labels").selectAll("text")
              .data(Parties.find().fetch(), function (character) { return character._id; });

            updateLabels(labels.enter().append("text"));
            updateLabels(labels.transition().duration(250).ease("cubic-out"));
            labels.exit().remove();

            // Draw a dashed circle around the currently selected character, if any
            var callout = d3.select(self.node).select("circle.callout")
              .transition().duration(250).ease("cubic-out");
            if (selectedCharacter)
                callout.attr("cx", selectedCharacter.x * 500)
                .attr("cy", selectedCharacter.y * 500)
                .attr("r", radius(selectedCharacter) + 10)
                .attr("class", "callout")
                .attr("display", '');
            else
                callout.attr("display", 'none');
        });
    }
};

Template.map.destroyed = function () {
    this.handle && this.handle.stop();
};

