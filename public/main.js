$(function() {
    var $h1 = $("h1");
    var $zip = $("input[name='zip']");
    var $gif = $('#loading');

    $gif.hide();

    $("form").on("submit", function(event) {

        event.preventDefault();

        var zipcode = $.trim($zip.val());
        $h1.text("");
        $gif.show();

        var request = $.ajax({
            url: "/" + zipcode,
            dataType: "json"
        });

        request.done(function(data) {
            var temperature = data.temperature;
            var timezone = data.timezone;
            $h1.html("It is " + temperature + "&#176; in " + zipcode + " - " + timezone);
            $gif.hide();
        });
        request.fail(function() {
            $h1.text("Error!");
        });
    });
});

