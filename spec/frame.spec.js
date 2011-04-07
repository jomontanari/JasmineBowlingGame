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

    it("should correctly calculate a score as the sum of two rolls", function() {

        var frame = caek.frame();
        frame.addRoll(3);
        frame.addRoll(2);

        expect(frame.score()).toBe(5);

    });

    it("should correctly calculate the score of a spare including the bonus", function() {

        var frame = caek.frame();
        frame.addRoll(9);
        frame.addRoll(1);
        frame.setSpareBonus(4);


        expect(frame.score()).toBe(14);
    });

    it("should correctly calculate the score of a strike including the bonus", function() {

        var frame = caek.frame();
        frame.addRoll(10);
        frame.setStrikeBonus(8);

        expect(frame.score()).toBe(18);
    });
});