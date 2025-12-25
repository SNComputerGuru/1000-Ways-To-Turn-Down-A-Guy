let rejectionBox = document.getElementById("rejection");
let getRejectionButton = document.getElementById("btn");

const apiURL = "https://naas.isalman.dev/no";
const proxyURL = "https://corsproxy.io/?";

getRejectionButton.addEventListener("click", () => {
  getRejectionButton.disabled = true;
  const originalText = getRejectionButton.textContent;
  getRejectionButton.textContent = "Loading...";

  setTimeout(() => {
    const urlWithTimestamp = `${apiURL}?_=${Date.now()}`;
    const finalURL = proxyURL + encodeURIComponent(urlWithTimestamp);

    fetch(finalURL)
      .then(res => res.json())
      .then(data => {
        rejectionBox.textContent =
          data.reason || "Failed to get reason, try again or just tell them NO!";
        console.log("API response:", data);
      })
      .catch(error => {
        console.error("Fetch failed:", error);
        rejectionBox.textContent =
          "Failed to get reason, try again or just tell them NO!";
      })
      .finally(() => {
        getRejectionButton.disabled = false;
        getRejectionButton.textContent = originalText;
      });
  }, 2000);
});