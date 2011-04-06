caek.rollManager = function() {
    var frames = [];
    var rolls = [];

    var getCurrentFrame = function() {

        if(frames.length === 0) {
            frames.push(caek.frame());
        }

        return frames[frames.length-1];
    };

    var currentFrameIsComplete = function() {
        return getCurrentFrame().isComplete();
    }

    var addNewFrame = function() {
        frames.push(caek.frame());
    }

    var getPlayableFrame = function() {
        if (currentFrameIsComplete()) {
            addNewFrame();
        }
        return getCurrentFrame();
    }



    return {

        getFrameScore : function(i) {
            var frame = caek.frame(i, rolls);
            return frame.score();
        },

        addRoll : function(pins) {
            rolls.push(pins);

            var frame = getPlayableFrame();
            frame.addRoll(pins);
        }

    }
}