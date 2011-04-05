var rollManager = function() {
    var rolls = [];

    return {

        getFrameScore : function(i) {
            i = i * 2; // turn frame index into index of first roll

            var frame = caek.frame(i, rolls);
            return frame.score();
        },

        addRoll : function(pins) {
            rolls.push(pins);
        }

    }
}