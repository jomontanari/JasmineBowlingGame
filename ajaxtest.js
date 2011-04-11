var DataContainer = function(element) {

	this.loadData = function() {
		$.ajax({
			url: 'http://postposttechnical.com/',
			context: document.body,
			success: putDataInElement
		});
	};

	function putDataInElement(data) {
		element.html(data);
	}

};

describe("Faking an ajax call", function() {

    it("can tell if a method has been called or not and check the parameters", function() {

        var fakeData = "This will be the new html";

        $.ajax = jasmine.createSpy().andCallFake(function(params) {
            params.success(fakeData);
        });

        var domElement = {};
        domElement.html = jasmine.createSpy("html for fake element");

        var container = new DataContainer(domElement);
        container.loadData();

        expect(domElement.html).toHaveBeenCalledWith(fakeData);
    });

    it("can tell if a method has been called or not and check the parameters", function() {

        var successCallback;
        $.ajax = jasmine.createSpy().andCallFake(function(params) {
            successCallback = params.success;
        });

        var domElement = {};
        domElement.html = jasmine.createSpy("html for fake element");

        var container = new DataContainer(domElement);
        container.loadData();

        var fakeData = "This will be the new html";
        successCallback(fakeData);

        expect(domElement.html).toHaveBeenCalledWith(fakeData);
    });

});
