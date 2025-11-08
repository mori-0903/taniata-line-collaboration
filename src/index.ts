import { fetchWeight } from "./getWeight"

require("dotenv").config()

async function index() {
    const weightObject = await fetchWeight()
    console.log(weightObject)
}

index()
