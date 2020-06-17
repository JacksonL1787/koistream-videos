module.exports = async (db, id) => {
    const getVideo = () => {
        new Promise((res, rej) => {
            db.collection("videos").find({id: id}).toArray((v) => {
                res(v[0]);
            })
        })
    }

    return await getVideo();
}