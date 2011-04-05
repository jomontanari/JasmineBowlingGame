var bowlingGame = function () {

    var score = 0;

    return {
        roll: function(numberOfPins) {
            score += numberOfPins;
        },
        score: function() {
            return score;
        }
    }
};