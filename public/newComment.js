window.addEventListener('DOMContentLoaded', function(){
	document.getElementById('submit').addEventListener("click",function(){
		
		var comment = document.getElementById('comment').value,
			id = document.getElementById('hidden').innerHTML;
			
		if (comment == ''){
			alert("Please fill out all of the input fields.");
			return;
		}
		
		document.getElementById('comment').value = '';
		
		var postURL = "/comments/new";
		
		var postRequest = new XMLHttpRequest();
		postRequest.open('POST', postURL);
		postRequest.setRequestHeader('Content-Type', 'application/json');
		
		postRequest.addEventListener('load', function (event) {
			alert(event.target.status);
			if (event.target.status !==200)
				alert('Sorry your post failed with an error code of' + event.target.status);
		});
		
		var postBody = {
			topicId: id,
			content: comment,
		};
		
		postRequest.send(JSON.stringify(postBody));
	});
});