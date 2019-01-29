const cheerio = require('cheerio');
const promiseLimit = require('promise-limit');
const d3 = require('d3-dsv');
const fs = require("fs");
const got = require("got");
const path = require("path");

//var limit = promiseLimit(5);

var contents = fs.readFileSync(process.argv[2]);

var syllabusList = JSON.parse(contents);

// async function getHTML(syllabus) {

//     if (syllabus.url != undefinded){

//     try{
//         var response = await got(syllabus.url);
//         var $ = cheerio.load(response.body);
//         var syllabusText = $('#article').text();

//         syllabusText = syllabusText.replace(/\s+/gm, ' ');

//         var isItPresent = /kip\sharris/gim.test(syllabusText);

//         return isItPresent;

//     } catch(error){
//         console.log(error.response.body);
//     }

//     }
// }

// limit.map(syllabusList, getHTML(syllabus)


// ).then()

async function findTheString() {
    let results = [];

    for (let i = 0; i < syllabusList.length; i++) {
        try {
            if (syllabusList[i].url && syllabusList[i].url != undefined) {
                let response = await got(syllabusList[i].url);
                if (response.statusCode === 200) {

                    let $ = cheerio.load(response.body);
                    let syllabusText = $('#article').text();

                    console.log(syllabusList[i].url);

                    syllabusText = syllabusText.replace(/\s+/gm, ' ');

                    var isItPresent = /kip\sharris|\(?208\)?\-?498\-?9200|harrisk\@byui\.edu/gim.test(syllabusText);

                    if (isItPresent == true) {
                        results.push({
                            'Course': syllabusList[i].course,
                            'Is It Present': "Yes"
                        });
                    }else{
                        results.push({
                            'Course': syllabusList[i].course,
                            'Is It Present': "No"
                        });
                    }
                } else {


                }
            } else {
                console.log(syllabusList[i].course);
                results.push({
                    'Course': syllabusList[i].course,
                    'Is It Present': "No Syllabus"
                });
            }

        } catch (error) {
            results.push({
                'Course': syllabusList[i].course,
                'Is It Present': 'url for syllabus doesnt work'
            })
        }
    }


    return results;


}

async function main() {
    try {
        var results = await findTheString();
        console.log(results);

        var csvData = d3.csvFormat(results, [
            "Course",
            "Is It Present"
        ]);
        console.log(path.resolve());
        fs.writeFileSync(path.resolve('./results.csv'), csvData);
    } catch (error) {
        console.log(error);
    }
}

main();