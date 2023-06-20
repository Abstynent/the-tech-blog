const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert("You must login first.");
    console.log(response.statusText);
  }
};

if(window.location.pathname == '/dashboard') { 
  const addPostBtn = document.getElementById('add-post-btn');
  addPostBtn.classList.remove('hide-button')
}

  