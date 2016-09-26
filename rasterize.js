var page = require('webpage').create(),
        system = require('system'),
        address, output, size,
        organizationName, authToken, domain;


if (system.args.length === 1) {
    system.args.push('https://qa-web.intendu.com/#/players/5704dd931800002927db62a3/summary/true', 'unused.pdf', 'A4', 'intendu', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjNjM5ODhkNzEwYWIzOTIyMjIwNDRlYjNjYzA4ZTkwNDc0NzM5ZDg0NGIyNGIyMGNiOTBiZTk3NjI3ZmMxNWUxM2Q3ODhkMWE4ODRjODM5NzliODkzY2ZhYmMxYzE0MjY1NDM1MmRjZjg2ZDIwNmY1YzBkZTQ1M2IzMGYzYTM2MzI5NzQ0YmJmNmFjNzkwYzQzZTdlN2Y4MGNlN2RmYzk1IiwiaXNzIjoicGxheS1zaWxob3VldHRlIiwiZXhwIjoxNDc0ODM0MjgzLCJpYXQiOjE0NzQ3OTEwODMsImp0aSI6IjAxNDFhMGJkMjhiNTllNWRkOWUyNzNmYjZhODNkMjY2ZGRkOTEyM2JiNDRhYmZhYWFhODNlOTdhZWE2YzVlMjEwYWI5YTRkNDhlZGFhOTEwOWZiYmY2NzQwMWQ4ZTMyZDgzODhkNjQ4ODI2YjM4NDdiMmViMDc3OTgzZWZjOWE2Njc5MjM0ZDBhZThkIn0.Kh3fhBY-UP6V1j1Q1JdLDkPwf0_M9vaJthyewyN0vAg', 'qa-web.intendu.com');
}

if (system.args.length < 3 || system.args.length > 7) {
    console.log('Usage: rasterize.js URL filename paperwidth*paperheight|paperformat organizationName authToken domain');
    console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
    page.viewportSize = {width: 700, height: 600};
    if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
        size = system.args[3].split('*');
        page.paperSize = size.length === 2 ? {width: size[0], height: size[1], margin: '0px'}
        : {format: system.args[3], orientation: 'portrait', margin: '1cm'};
    }
    organizationName = system.args[4];
    authToken = system.args[5];
    domain = system.args[6];

    phantom.addCookie({
        'name': 'DEFAULT_ORG_NAME', /* required property */
        'value': organizationName, /* required property */
        'domain': domain,
        'path': '/', /* required property */
        'httponly': false,
        'secure': false,
        'expires': (new Date()).getTime() + (1000 * 60 * 60)   /* <-- expires in 1 hour */
    });
    phantom.addCookie({
        'name': 'auth-token', /* required property */
        'value': authToken, /* required property */
        'domain': "intendu.com",
        'path': '/', /* required property */
        'httponly': false,
        'secure': false,
        'expires': (new Date()).getTime() + (1000 * 60 * 60)   /* <-- expires in 1 hour */
    });
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit();
        } else {
            window.setTimeout(function () {
                //page.render(output);
                page.render('/dev/stdout', {format: 'pdf'})
                phantom.exit();
            }, 30000);
        }
    });
}
































//"use strict";
//var page = require('webpage').create(),
//        system = require('system'),
//        address, output, size, header;
//
//address = 'https://qa-api.intendu.com/v1/createpdf';
//header = {
//    authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjNjM5ODhkNzEwYWIzOTIyMjIwNDRlYjNjYzA4ZTkwNDc0NzM5ZDg0NGIyNGIyMGNiOTBiZTk3NjI3ZmMxNWUxM2Q3ODhkMWE4ODRjODM5NzliODkzY2ZhYmMxYzE0MjY1NDM1MmRjZjg2ZDIwNmY1YzBkZTQ1M2IzMGYzYTM2MzI5NzQ0YmJmNmFjNzkwYzQzZTdlN2Y4MGNlN2RmYzk1IiwiaXNzIjoicGxheS1zaWxob3VldHRlIiwiZXhwIjoxNDc0OTI5NTI0LCJpYXQiOjE0NzQ4ODYzMjQsImp0aSI6IjZkN2YxMmVlY2E4ZjJlMThiNTI2MDBjYjc4Nzk2NWQ2NTBhNGU3ZWRlZDUzZjlmZjc2MjU3Y2YyZWRlMzliYmM1M2Y1ZjlkNDFiZDU2OWVkZmM5NGE3NTdkNmYzODhjZGQyODFkODQ4OWRjMGVjZDM3ZWQ4NTNkOThiOWQyYjNjNTRjMWVkNDAwMjMwIn0.8iaOScNktl90aVhaj5htxwDYTpGQzbaARWm0sJp8Vks",
//    domain: "qa-web.intendu.com",
//    organizationName: "intendu",
//    url: "https://qa-web.intendu.com/#/players/5704dd931800002927db62a3/summary/true"
//};
//output = 'test.pdf';
//page.customHeaders = header;
//page.viewportSize = {width: 600, height: 600};
//if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
//    size = system.args[3].split('*');
//    page.paperSize = size.length === 2 ? {width: size[0], height: size[1], margin: '0px'}
//    : {format: system.args[3], orientation: 'portrait', margin: '1cm'};
//} else if (system.args.length > 3 && system.args[3].substr(-2) === "px") {
//    size = system.args[3].split('*');
//    if (size.length === 2) {
//        pageWidth = parseInt(size[0], 10);
//        pageHeight = parseInt(size[1], 10);
//        page.viewportSize = {width: pageWidth, height: pageHeight};
//        page.clipRect = {top: 0, left: 0, width: pageWidth, height: pageHeight};
//    } else {
//        console.log("size:", system.args[3]);
//        pageWidth = parseInt(system.args[3], 10);
//        pageHeight = parseInt(pageWidth * 3 / 4, 10); // it's as good an assumption as any
//        console.log("pageHeight:", pageHeight);
//        page.viewportSize = {width: pageWidth, height: pageHeight};
//    }
//}
//if (system.args.length > 4) {
//    page.zoomFactor = system.args[4];
//}
//
//page.open(address, function (status) {
//    if (status !== "success") {
//        console.log("Unable to access network");
//    } else {
//        var condition = false,
//                interval = setInterval(function () {
//                    if (!condition) {
//                        console.log('Failed.');
//                        condition = page.evaluate(function () {
//                            return $('.fa.fa-hand-paper-o').is(':visible');
//                        });
//                    } else {
//                        console.log('Success!');
//                        clearInterval(interval);
//                        page.render(output);
//                        phantom.exit();
//                    }
//                }, 250);
//    }
//});