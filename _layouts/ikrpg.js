$( document ).ready(function() {
    var db = new PouchDB('ikrpg');

    function changeBackground(imageName, topX) {
        $("body").css('background-image', 'url('+imageName+')');
        $("body").css('background-position', '50% '+topX+'px');
        $("#head").css('background-image', 'url('+imageName+')');
        $("#head").css('background-position', '50% '+(topX-66)+'px');
        $("#foot > div.banner").css('background-image', 'url('+imageName+')');
    }

    function setBackground(imageName, topX) {
        changeBackground(imageName, topX);

        db.get("bg", function(error, bg) {
            if(!error) {
                bg.name = imageName;
                bg.topX = topX;
                db.put(bg);
            }
        });
    }

    $(function() {
        db.get("bg", function(error, bg) {
            if(error) {
                bg = {
                    _id: "bg",
                    name: "/static/images/bg-FMF.jpg",
                    topX: -370
                };
                db.put(bg);
            }
            changeBackground(bg.name, bg.topX);
        });
    });
});
