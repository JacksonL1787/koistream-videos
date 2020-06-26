
// User Avatar

$(".adminHome-nav-container-user-avatar").css({"background-image": "url("+user.googleProfilePicture+")"})

// First name Last name

var userFullName = cap(user.firstName) + " " + cap(user.lastName)

$('.adminHome-nav-container-user-FNLN p').text(userFullName)

// Overview Header

$('.adminHome-body-header h3').text('Hello, ' + cap(user.firstName) + "!")

// Set number of videos

$('.videosNum').text(videos.length)

// Set total views

let totalViews;

function getAndSetTotalViews() {
    $.ajax({
        type: "GET",
        url: "/api/getTotalViews",
        success: (response) => {
            totalViews = response.payload.total_views
            setTotalViews(response)
            return response
        },
        error: (data) => {
            console.log(data)
        }
    });
}

function setTotalViews(totalViews) {
    $('.totalViews').text(totalViews.payload.total_views)
}

$('#reloadTotalViews').click(function(){
    getAndSetTotalViews();
})

$(document).ready(function(){
    getAndSetTotalViews();
})

// Set Unlisted/Private Videos

let totalUnlistedPrivVideos = 0;
videos.forEach(function(video) {
    if(video.visibility == "Private" || video.visibility == "Unlisted" ) {
        totalUnlistedPrivVideos++
    }
})
$('.totalPUV').text(totalUnlistedPrivVideos)



// ChartCode


window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
    blue: 'rgb(40, 96, 255)',
    fadedBlue: 'rgb(147, 169, 232)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var ctx = document.getElementById('canvas').getContext('2d');

var config = {
    type: 'line',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Change',
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            pointColor: window.chartColors.blue,
            
            data: [
                15,
                20,
                10,
                30,
                25,
                50,
                45
            ],
            backgroundColor: "RGBA(237, 242, 253, 1)"
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: false,
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        legend: {
            display: false
        },
        layout: {
            padding: {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5
            }
        },
        elements: {
            point:{
                radius: 0
            }
        },
        scales: {
            xAxes: [{
                display: false,
                scaleLabel: {
                    display: false,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: false,
                scaleLabel: {
                    display: false,
                    labelString: 'Value'
                },
                ticks: {
                    beginAtZero: true,
                    padding: 25,
                  }
            }]
        }
    }
};

$(document).ready(function(){
    window.myLine = new Chart(ctx, config);
})

// Lower Section 2 Code

videos.forEach(function(video){
    let title = video.title
    let id = video.id
    let uploadDate = video.uploadDate
    $('.adminHome-body-obs2-s2-flexContianer').prepend(`<div class="adminHome-body-obs2-s2-flexContianer-object" style="background-image: url('/videos/`+id+`/thumbnail.png')"> <div class="adminHome-body-obs2-s2-flexContianer-object-container fullCenter"> <p>`+moment(uploadDate).format("MMMM D Y")+`</p> <h2>`+title+`</h2><input id=`+id+` type="button" value="See Video" /></div> </div>`)
})

var d = $('.adminHome-body-obs2-s2-flexContianer').height() - 240
$(".adminHome-body-obs2-s2-flexContianer-object").css("margin-top", d / 2)
$(".adminHome-body-obs2-s2-flexContianer-object").css("margin-bottom", d / 2)

window.onresize = function(event) {
    var d = $('.adminHome-body-obs2-s2-flexContianer').height() - 240
    $(".adminHome-body-obs2-s2-flexContianer-object").css("margin-top", d / 2)
    $(".adminHome-body-obs2-s2-flexContianer-object").css("margin-bottom", d / 2)
};

$(document).on('click', '.adminHome-body-obs2-s2-flexContianer-object-container input', function(e){
    window.location.href = "/admin/view/" + $(this).attr('id')
})

