// User Avatar

$(".adminHome-nav-container-user-avatar").css({"background-image": "url("+user.googleProfilePicture+")"})

// First name Last name

var userFullName = cap(user.firstName) + " " + cap(user.lastName)

$('.adminHome-nav-container-user-FNLN p').text(userFullName)

// Overview Header

$('.adminHome-body-header h3').text('Hello, ' + cap(user.firstName) + "!")

// Library

videos.forEach(function(video) {
	appendVideo(video)
})

async function appendVideo(video) {
	var associatedUser = await requestUserData(video.uploadMeta.uploadUserGID)
	var googlePic = await associatedUser.payload.user[0].googleProfilePicture
	log(associatedUser)
	$(".adminHome-body-s1-objects-container-appender").prepend(`<div class="adminHome-body-s1-objects-container-a-obj" id="libraryObject_`+video.id+`"> <div class="adminHome-body-s1-objects-container-a-obj-sect"> <p class="fullVertCenter">`+video.title+`</p> </div> <div class="adminHome-body-s1-objects-container-a-obj-sect"> <div class="adminHome-body-s1-objects-container-a-obj-sect-userAvatar fullVertCenter"> <div class="adminHome-nav-container-user-avatar-snn reg-image fullCenter" style="background-image: url('`+googlePic+`')"></div> </div> </div> <div class="adminHome-body-s1-objects-container-a-obj-sect"> <p class="fullVertCenter">`+moment(video.streamDate).format("MMMM DD YYYY")+`</p> </div> <div class="adminHome-body-s1-objects-container-a-obj-sect"> <p class="fullVertCenter">`+moment(video.uploadDate).format("MMMM DD YYYY")+`</p> </div> <div class="adminHome-body-s1-objects-container-a-obj-sect"> <p class="fullVertCenter">`+video.views+`</p> </div> <div class="adminHome-body-s1-objects-container-a-obj-sect"> <p class="fullVertCenter">`+video.visibility+`</p> </div> <div class="adminHome-body-s1-objects-container-a-obj-sect"> <div class="adminHome-body-s1-objects-container-a-obj-sect-buttonsWrap fullVertCenter"> <input type="button" value="Inspect" id="inspectVideo_`+video.id+`"/> <input type="button" value="Delete" id="deleteVideo_`+video.id+`"/> </div> </div> <div class="adminHome-body-s1-tlnr-lhr"></div> </div>`)
}

function requestUserData(GID) {
	return new Promise(resolve => {
		$.ajax({
			type: "POST",
			url: "/api/getUserData",
			data: {"GID":GID},
			success: (response) => {
				log(response)
				resolve(response)
			},
			error: (data) => {
				console.log(data)
			}
		});
	})
}

$(document).on('click', '.adminHome-body-s1-objects-container-a-obj-sect-buttonsWrap input[value="Delete"]', function(e){
	if(window.prompt("Confirm deletion by writing DELETE") == "DELETE") {
		var sel = $(this).attr('id').slice(12)
		$.ajax({
			type: "POST",
			url: "/api/removeVideo",
			data: {"id":sel},
			success: (response) => {
				window.alert(response.payload.message)
				$('#libraryObject_' + sel).remove()
				log(response)
			},
			error: (response) => {
				window.alert(response.payload.message)
				log(response)
			}
		});
	} else {
		window.alert("Incorrect")
	}
})

$(document).on('click', '.adminHome-body-s1-objects-container-a-obj-sect-buttonsWrap input[value="Inspect"]', function(e){
	let associatedClickID  = $(this).attr('id').slice(13)
	videos.forEach(function(v) {
		if(v.id == associatedClickID) {
			log(v)
			$('.adminHome-body-sidebar').addClass('active')
			$('.adminHome-body-fill').show()
			setTimeout(function(){
				$('.adminHome-body-fill').addClass('active')
			}, 50)
		}
	})
})