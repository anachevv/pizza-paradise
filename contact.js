function sendMessage() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name.trim() != '' && email.trim() != '' && message.trim() != '') {
        alert("Message sent!");
    }
}
