describe("rollmanager", function() {

    var fakeFrame;

    beforeEach(function(){
        fakeFrame = {
            addRoll: jasmine.createSpy("Add roll")
        };
    });

    it("should create a new frame if there isn't a current frame", function() {

        var rollManager = caek.rollManager();
        
        caek.frame = jasmine.createSpy("Created a new frame").andReturn(fakeFrame);
        rollManager.addRoll(5);

        expect(caek.frame).toHaveBeenCalled();


    });

    it("should add the first roll to the first frame", function() {

        caek.frame = jasmine.createSpy("Created new frame").andReturn(fakeFrame);

        var rollManager = caek.rollManager();
        var pins = 2;
        rollManager.addRoll(pins)

        expect(caek.frame).toHaveBeenCalled();
        expect(fakeFrame.addRoll).toHaveBeenCalledWith(pins);
    });

    it("should add the roll to the current frame if it isn't complete yet", function() {

        caek.frame = jasmine.createSpy("Created new frame").andReturn(fakeFrame);

        var rollManager = caek.rollManager();
        rollManager.addRoll(5)
        rollManager.addRoll(2)

        expect(caek.frame.callCount).toBe(1);
        expect(fakeFrame.addRoll.callCount).toBe(2);
    });

});