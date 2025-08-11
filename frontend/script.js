document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:5000/api/users') // Your API endpoint
    .then(response => response.json())
    .then(users => {
      const userList = document.getElementById('user-list');
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email}) - Role: ${user.role}`;
        userList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
});
