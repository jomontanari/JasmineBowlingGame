caek.rollManager = function() {
    var frames = [];

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
            return frames[i].score();
        },

        addRoll : function(pins) {
            var frame = getPlayableFrame();
            frame.addRoll(pins);
        }

    }
}