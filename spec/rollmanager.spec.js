describe("rollmanager", function() {

    var fakeFrame;

    beforeEach(function() {
        fakeFrame = {
            addRoll: jasmine.createSpy("Add roll"),
            isComplete: jasmine.createSpy("Is complete"),
            setSpareBonus: jasmine.createSpy("spare bonus")
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

    // Included to demonstrate that this turned out to be very messy

    it("should set the spare bonus for a frame to the first roll of the next frame using spies (complicated!)", function() {

        var firstFakeFrame = {
            addRoll: jasmine.createSpy("Add roll"),
            setSpareBonus : jasmine.createSpy("setting spare bonus"),
            isComplete : jasmine.createSpy("is complete").andReturn(true)
        };
        var secondFakeFrame = {
            addRoll: jasmine.createSpy("Add roll"),
            isComplete : jasmine.createSpy("is complete").andReturn(false)
        };

        spyOn(caek, "frame").andCallFake(function() {
            console.log(caek.frame.callCount);
            if (caek.frame.callCount === 1) {
                return firstFakeFrame;
            } else {
                return secondFakeFrame;
            }
        });


        var rollManager = caek.rollManager();
        rollManager.addRoll(5);
        rollManager.addRoll(3);

        expect(firstFakeFrame.setSpareBonus).toHaveBeenCalledWith(3);

    });

    it("should set the spare bonus correctly for a frame (alternative test)", function() {

        var rollManager = caek.rollManager();
        rollManager.addRoll(5);
        rollManager.addRoll(5);

        spyOn(caek, "frame").andReturn(fakeFrame);

        rollManager.addRoll(3);

        expect(rollManager.getFrameScore(0)).toBe(13)

    });

});