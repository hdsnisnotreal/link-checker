document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("check-button");
    const linksInput = document.getElementById("links");
    const resultsDiv = document.getElementById("results");

    checkButton.addEventListener("click", function () {
        resultsDiv.textContent = ""; // Clear previous results

        const links = linksInput.value.trim().split("\n");

        links.forEach((link) => {
            const trimmedLink = link.trim();
            const iframe = document.createElement("iframe");

            // Set the iframe source to the link
            iframe.src = trimmedLink;
            iframe.style.display = "none"; // Hide the iframe

            iframe.onload = () => {
                // Check if the iframe loaded successfully
                if (iframe.contentDocument && iframe.contentDocument.body) {
                    const result = document.createElement("p");
                    result.textContent = `${trimmedLink} - Not Blocked`;
                    result.style.color = "green";
                    resultsDiv.appendChild(result);
                } else {
                    const result = document.createElement("p");
                    result.textContent = `${trimmedLink} - Blocked`;
                    result.style.color = "red";
                    resultsDiv.appendChild(result);
                }
                // Remove the iframe from the document
                document.body.removeChild(iframe);
            };

            iframe.onerror = () => {
                const result = document.createElement("p");
                result.textContent = `${trimmedLink} - Blocked`;
                result.style.color = "red";
                resultsDiv.appendChild(result);
                // Remove the iframe from the document
                document.body.removeChild(iframe);
            };

            // Add the iframe to the document to trigger loading
            document.body.appendChild(iframe);
        });
    });
});
