caek.rollManager = function() {
    var rolls = [];
    var frames = [];

    var getCurrentFrame = function() {

        if(frames.length === 0)
        {
            frames.push(caek.frame());
        }

        return frames[frames.length-1];
    }

    return {

        getFrameScore : function(i) {
            i = i * 2; // turn frame index into index of first roll

            var frame = caek.frame(i, rolls);
            return frame.score();
        },

        addRoll : function(pins) {
            rolls.push(pins);

            var frame = getCurrentFrame();
            frame.addRoll(pins);
        }

    }
}