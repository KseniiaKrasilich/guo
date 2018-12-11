window.addEventListener('load', function() {

  const postsDiv = document.getElementById('posts');
	const postRef = firebase.database().ref('posts');

  postRef.on('child_added', function(snapshot) {
    createPost(snapshot.key, snapshot.val());
  });

  function createPost(post) {
  	const postDiv = document.createElement('div');
  	postDiv.classList.add('post');
  	const postText = document.createElement('div');
  	postText.classList.add('post-text');
  	const postInfo = document.createElement('div');
  	postInfo.classList.add('post-info');

  	const postAuthor = document.createElement('span');
  	postAuthor.classList.add('post-author');
  	const postDate = document.createElement('span');
  	postDate.classList.add('post-date');

  	postText.textContent = post.text;
  	postAuthor.textContent = post.author;
  	postDate.textContent = new Date(post.date).toLocaleString('en-us', { month: 'long', year: 'numeric', weekday: 'long', day: 'numeric' })

  	postDiv.appendChild(postText);
  	postDiv.appendChild(postInfo);
  	postInfo.innerHTML += "by ";
  	postInfo.appendChild(postAuthor);
  	postInfo.innerHTML += " on ";
  	postInfo.appendChild(postDate);

  	/* chronological order */
  	// postsDiv.appendChild(postDiv);
  	/* reverse chronological order */
  	postsDiv.insertBefore(postDiv, postsDiv.firstElementChild);
  }

  const publishButton = document.getElementById('submit-post');
  const postInput = document.getElementById('post-body');

  publishButton.addEventListener('click', publishPost(){
    const uid = firebase.auth().currentUser.uid;
    const db = firebase.database();
    const ref = db.ref('posts').child(uid);
    const postInfo = {
      text: postInput.value,
      date: Date.now(),
      author: firebase.auth().currentUser.displayName,
      id: uid
    };
    ref.push(postInfo);
    postInput.value = "";
  });


});
