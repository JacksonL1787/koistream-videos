// User Avatar

$(".adminHome-nav-container-user-avatar").css({"background-image": "url("+user.googleProfilePicture+")"})

// First name Last name

var userFullName = cap(user.firstName) + " " + cap(user.lastName)

$('.adminHome-nav-container-user-FNLN p').text(userFullName)

// Overview Header

$('.adminHome-body-header h3').text('Hello, ' + cap(user.firstName) + "!")
