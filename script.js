const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // if (!entry.target.classList.contains("show") && entry.isIntersecting) {
        // let audio = document.createElement("audio");
        // audio.src = "short_punch1.mp3";
        // audio.onpause = () => {
        //     document.body.removeChild(audio);
        // }
        // document.body.appendChild(audio);
        // audio.play();
        // }
        entry.target.classList.toggle("show", entry.isIntersecting);
    })
}, {
    threshold: [1],
    rootMargin: "0px"
});

document.querySelectorAll(".card").forEach(card => {
    observer.observe(card);
})

var addedCount = 0;

const lastCardObserver = new IntersectionObserver(async (entries) => {
    let last = entries[0];
    if (!last.isIntersecting) {
        return
    }

    await GetSomeCard()
    lastCardObserver.unobserve(last.target);
    lastCardObserver.observe(document.querySelector(".card:nth-last-child(-n+2)"));
}, {});

lastCardObserver.observe(document.querySelector(".card:nth-last-child(-n+2)"));

async function GetSomeCard() {
    document.getElementById("loading").classList.toggle("show", true);
    return new Promise((resolve, rejct) => {
        setTimeout(() => {
            return resolve();
        }, 1000);
    }).then((resolve, reject) => {
        console.log(resolve);
        for (let i = 0; i < 10; i++) {
            let div = document.createElement("div");
            div.classList.toggle("card", true);
            div.textContent = `New Card ${++addedCount}`;
            observer.observe(div);
            document.getElementById("card-container").appendChild(div);
        }
        document.getElementById("loading").classList.toggle("show", false);
        return "resolve";
    })
}