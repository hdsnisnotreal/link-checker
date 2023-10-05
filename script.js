document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("check-button");
    const linksInput = document.getElementById("links");

    checkButton.addEventListener("click", function () {
        const links = linksInput.value.trim().split("\n");

        links.forEach((link) => {
            const trimmedLink = link.trim();
            const newTab = window.open(trimmedLink, "_blank");

            if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
                alert(trimmedLink + " - Blocked");
            } else {
                newTab.onload = function () {
                    if (newTab.document.title === "Blocked Page" || newTab.document.body.innerHTML === "") {
                        alert(trimmedLink + " - Blocked");
                    } else {
                        alert(trimmedLink + " - Not Blocked");
                    }
                    newTab.close();
                };
            }
        });
    });
});
