caek.frame = function() {

    var frameRolls = [];
    var bonusForSpare = 0;
    var bonusForStrike = 0;

    var maximumRollsReached = function() {
        return frameRolls.length === 2;
    };

    var isStrike = function() {
        return (frameRolls.length === 1 && totalPinsKnockedDown() === 10)
    };

    var isSpare = function() {
        return (!isStrike() && (totalPinsKnockedDown() === 10));
    };

    var totalPinsKnockedDown = function() {
        var totalPins = 0;
        for (var i = 0; i < frameRolls.length; i++) {
            totalPins += frameRolls[i];
        }
        return totalPins;
    }

    var score = function() {
        frameScore = totalPinsKnockedDown();
        if (isStrike()) frameScore += bonusForStrike;
        if (isSpare()) frameScore += bonusForSpare;
        return frameScore;
    };

    return {

        score: score,

        isComplete: function() {
            return maximumRollsReached() || isStrike();
        },

        addRoll: function (numberOfPins) {
            frameRolls.push(numberOfPins);
        },

        setSpareBonus: function(spareBonus) {
            bonusForSpare = spareBonus;
        },

        setStrikeBonus: function(strikeBonus) {
            bonusForStrike = strikeBonus;
        }
    }
};