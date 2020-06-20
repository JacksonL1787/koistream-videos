const appendVideos = () => {
    if(!videos || videos.length <= 0) {
        return;
    }
    videos.forEach((v) => {
        let postTime = moment(v.streamDate).fromNow()
        postTime = _.upperFirst(postTime)
        $(".videos-container").prepend(`
            <a class="video" href="/v/${v.id}">
                <div class="video-thumbnail-wrap">
                    <div class="thumbnail-overlay">
                        <div class="play-icon"></div>
                    </div><img class="thumbnail" src="videos/${v.id}/thumbnail.png" /></div>
                <h1 class="title">${v.title}</h1><br/>
                <p class="date">${postTime}<b>•</b> ${v.views} Views</p>
            </a>
        `)
    })
    
}

$(document).ready(() => {
    appendVideos()
})