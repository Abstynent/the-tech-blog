// Function to handle adding a new post
async function addPost(event) {
  event.preventDefault();

  // Get the values of the post title and content from the form
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#content').value.trim();

  // Check if both the title and content are provided
  if (title && content) {
    // Send a POST request to create a new post
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the POST request was successful
    if (response.ok) {
      // Redirect to the dashboard page after successful post creation
      document.location.replace('/dashboard');
    } else {
      // Display an alert with the error message if the request was not successful
      alert(response.statusText);
    }
  }
}

// Attach an event listener to the form's submit event to call the addPost function
document.querySelector('.new-post-form').addEventListener('submit', addPost);
