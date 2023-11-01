import http from 'http'
import url from 'url'
import fs from 'fs'

const dbPath = '../pets.json';
// import routes from './routes.js'


var handleRequest = function (req, res) {
    if(req.url !== undefined) {
        const urlArray = formatURL(req);
        requestCommand(urlArray, res)

    } else {
        res.end("404, no such route");
    }
};

var server = http.createServer(handleRequest);
server.listen(8000, function() {
    console.log("Listening... on localhost:8000")
})


function formatURL(req){
    const parsedUrl = url.parse(req.url, true)  
    return parsedUrl.pathname.split('/')
}



function displayPets(){
    fs.readFile(dbPath, 'utf8', function(error, data){
        if (error) {
            throw error;
        } else {
            const jsData = JSON.parse(data);
            return JSON.parse(data);
        }
    })
}

function displayPetsAtIndex(index){
    fs.readFile(dbPath, 'utf8', function(error, data){
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

function requestCommand(arr, res){
    console.log(JSON.stringify(arr))
    if(arr[i] !== 'pets'){
        res.end("Incorrect Path")
    } else if (arr.length > 2){
        displayPetsAtIndex(Number(arr[2]))
    } else {
        displayPets()
    }
}