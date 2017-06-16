window.addEventListener('DOMContentLoaded', function(){
	var socket = io();

	socket.on("updateComments", function (comments) {
		console.log(comments);

		var $commentsContainer = document.querySelector(".comments-container");

		while ($commentsContainer.hasChildNodes()) {
			$commentsContainer.removeChild($commentsContainer.lastChild);
		}

		for (var property in comments) {
			if (comments.hasOwnProperty(property)) {
				var topicCommentHtml = Handlebars.templates.topicComment(comments[property]);
				console.log(topicCommentHtml);
				$commentsContainer.insertAdjacentHTML("beforeend", topicCommentHtml);
			}
		}
	});

	document.getElementById('submit').addEventListener("click",function(){
		
		var comment = document.getElementById('comment').value,
			id = document.getElementById('hidden').innerHTML;

		if (comment == ''){
			document.getElementById("errorModal").classList.add("active");
			return;
		}
		
		document.getElementById('comment').value = '';
		
		var postURL = "/comments/new";
		
		var postRequest = new XMLHttpRequest();
		postRequest.open('POST', postURL);
		postRequest.setRequestHeader('Content-Type', 'application/json');
		
		postRequest.addEventListener('load', function (event) {
			if (event.target.status !==200) {
				alert('Sorry your post failed with an error code of' + event.target.status);
			}

			else {
				socket.emit("updatedComment", { topicId: id });
			}
		});
		
		var postBody = {
			topicId: id,
			content: comment,
		};
		
		postRequest.send(JSON.stringify(postBody));
	});
});