$(document).ready(function(){

	// get the userdata from localstorage
	let Userinfo = localStorage.getItem('Userinfo');
	if(Userinfo){
		const checkToken = Userinfo.includes('"token":"');
		// if token not includes in localstorage sending user to login
		if(!checkToken){
			window.location.href = 'http://localhost:5000/auth/users/'
		}

		// checking the given string is true object or not
		function IsJsonString(str) {
		    try {
		        JSON.parse(str);
		    } catch (e) {
		        return false;
		    }
		    return true;
		}

		checkObj = IsJsonString(Userinfo);
		
		// converting string to json
		if(checkObj){
	    	$('.unAuthBtn').hide()
	    	Userinfo = JSON.parse(Userinfo);
		}

		// verifing the userinfo if it's object then sending a ajax call for token verification
		if(typeof(Userinfo) === 'object' && Userinfo?.token){
			const token = Userinfo?.token;
	    	$('.authLoader').show();
			$.ajax({
				url:'/auth/users/mainProfile',
				method:'GET',
	  		    headers: {"Authorization": 'Bearer ' + token},
	  		    success: function(user){
	  		    	$('.mainContent').show();
	  		    	$('.authLoader').hide();
					const loggedUser =  Userinfo?.user?.username;
					const email = Userinfo?.user?.email;
					/* making connection to the Socket since both client and server are in 
			  	       same directory(node_modules/socket.io/socket.io.js) so no need of pass the Server url
			  	    */
			  	    var socket = io();
			  	    // emiiting the current users when page loads
			  	    socket.emit('newUserJoined', loggedUser)
			  	    /* fetching all logged in users from the server 
			  	       written in /Utils/SocketUser.js
			  	    */
			  	    socket.on('JoinedUser', function(users){
			  	    	// appending the user list to the UI
			  	    	const UsersLi = users.map((user) =>{
			  	    		return `<li class="list-group-item">${user.name}</li>`
			  	    	})
			  	    	$('#UsersList').html(UsersLi);
			  	    })
					// setting user value to the HTML
					$('#Username').text(loggedUser);
					$('#userEmail').text(email);
	  		    },
	  		    error: function(err){
	  		    	$('.unAuthBtn').show()
	  		    }
			})
		}
		else{
	    	$('.unAuthBtn').show()
		}
		// logout function clearing localstorage and sending user to login page
		$('.LogoutUser').on('click', function(e){
			e.preventDefault();
			localStorage.removeItem("Userinfo");
			window.location.href = 'http://localhost:5000/auth/users/'
		})
	}else{
		window.location.href = 'http://localhost:5000/auth/users/'
	}
})