describe("the frame", function() {

    it("should be complete if two rolls have been made", function() {

        var frame = caek.frame();
        frame.addRoll(3);
        frame.addRoll(5);

        expect(frame.isComplete()).toBeTruthy();

    });

    it("should be complete if all the skittles are knocked down", function() {

        var frame = caek.frame();
        frame.addRoll(10);

        expect(frame.isComplete()).toBeTruthy();
    });

    it("should be incomplete if first roll does not knock down all skittles", function() {

        var frame = caek.frame();
        frame.addRoll(3);

        expect(frame.isComplete()).toBeFalsy();
    });

});