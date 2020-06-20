
const appendVideoData = () => {
    video.description = video.description.replace(/(\n)/gmi, '<br>')
    $(".video-information .title").text(video.title)
    $(".video-information .views").text(`${video.views} Views`)
    $(".video-information .description").html(`${video.description}`)
    $(".video-player").append(`
        <video id="video" class="video-js" preload="auto" width="1024" height="576" poster="/videos/${video.id}/thumbnail.png" data-setup='{"controls": true}'>
            <source src="/videos/${video.id}/video.mp4" type="video/mp4" />
        </video>
    `)
}


$(document).ready(() => {
    if(!video.id) {
        $(".no-video").show()
        $("#main").hide()
    } else {
        appendVideoData()
    }
    
})