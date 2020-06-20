module.exports = async (db, id) => {
    const getVideo = () => {
        return new Promise((res, rej) => {
            db.collection("videos").find({id: id}, {projection:{_id:0}}).toArray((e,v) => {
                res(v[0]);
            })
        })
    }

    return await getVideo();
}