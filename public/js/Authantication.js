// this Js page is linked to Register.ejs and LoginView.ejs page, 
$(document).ready(function(){
	// get the userdata from localstorage
	let Userinfo = localStorage.getItem('Userinfo');

	if(Userinfo){
		const checkToken = Userinfo.includes('"token":"'); 
		if(checkToken){
			window.location.href = 'http://localhost:5000/auth/users/profile'
		}
	}

	// loging form submit ajax function and validation
	$('#loginSubmit').on('click', function(e){
		e.preventDefault();
		$('#loginSubmit').hide();
		$('.authLoader').show();
		const email = $('#UserEmail').val();
		const password = $('#UserPass').val();
		if(!email || !password) {
			$('.emptyErr').text('All Fields Required');
			$('.authLoader').hide();
			$('#loginSubmit').show();
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
					$('.authLoader').hide();
					$('#loginSubmit').show();
					return
				}
				else{
					$('.passErr').text('Password not Match');
					$('.authLoader').hide();
					$('#loginSubmit').show();
					return
				}
			}
		}) 
	})

	// register form function and validation
	$('#registerSubmit').on('click', function(e){
		e.preventDefault();
		$('#registerSubmit').hide();
		$('.authLoader').show();	
		const username = $('#Username').val();
		const email = $('#UserEmail').val();
		const password = $('#UserPass').val();
		const confPass = $('#confPass').val();

		// checking for empty fields
		if(!username || !email || !password || !confPass){
			$('.emptyErr').text('All Fields Required');
			$('#registerSubmit').show();
			$('.authLoader').hide();		
			return
		}
		// checking for password and conf password match
		if(password !== confPass){
			$('.passErr').text('Password not Match');
			$('#registerSubmit').show();
			$('.authLoader').hide();		
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
					$('#registerSubmit').show();
					$('.authLoader').hide();		
					return
				}
			}
		})
	})
})