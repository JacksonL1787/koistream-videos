module.exports = async (db, id) => {
    const getVideos = () => {
        return new Promise ((res, rej) => {
            db.collection("videos").find({"visibility": "Public"}).toArray((e,v) => {
                res(v);
            })
        })
    }

    return await getVideos();
}