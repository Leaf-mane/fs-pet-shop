import fs from 'fs'

if (process.argv.length < 3) {
    console.error("Usage: node fs.js [read | create | update | destroy]");
    process.exit(1);
  }

const subcommand = process.argv[2];



if(subcommand === "read") {
    read();
}
if(subcommand === "create"){
    create();
}
// **************************************************FUNCTION TO READ***************************************
function read() {
    let index = parseInt(process.argv[3])
    fs.readFile('../pets.json', 'utf8', function(error, data){
        if(error){
            console.log(error)
        } else {
            if (!index){
                console.log(JSON.parse(data))
                console.log("It thinks it's not here")
            } else if(typeof index === 'number' && index < JSON.parse(data).length ){
                console.log(JSON.parse(data)[index])
            } else {
                console.log("Usage: node fs.js read INDEX")
            }
        }
    })
}
// **************************************************FUNCTION TO CREATE**************************************
function create() {
    if (process.argv.length === 6) {
        fs.readFile('../pets.json', 'utf8', function (error, data) {
            if (error) {
                throw error;
            } else {
                const jsData = JSON.parse(data);
                let age = parseInt(process.argv[3]);
                let kind = process.argv[4];
                let name = process.argv[5];
                if (typeof age.isInteger && typeof kind === 'string' && typeof name === 'string' && name.length > 0 ) {
                    let newRecord = { age, kind, name };
                    jsData.push(newRecord);
                    fs.writeFile('../pets.json', JSON.stringify(jsData, null, 2), 'utf8', (err) => {
                        if (err) {
                            console.error("Error writing to the database.");
                            process.exit(1);
                        }
                        console.log("Record created successfully");
                    });
                } else {
                    console.error("Error creating record");
                    process.exit(1);
                }
            }
        });
    } else {
        console.error("Usage: node fs.js create <age> <kind> <name>");
        process.exit(1);
    }
}

