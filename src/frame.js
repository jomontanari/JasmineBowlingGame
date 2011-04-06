caek.frame = function(i, rolls) {

    var frameRolls = [];

    var maximumRollsReached = function() {
        return frameRolls.length === 2;
    };

    var isStrike = function() {
        return (frameRolls.length === 1 && score() === 10)
    };

    var score = function() {
        var frameScore = 0;
        for (var i=0;i<frameRolls.length;i++) {
            frameScore += frameRolls[i];
        }
        return frameScore;
    };

    return {

        score: function() {
            var frameScore = 0;

            if (rolls[i]) { // do we have that many rolls

                frameScore = rolls[i]; // add first role

                if (rolls[i + 1]) {  // is there a second role
                    frameScore += rolls[i + 1];
                }

                if (frameScore === 10) {
                    if (rolls[i + 2]) {
                        frameScore += rolls[i + 2];    // is it a spare
                    }
                }
            }
            return frameScore;
        },

        isComplete: function() {
            return maximumRollsReached() || isStrike();
        },

        addRoll: function (numberOfPins) {
            frameRolls.push(numberOfPins);
        }
    }
};