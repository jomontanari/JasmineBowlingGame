caek.frame = function(i, rolls) {

    var frameScore = 0;

    return {
        score: function() {
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
        }
    }
};