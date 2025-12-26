let rejectionBox = document.getElementById("rejection");
let getRejectionButton = document.getElementById("btn");

const apiURL = "https://naas.isalman.dev/no";
const proxyURL = "https://corsproxy.io/?";
const counterEndpoint = "https://api.counterapi.dev/v2/ndivho-shillings-team-2268/1000buttoncounterb/up";

getRejectionButton.addEventListener("click", () => {
  getRejectionButton.disabled = true;
  const originalText = getRejectionButton.textContent;
  getRejectionButton.textContent = "Loading...";

  setTimeout(() => {
    const finalURL = proxyURL + encodeURIComponent(`${apiURL}?_=${Date.now()}`);

    fetch(finalURL)
      .then(res => res.json())
      .then(data => {
        rejectionBox.textContent = data.reason || "Failed to get reason, try again or just tell him NO!";
      })
      .catch(() => {
        rejectionBox.textContent = "Failed to get reason, try again or just tell him NO!";
      })
      .finally(() => {
        getRejectionButton.disabled = false;
        getRejectionButton.textContent = originalText;

        fetch(counterEndpoint, { method: "GET" })
          .then(res => res.json())
          .then(data => console.log("CounterAPI incremented:", data))
          .catch(() => console.warn("Failed to increment counter (ignored)"));
      });
  }, 2000);
});
