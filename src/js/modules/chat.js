
let chat = document.querySelector('.chat');
chat.addEventListener('click', function(event) {
    if (chat.classList.contains('opened')) {
        chat.classList.remove('opened');
        chat.querySelector('.chat').style.display = 'none';
    } else {
        chat.classList.add('opened');
        chat.querySelector('.chat').style.display = 'block';
    }
});
