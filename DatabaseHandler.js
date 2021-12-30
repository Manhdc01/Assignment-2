const {MongoClient,ObjectId} = require('mongodb')

const DATABASE_URL = 'mongodb+srv://manh2001:manh2001@cluster0.sc5ft.mongodb.net/test'
const DATABASE_NAME = 'GCH0901_DB'

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL)
    const dbo = client.db(DATABASE_NAME)
    return dbo
}
async function insertObjectToCollection(collectionName,objectValue){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).insertOne(objectValue)
    console.log("Gia tri id moi duoc insert la: ", result.insertedId.toHexString());
}
async function getAllDocumentsFromCollection(collectionName) {
    const dbo = await getDatabase()
    //const results = await dbo.collection("Products").find({}).sort({name:1}).limit(7).toArray()   
    const results = await dbo.collection(collectionName).find({}).toArray()
    return results
}
async function deleteDocumentById(collectionName, id) {
    const dbo = await getDatabase()
    await dbo.collection(collectionName).deleteOne({ _id: ObjectId(id) })
}
async function updateCollection(collectionName, myquery, newvalues) {
    const dbo = await getDatabase()
    await dbo.collection(collectionName).updateOne(myquery, newvalues)
}

async function getDocumentById(collectionName, id) {
    const dbo = await getDatabase()
    const productToEdit = await dbo.collection(collectionName).findOne({ _id: ObjectId(id) })
    return productToEdit
}

module.exports ={getDatabase,insertObjectToCollection,
    getAllDocumentsFromCollection,deleteDocumentById,
    updateCollection,getDocumentById}