caek.rollManager = function() {
    var frames = [];

    var getCurrentFrame = function() {

        if(frames.length === 0) {
            frames.push(caek.frame());
        }

        return frames[frames.length-1];
    };

    var currentFrameIsComplete = function() {
        var frame = getCurrentFrame()
        return frame.isComplete();
    };

    var addNewFrame = function() {
        frames.push(caek.frame());
    };

    var getPlayableFrame = function() {
        if (currentFrameIsComplete()) {
            addNewFrame();
        }
        return getCurrentFrame();
    };

    var getPreviousFrame = function() {
        return frames[frames.length - 2];
    };

    var isFirstFrame = function() {
        return frames.length === 1;
    }

    var setSpareBonus = function(pins) {
        if (!currentFrameIsComplete() && !isFirstFrame()) {
            getPreviousFrame().setSpareBonus(pins);
        }
    };


    return {

        // TO DO Sugar - make this take the number of the frame not the index
        getFrameScore : function(i) {
            if (!frames[i]) {
                return 0;
            }
            return frames[i].score();
        },

        addRoll : function(pins) {
            var frame = getPlayableFrame();
            frame.addRoll(pins);
            setSpareBonus(pins);
        }

    }
}