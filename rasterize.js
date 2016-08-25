"use strict";
var page = require('webpage').create(),
        system = require('system'),
        address, output, size;

address = 'https://nepreberaci.com/Dashboard';
output = 'test.pdf';
page.viewportSize = {width: 600, height: 600};
if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
    size = system.args[3].split('*');
    page.paperSize = size.length === 2 ? {width: size[0], height: size[1], margin: '0px'}
    : {format: system.args[3], orientation: 'portrait', margin: '1cm'};
} else if (system.args.length > 3 && system.args[3].substr(-2) === "px") {
    size = system.args[3].split('*');
    if (size.length === 2) {
        pageWidth = parseInt(size[0], 10);
        pageHeight = parseInt(size[1], 10);
        page.viewportSize = {width: pageWidth, height: pageHeight};
        page.clipRect = {top: 0, left: 0, width: pageWidth, height: pageHeight};
    } else {
        console.log("size:", system.args[3]);
        pageWidth = parseInt(system.args[3], 10);
        pageHeight = parseInt(pageWidth * 3 / 4, 10); // it's as good an assumption as any
        console.log("pageHeight:", pageHeight);
        page.viewportSize = {width: pageWidth, height: pageHeight};
    }
}
if (system.args.length > 4) {
    page.zoomFactor = system.args[4];
}

page.open(address, function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        var condition = false,
                interval = setInterval(function () {
                    if (!condition) {
                        console.log('Failed.');
                        condition = page.evaluate(function () {
                            return $('.fa.fa-hand-paper-o').is(':visible');
                        });
                    } else {
                        console.log('Success!');
                        clearInterval(interval);
                        page.render(output);
                        phantom.exit();
                    }
                }, 250);
    }
});