const appendVideos = () => {
    if(!videos || videos.length <= 0) {
        return;
    }
    videos.forEach((v) => {
        let postTime = moment(v.uploadDate).fromNow()
        postTime = _.upperFirst(postTime)
        console.log(postTime)
        $(".videos-container").append(``)
    })
    
}

$(document).ready(() => {
    appendVideos()
})