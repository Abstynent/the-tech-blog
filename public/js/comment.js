// Handle form submission for adding a comment
$('#comment-form').on('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const content = $('#comment-textarea').val(); // Get the content of the comment from the textarea
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]; // Extract the post ID from the current URL

  if (content) { // Check if the comment content is provided
    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ content, post_id }), // Send the comment content and post ID in the request body
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText); // Throw an error if the response is not successful
      }

      document.location.reload(); // Reload the page to display the new comment
    } catch (err) {
      alert('Error while submitting the comment'); // Display an error message if an error occurs
      document.querySelector('#add-comment-form').style.display = 'block'; // Show the comment form again
    }
  }
})
