describe("A bowling game", function() {

    it("should calculate the score correctly after a single roll with no pins knocked down", function() {

        var game = bowlingGame();
        game.roll(0);

        expect(game.score()).toBe(0);

    });

    it("should calculate the score correctly after one frames", function() {

        var game = bowlingGame();
        game.roll(1);
        game.roll(3);

        expect(game.score()).toBe(4);

    });
});