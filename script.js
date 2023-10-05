document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("check-button");
    const linksInput = document.getElementById("links");
    const resultsDiv = document.getElementById("results");

    checkButton.addEventListener("click", function () {
        resultsDiv.textContent = ""; // Clear previous results

        const links = linksInput.value.trim().split("\n");

        links.forEach((link) => {
            const trimmedLink = link.trim();
            const anchor = document.createElement("a");
            anchor.href = trimmedLink;
            anchor.textContent = trimmedLink;

            const result = document.createElement("p");
            result.appendChild(anchor);

            // Open the link in a new tab
            const newTab = window.open(trimmedLink, "_blank");

            // Check if the link is reachable
            fetch(trimmedLink, { method: "HEAD" })
                .then((response) => {
                    if (response.ok) {
                        result.textContent += " - Not Blocked";
                        result.style.color = "green";
                    } else {
                        result.textContent += " - Blocked";
                        result.style.color = "red";
                    }
                })
                .catch(() => {
                    result.textContent += " - Blocked";
                    result.style.color = "red";
                })
                .finally(() => {
                    resultsDiv.appendChild(result);
                });

            // Close the new tab after 5 seconds
            setTimeout(() => {
                if (newTab) {
                    newTab.close();
                }
            }, 5000);
        });
    });
});
