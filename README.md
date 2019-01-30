# html-text-searcher
## Description 
This tool was created to search a list of urls for a name, phone number and email. It then will output a csv
file that shows if the items are contained, and if not it will say whether or not the url is working.

## How to Install

Standard Install

1. Clone this repository:
    ```bash
    git clone https://github.com/byuitechops/html-text-searcher.git
    ```
1. Step into the folder that was just created 
    ```bash
    cd ./html-text-searcher
    ```
1. To install dependancies, run:
    ```bash
    npm i
    ```

1. To initialize the program, run:
    ```bash
    npm start
    ```
<!--- TODO: Add Additional Installation/Set Up Instructions, then delete this comment  --->

## How to Use
You need to have a json document already created. 
the variables inside the object should be as follows:

```bash
{
    "course": "comp-ACCTG205",
    "url": "https://content.byui.edu/integ/gen/19247ef2-d200-4e12-aff0-33980b734e13/0/acctg205syllabus.html"
}
```
This needs to be provided as the second argument.
Currently the default file is allTheSyllabus, which is included, however if you would like to use another, run:

```bash
node main.js yourFile.json
```
