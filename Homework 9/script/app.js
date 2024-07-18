document.addEventListener("DOMContentLoaded", () => {
    const userCardsContainer = document.getElementById('user-cards');
    const loadingDiv = document.getElementById('loading');

    async function fetchUsers() {
        loadingDiv.style.display = 'block';
        try {
            const response = await fetch('https://dummyjson.com/users');
            const data = await response.json();
            displayUsers(data.users);
        } catch (error) {
            console.error('Foydalanuvchilarni olishda xatolik yuz berdi:', error);
        }
        loadingDiv.style.display = 'none';
    }

    function displayUsers(users) {
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${user.image}" alt="${user.firstName}" width="80">
                <h3>${user.firstName} ${user.lastName}</h3>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <button onclick="deleteUser(${user.id})">Delete</button>
            `;
            userCardsContainer.appendChild(card);
        });
    }

    window.deleteUser = (userId) => {
        if (confirm(`Haqiqatan ham foydalanuvchini oʻchirib tashlamoqchimisiz ${userId} ?`)) {
            removeUser(userId);
        }
    };

    async function removeUser(userId) {
        try {
            const response = await fetch(`https://dummyjson.com/users/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert(`User ${userId} muvaffaqiyatli o'chirildi.`);
                location.reload(); 
            } else {
                alert('Foydalanuvchini o‘chirib bo‘lmadi.');
            }
        } catch (error) {
            console.error('Foydalanuvchini oʻchirishda xatolik yuz berdi:', error);
        }
    }

    fetchUsers();
});


