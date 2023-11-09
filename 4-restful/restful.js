// import express from "express"
// import fs from "fs"
// import dotenv from "dotenv"
// import chalk from "chalk"

// let pets = undefined

// const start = () => {

//     dotenv.config()
//     pets = importPetsFromDatabase()

//     const app = express()
//     app.use(express.json())

//     app.post("/pets", create)
//     app.get("/pets/:petIndex?", read)
//     app.patch("/pets/:petIndex?", update)
//     app.use(send404)

//     app.listen(process.env.port, () => {
//         console.log(chalk.bold.green(`Server is running on port ${process.env.port}`))
//     })
// }

// const importPetsFromDatabase = () => {
//     const data = fs.readFileSync("./pets.json")
//     return JSON.parse(data)
// }

// const updateDatabase = () => {
//     fs.writeFileSync("./pets.json", JSON.stringify(pets))
// }

// const create = (req, res) => {
//     const pet = req.body
//     if ([pet.age, pet.kind, pet.name].includes(undefined)) {
//         res.status(500)
//         res.send("Failed.")
//     } else {
//         pets.push(pet)
//         updateDatabase()
//         res.send("Success.")
//     }
// }

// const read = (req, res) => {
//     const { petIndex } = req.params
//     if (petIndex === undefined) {
//         res.json(pets)
//     } else {
//         const index = parseInt(petIndex)
//         if (index >= 0 && index < pets.length) {
//             res.json(pets[index])
//         } else {
//             send404(req, res)
//         }
//     }
// }

// const update = (req, res) => {
//     let { petIndex } = req.params
//     petIndex = parseInt(petIndex)
//     if (petIndex >= 0 && petIndex < pets.length) {
//         const pet = req.body
//         if ([pet.age, pet.kind, pet.name].includes(undefined)) {
//             res.status(400)
//             res.send("Bad Request.")
//         } else {
//             pets[petIndex] = pet
//             updateDatabase()
//             res.send("Success.")
//         }
//     } else {
//         send404(req, res)
//     }
// }

// const send404 = (req, res) => {
//     res.status(404)
//     res.send("404 Error - Page Not Found")
// }

// start()