$(document).ready(function(){
// get the userdata from localstorage
	var storageVal = JSON.parse(localStorage.getItem('Userinfo'));
	if(!storageVal){
		window.location.href = 'http://localhost:5000/auth/users/'
	}
	$('#Username').text(storageVal.user.username);
	$('#userEmail').text(storageVal.user.email);

	$('#LogoutUser').on('click', function(e){
		e.preventDefault();
		localStorage.removeItem("Userinfo");
		window.location.href = 'http://localhost:5000/auth/users/'
	})
})