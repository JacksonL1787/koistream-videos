module.exports = (db, id) => {
    db.collection("videos").update({id: id}, {$inc: {views: 1}})
}