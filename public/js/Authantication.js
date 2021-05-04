// this Js page is linked to Register.ejs and LoginView.ejs page, 
$(document).ready(function(){
	// get the userdata from localstorage
	var storageVal = JSON.parse(localStorage.getItem('Userinfo'));
	if(storageVal){
		window.location.href = 'http://localhost:5000/auth/users/profile'
	}

	// loging form submit ajax function and validation
	$('#loginSubmit').on('click', function(e){
		e.preventDefault();
		const email = $('#UserEmail').val();
		const password = $('#UserPass').val();
		if(!email || !password) {
			$('.emptyErr').text('All Fields Required');
			return
		} 
		$.ajax({
			url:'/auth/users/LoginForm',
			method: 'POST',
			data:{
				email: email,
				password: password 
			},
			success: function(msg){
				localStorage.setItem('Userinfo', JSON.stringify(msg));
				window.location.href = 'http://localhost:5000/auth/users/profile'
			},
			error: function(err){
				if(err.responseJSON.message.startsWith('Email')){
					$('.emailErr').text('Email Not found');
					return
				}
				else{
					$('.passErr').text('Password not Match');
					return
				}
			}
		}) 
	})

	// register form function and validation
	$('#registerSubmit').on('click', function(e){
		e.preventDefault();
		const username = $('#Username').val();
		const email = $('#UserEmail').val();
		const password = $('#UserPass').val();
		const confPass = $('#confPass').val();

		// checking for empty fields
		if(!username || !email || !password || !confPass){
			$('.emptyErr').text('All Fields Required');
			return
		}
		// checking for password and conf password match
		if(password !== confPass){
			$('.passErr').text('Password not Match');
			return
		}
		// ajax call to server
		$.ajax({
			url:'/auth/users/RegisterForm',
			method: 'POST',
			data:{
				username: username,
				email:email,
				password: password,
				confPass: confPass
			},
			success: function(msg){
				localStorage.setItem('Userinfo', JSON.stringify(msg));
				window.location.href = 'http://localhost:5000/auth/users/profile'

			},
			error: function(err){
				if(err.responseJSON.message.startsWith('Email')){
					$('.emailErr').text('Email Already Taken');
					return
				}
			}
		})
	})
})