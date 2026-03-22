document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const res = await fetch("https://portfolio-backend-c76b.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const text = await res.text();
    document.getElementById("status").innerText = text;
  } catch (err) {
    document.getElementById("status").innerText = "Error sending message";
    console.error(err);
  }
});