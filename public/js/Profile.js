$(document).ready(function(){
	// get the userdata from localstorage
	let Userinfo = localStorage.getItem('Userinfo');
	const checkToken = Userinfo.includes('"token":"');

	// if token not includes in localstorage sending user to login
	if(!checkToken){
		window.location.href = 'http://localhost:5000/auth/users/'
	}

	// converting string to json
	Userinfo = JSON.parse(Userinfo);

	// verifing the userinfo if it's object then sending a ajax call for token verification
	if(typeof(Userinfo) === 'object'){
		if(Userinfo?.token){
			const token = Userinfo?.token;
			$.ajax({
				url:'/auth/users/profile',
				method:'GET',
	  		    headers: {"Authorization": 'Bearer ' + token},
	  		    error: function(err){
					window.location.href = 'http://localhost:5000/auth/users/'
	  		    }
			})
		}
	}
	else{
		window.location.href = 'http://localhost:5000/auth/users/'
	}

	// setting user value to the HTML
	$('#Username').text(Userinfo?.user?.username);
	$('#userEmail').text(Userinfo?.user?.email);

	// logout function clearing localstorage and sending user to login page
	$('#LogoutUser').on('click', function(e){
		e.preventDefault();
		localStorage.removeItem("Userinfo");
		window.location.href = 'http://localhost:5000/auth/users/'
	})
})