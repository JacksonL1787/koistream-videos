module.exports = async (db, id) => {
    const getVideos = () => {
        new Promise ((res, rej) => {
            db.collection("videos").find().toArray((v) => {
                res(v);
            })
        })
    }

    return await getVideos();
}