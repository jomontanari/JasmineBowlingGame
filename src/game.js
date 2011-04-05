var bowlingGame = function (frames) {

    var manager = rollManager();

    return {
        roll: function(numberOfPins) {
            manager.addRoll(numberOfPins);

        },
        score: function() {
            var score = 0;

            for (var i = 0; i < frames; i++) {
                score += manager.getFrameScore(i);
            }

            return score;
        }
    }
};