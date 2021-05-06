// global variable to store all the current logged in users
const Users = [];

const SocketUsers = (io) =>{
	// making the connection of user on client side page loads
	io.on('connection', (socket) => {
	// adding new user after connection 
	  socket.on('newUserJoined', (name) =>{
	  	// creating current user object to push to the global Users array
	  	const user = {id:socket.id, name:name};
	  	// pushing the current user to global array
	  	Users.push(user);
	  	// emmiting back the current user including all others users
	  	io.emit('JoinedUser', Users);
	  })

	  // on page exit or refresh disconnecting the User and removing him from global array 
	   socket.on('disconnect', () => {
	   	// socket is global prop that comes when the users get joined 
     	const index = Users.findIndex((user) =>  user.id === socket.ids);
	    if(index !== -1){
	    	// removing the current user from array
	        Users.splice(index, 1)[0];
	        // returning the current users to the existing Users
		  	io.emit('JoinedUser', Users);
	    	return Users;
	    }
	  });
	});
}


module.exports = SocketUsers;