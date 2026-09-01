document.addEventListener("DOMContentLoaded", () => {
    const exploreBtn = document.getElementById("explore-btn");
    const connectBtn = document.getElementById("connect-btn");
    const ctaMessage = document.getElementById("cta-message");

    exploreBtn.addEventListener("click", () => {
        ctaMessage.textContent = "Thanks for checking out my work! Scroll down to see my interests.";
    });

    connectBtn.addEventListener("click", () => {
        ctaMessage.textContent = "Feel free to reach out to me via email or LinkedIn!";
    });

    const newHobbyInput = document.getElementById("new-hobby-input");
    const charCountDisplay = document.getElementById("char-count");

    newHobbyInput.addEventListener("input", () => {
        const textLength = newHobbyInput.value.length;
        charCountDisplay.textContent = `Characters entered: ${textLength}`;

        if (textLength > 25) {
            newHobbyInput.style.borderColor = "#e11d48";
            newHobbyInput.style.backgroundColor = "#fff1f2";
            charCountDisplay.style.color = "#e11d48";
        } else if (textLength > 0) {
            newHobbyInput.style.borderColor = "#2563eb";
            newHobbyInput.style.backgroundColor = "#f0f9ff";
            charCountDisplay.style.color = "#2563eb";
        } else {
            newHobbyInput.style.borderColor = "var(--border-color)";
            newHobbyInput.style.backgroundColor = "var(--bg-surface)";
            charCountDisplay.style.color = "var(--text-muted)";
        }
    });

    const addHobbyBtn = document.getElementById("add-hobby-btn");
    const hobbiesList = document.getElementById("hobbies-list");

    function createHobbyCard(hobbyName) {
        const li = document.createElement("li");
        li.className = "hobby-card";

        const iconSpan = document.createElement("span");
        iconSpan.className = "hobby-icon";
        iconSpan.textContent = "👣";

        const infoDiv = document.createElement("div");
        infoDiv.className = "hobby-info";

        const heading = document.createElement("h3");
        heading.textContent = hobbyName;

        const description = document.createElement("p");
        description.textContent = "Newly added hobby.";

        infoDiv.appendChild(heading);
        infoDiv.appendChild(description);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Remove";

        li.appendChild(iconSpan);
        li.appendChild(infoDiv);
        li.appendChild(deleteBtn);

        return li;
    }

    function submitHobby() {
        const hobbyText = newHobbyInput.value.trim();

        if (hobbyText !== "") {
            const newCard = createHobbyCard(hobbyText);
            hobbiesList.appendChild(newCard);

            newHobbyInput.value = "";
            newHobbyInput.style.borderColor = "var(--border-color)";
            newHobbyInput.style.backgroundColor = "var(--bg-surface)";
            charCountDisplay.textContent = "Characters entered: 0";
            charCountDisplay.style.color = "var(--text-muted)";
        }
    }

    addHobbyBtn.addEventListener("click", submitHobby);

    newHobbyInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submitHobby();
        }
    });

    hobbiesList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const cardToElement = event.target.closest(".hobby-card");
            if (cardToElement) {
                cardToElement.remove();
            }
        }
    });

    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("user-name");
    const emailInput = document.getElementById("user-email");
    const phoneInput = document.getElementById("user-phone");
    const messageInput = document.getElementById("user-message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");
    const messageError = document.getElementById("message-error");
    const formSuccess = document.getElementById("form-success");

    const setupAutoClear = (inputEl, errorEl) => {
        inputEl.addEventListener("input", () => {
            if (errorEl.textContent !== "") {
                errorEl.textContent = "";
                inputEl.classList.remove("invalid");
            }
            formSuccess.textContent = "";
        });
    };

    setupAutoClear(nameInput, nameError);
    setupAutoClear(emailInput, emailError);
    setupAutoClear(phoneInput, phoneError);
    setupAutoClear(messageInput, messageError);

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let isValid = true;

        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your full name.";
            nameInput.classList.add("invalid");
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        if (emailValue === "") {
            emailError.textContent = "Please enter your email address.";
            emailInput.classList.add("invalid");
            isValid = false;
        } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
            emailError.textContent = "Please enter a valid email address containing 'eg., name@domain.com'";
            emailInput.classList.add("invalid");
            isValid = false;
        }

        if (phoneInput.value.trim() === "") {
            phoneError.textContent = "Please enter your phone number.";
            phoneInput.classList.add("invalid");
            isValid = false;
        }

        if (messageInput.value.trim() === "") {
            messageError.textContent = "Please enter a message.";
            messageInput.classList.add("invalid");
            isValid = false;
        }

        if (isValid) {
            formSuccess.textContent = "Message sent successfully!";
            contactForm.reset();
        }
    });

    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    fetch("https://dummyjson.com/quotes/random")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            quoteText.textContent = `"${data.quote}"`;
            quoteAuthor.textContent = `— ${data.author}`;
        })
        .catch((error) => {
            console.error("API Fetch Error:", error);
            quoteText.textContent = "Could not load quote at this time.";
            quoteAuthor.textContent = "";
        });
});