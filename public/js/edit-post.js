// Function to retrieve post data when editing a post
const getPostData = event => {
    const currentPostId = event.currentTarget.getAttribute('id');
    const currentPostTitle = event.currentTarget.children[0].innerHTML;
    const currentPostText = event.currentTarget.children[1].innerHTML;
  
    // Set the values of the input fields with the current post data
    document.getElementById('current-post-id').value = currentPostId;
    document.getElementById('current-post-title').value = currentPostTitle;
    document.getElementById('current-post-textarea').value = currentPostText;
  };
  
  // Handler for editing a post form submission
  const editPostFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get the values from the input fields
    const post_id = document.querySelector('#current-post-id').value.trim();
    const post_title = document.querySelector('#current-post-title').value.trim();
    const post_content = document.querySelector('#current-post-textarea').value.trim();
  
    if (post_id && post_title && post_content) { // Check if all values are provided
      const response = await fetch(`./api/post/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ post_id, post_title, post_content }), // Send the updated post data in the request body
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload(); // Reload the page to reflect the updated post
      } else {
        alert(response.statusText); // Display an error message if the response is not successful
      }
    }
  };
  
  // Handler for deleting a post
  const deletePostHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const post_id = document.querySelector('#current-post-id').value.trim();
  
    const response = await fetch(`/api/post/${post_id}`, {
      method: 'DELETE',
      body: JSON.stringify({ post_id }), // Send the post ID in the request body
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.reload(); // Reload the page to reflect the deleted post
    } else {
      alert(response.statusText); // Display an error message if the response is not successful
    }
  }
  
  // Event listener for editing a post form submission
  document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler);
  