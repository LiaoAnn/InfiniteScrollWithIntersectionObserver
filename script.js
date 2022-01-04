const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.target.classList.contains("show") && entry.isIntersecting) {
            let audio = document.createElement("audio");
            audio.src = "short_punch1.mp3";
            audio.onpause = () => {
                document.body.removeChild(audio);
            }
            document.body.appendChild(audio);
            audio.play();
        }
        entry.target.classList.toggle("show", entry.isIntersecting);
    })
}, {
    threshold: [1],
    rootMargin: "-24px"
});

document.querySelectorAll(".card").forEach(card => {
    observer.observe(card);
})

const lastCardObserver = new IntersectionObserver(entries => {
    let last = entries[0];
    if (!last.isIntersecting) {
        return
    }

    GetSomeCard();
    lastCardObserver.unobserve(last.target);
    lastCardObserver.observe(document.querySelector(".card:nth-last-child(-n+2)"));
}, {});

lastCardObserver.observe(document.querySelector(".card:nth-last-child(-n+2)"));

function GetSomeCard() {
    for (let i = 0; i < 10; i++) {
        let div = document.createElement("div");
        div.classList.toggle("card", true);
        div.textContent = "New Card";
        observer.observe(div);
        document.getElementById("card-container").appendChild(div);
    }
}