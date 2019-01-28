const cheerio = require('cheerio');
var promiseLimit = require('promise-limit');
var d3 = require('d3-dsv');
var fs = require("fs");

var limit = promiseLimit(5);

var contents = fs.readFileSync(process.argv[2]);

var syllabusList = JSON.parse(contents);

async function getHTML(syllabus) {
    
}

limit.map(syllabusList, getHTML).then()

