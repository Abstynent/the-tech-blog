$('#comment-form').on('submit', async (event) => {
    event.preventDefault();

    const content = $('#comment-textarea').val();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
      if (content) {
        try {
          const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ content, post_id }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error(response.statusText);
          }

          document.location.reload();
        } catch (err) {
          alert('Error while submitting the comment');
          document.querySelector('#add-comment-form').style.display = 'block';
        }
      }
})
