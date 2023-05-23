$('#comment-form').on('submit', (event) => {
    event.preventDefault();

    const content = $('#comment-textarea').val();
    
    try {
        confirm(content)
    } catch (error) {
        console.log(error)
    }

    console.log(content)
})
console.log("das")