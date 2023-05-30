const getPostData = event => {
    const currentPostId = event.currentTarget.getAttribute('id');
    const currentPostTitle = event.currentTarget.children[0].innerHTML;
    const currentPostText = event.currentTarget.children[1].innerHTML;

    document.getElementById('current-post-id').value = currentPostId;
    document.getElementById('current-post-title').value = currentPostTitle;
    document.getElementById('current-post-textarea').value = currentPostText;
};

const editPostFormHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('#current-post-id').value.trim();
    const post_title = document.querySelector('#current-post-title').value.trim();
    const post_content = document.querySelector('#current-post-textarea').value.trim();

    if(post_id && post_title && post_content) {
        const response = await fetch(`/api/post/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ post_id, post_title, post_content }),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText);
        }
    }
};

const deletePostHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('#current-post-id').value.trim();

    const response = await fetch (`/api/post/${post_id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: post_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}