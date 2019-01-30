const cheerio = require('cheerio');
const d3 = require('d3-dsv');
const fs = require("fs");
const got = require("got");
const path = require("path");

// Get the json file fromt he second argument
var contents = fs.readFileSync(process.argv[2]);
// Parse the json to get the objects needed
var syllabusList = JSON.parse(contents);

// Use the findTheString function to find the specific name, phone number, or email in the body of the syllabus
async function findTheString() {
    //store the results in an array
    let results = [];

    //use a for loop to go through each syllabus one by one
    for (let i = 0; i < syllabusList.length; i++) {
        try {

            // check to see that the url exists and that it is not undefined
            if (syllabusList[i].url && syllabusList[i].url != undefined) {
                // use got to get the html from the page
                let response = await got(syllabusList[i].url);
                // If you recieve a successful status code
                if (response.statusCode === 200) {

                    // use cherrios to pull the text out and create a string
                    let $ = cheerio.load(response.body);
                    let syllabusText = $('#article').text();

                    //print the URL to the console if it works
                    console.log(syllabusList[i].url);

                    // replace multiple spaces with just one space
                    syllabusText = syllabusText.replace(/\s+/gm, ' ');

                    // check the text to see if it matches any of the regex that is given
                    var isItPresent = /kip\sharris|\(?208\)?\-?498\-?9200|harrisk\@byui\.edu/gim.test(syllabusText);

                    //if it returns true push it onto the array with the course and yes, else push no
                    if (isItPresent == true) {
                        results.push({
                            'Course': syllabusList[i].course,
                            'Is It Present': "Yes"
                        });
                    } else {
                        results.push({
                            'Course': syllabusList[i].course,
                            'Is It Present': "No"
                        });
                    }
                } else {


                }
            } else {
                // if the course syllabus doesnt exist, print the course to the console
                console.log(syllabusList[i].course);
                // push the course and no syllabus
                results.push({
                    'Course': syllabusList[i].course,
                    'Is It Present': "No Syllabus"
                });
            }

        } catch (error) {
            // if there us an error for any reason push the course and that the url is not working
            results.push({
                'Course': syllabusList[i].course,
                'Is It Present': 'url for syllabus doesnt work'
            })
        }
    }

    // return the array
    return results;

}

async function main() {
    // find the string and then write it out to a csv file
    try {
        var results = await findTheString();

        var csvData = d3.csvFormat(results, [
            "Course",
            "Is It Present"
        ]);
        fs.writeFileSync(path.resolve('./results.csv'), csvData);
    } catch (error) {
        console.log(error);
    }
}

// call main
main();