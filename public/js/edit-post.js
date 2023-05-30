const getPostData = event => {
    const currentPostId = event.currentTarget.getAttribute('id');
    const currentPostTitle = event.currentTarget.children[0].innerHTML;
    const currentPostText = event.currentTarget.children[1].innerHTML;

    document.getElementById('current-post-id').value = currentPostId;
    document.getElementById('current-post-title').value = currentPostTitle;
    document.getElementById('current-post-textarea').value = currentPostText;
};
