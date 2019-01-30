const promiseLimit = require('promise-limit');

//var limit = promiseLimit(5);

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