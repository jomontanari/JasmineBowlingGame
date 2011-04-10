var bowlingGame = function (frames) {

    var rollManager = caek.rollManager();

    return {
        roll: function(numberOfPins) {
            rollManager.addRoll(numberOfPins);

        },
        score: function() {
            var score = 0;

            for (var i = 0; i < frames; i++) {
                score += rollManager.getFrameScore(i);
            }

            return score;
        }
    }
};