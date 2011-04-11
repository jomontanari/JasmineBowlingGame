describe("A bowling game should calculate the score", function() {

    it("should score zero when no pins are knocked down", function() {

        var game = bowlingGame(10);
        game.roll(0);

        expect(game.score()).toBe(0);

    });

});