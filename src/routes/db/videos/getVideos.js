module.exports = async (db, id) => {
    const getVideos = () => {
        return new Promise ((res, rej) => {
            db.collection("videos").find().toArray((e,v) => {
                res(v);
            })
        })
    }

    return await getVideos();
}