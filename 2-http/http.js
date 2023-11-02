import http from 'http'
import url from 'url'
import fs from 'fs'
let res;
const dbPath = './pets.json';
// import routes from './routes.js'
let petData 

var handleRequest = function (req, res) {
    if(req.url !== undefined) {
        const urlArray = formatURL(req);
        const petIndex = Number(urlArray[2]); 
        let fileData = fs.readFileSync(dbPath, 'utf8')
        petData = JSON.parse(fileData)
        if(urlArray[1] === "pets" && urlArray.length < 3){
            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify(petData))
        } else if( urlArray[1] === "pets" && petIndex !== undefined ){
            if(urlArray[1] === "pets" && petIndex < 0) {
                res.writeHead(404, {'content-type': 'text/plain'})
                res.end("Not Found");
            } else if(urlArray[1] === "pets" && petIndex > petData.length){
                res.writeHead(404, {'content-type': 'text/plain'})
                res.end("Not Found");
            } 
        } else {
            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify(petData[petIndex]))
        }
        res.end(JSON.stringify(petData[petIndex]))
    } else {
        res.writeHead(404, {'content-type': 'text/plain'})
        res.end("Not Found");
    }
};

var server = http.createServer(handleRequest, res);
server.listen(8000, function() {
    console.log("Listening... on localhost:8000")
})


function formatURL(req){
    const parsedUrl = url.parse(req.url, true)  
    return parsedUrl.pathname.split('/')
}









// function displayPets(res){
//     fs.readFile(dbPath, 'utf8', function(error, data){
//         if (error) {
//             throw error;
//         } else {
//             const jsData = JSON.parse(data);
//             return JSON.parse(data);
//         }
//     })
// }

// function displayPetsAtIndex(index, res){
//     fs.readFile(dbPath, 'utf8', function(error, data){
//         if(error){
//             console.log(error)
//             console.log("Error Reading Data")
//         } else {
//             if (!index){
//                 // console.log(JSON.parse(data))
//                 let petString = JSON.parse(data)
//                 // console.log(data)
//                 console.log(JSON.stringify(petString))
//                 const petStringTwo = JSON.stringify(petString)
//                 res.end(petStringTwo)
//                 // console.log(petString)
//                 // console.log(petData[0])
//                 // console.log("It thinks it's not here")
//             } else if((typeof index === 'number' && index < JSON.parse(data).length && index > 0)){
//                 console.log("Here")
//                 return JSON.parse(data)[index]
//             } else if(index < 0) {
//                 console.log("Array index must be positive")
//                 res.end("Not Found")
//                 return "Not Found"
//             } else {
//                 console.log("Not Found")
//             }
//         }

//     })
// }

// function requestCommand(arr, res){
//     const index = Number(arr[2])
//     // console.log(JSON.stringify(arr))
//     if(arr[1] !== 'pets'){
//         res.end("Incorrect Path")
//     } else {
//         displayPetsAtIndex(index, res)
//         // const pets = petData[0]
//         // console.log(pets)
//         // const petString = JSON.stringify(pets)
//         // console.log("stringify", petString)
//         // return petString
//     } 
// }

