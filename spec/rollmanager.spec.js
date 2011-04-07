describe("rollmanager", function() {

    var fakeFrame;

    beforeEach(function() {
        fakeFrame = {
            addRoll: jasmine.createSpy("Add roll"),
            isComplete: jasmine.createSpy("Is complete")
        };
    });

    // it complained if this function wasn't at the end ... weird
    it("should create a new frame if the current frame is complete (with real object)", function() {

        spyOn(caek, "frame").andCallThrough();

        var rollManager = caek.rollManager();
        rollManager.addRoll(5);
        rollManager.addRoll(2);
        rollManager.addRoll(5);

        expect(caek.frame.callCount).toBe(2);

    });

    it("should create a new frame if there isn't a current frame", function() {

        var rollManager = caek.rollManager();

        spyOn(caek, "frame").andReturn(fakeFrame);
        rollManager.addRoll(5);

        expect(caek.frame).toHaveBeenCalled();


    });


    it("should add the first roll to the first frame", function() {

        spyOn(caek, "frame").andReturn(fakeFrame);

        var rollManager = caek.rollManager();
        var pins = 2;
        rollManager.addRoll(pins);

        expect(caek.frame).toHaveBeenCalled();
        expect(fakeFrame.addRoll).toHaveBeenCalledWith(pins);
    });

    it("should add the roll to the current frame if it isn't complete yet", function() {

        spyOn(caek, "frame").andReturn(fakeFrame);

        var rollManager = caek.rollManager();
        rollManager.addRoll(5);
        rollManager.addRoll(2);

        expect(caek.frame.callCount).toBe(1);
        expect(fakeFrame.addRoll.callCount).toBe(2);
    });

    it("should create a new frame if the current frame is complete (with Spy)", function() {

        spyOn(caek, "frame").andReturn(fakeFrame);

        fakeFrame.isComplete = jasmine.createSpy().andReturn(false);

        var rollManager = caek.rollManager();
        rollManager.addRoll(5);

        fakeFrame.isComplete = jasmine.createSpy().andReturn(true);
        rollManager.addRoll(2);

        expect(caek.frame.callCount).toBe(2);
    });

    it("should correctly retrieve the score for a frame", function() {

        var rollManager = caek.rollManager();
        rollManager.addRoll(5);
        rollManager.addRoll(2);
        rollManager.addRoll(6);
        rollManager.addRoll(3);

        var frameOneScore = rollManager.getFrameScore(0);
        var frameTwoScore = rollManager.getFrameScore(1);

        expect(frameOneScore).toBe(7);
        expect(frameTwoScore).toBe(9);
    });

    it("should return 0 for a frame that's not played yet", function() {

        var rollManager = caek.rollManager();

        var frameNotPlayedYetScore = rollManager.getFrameScore(0);
        expect(frameNotPlayedYetScore).toBe(0);


    });
});