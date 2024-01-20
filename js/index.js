const wrapper = document.getElementById('wrapper');
const theme = document.getElementById('theme');
const input = document.querySelector('.input');;
const btn = document.getElementById('btn');
const region = document.getElementById('region');
const bodymain = document.querySelector('body')
const body = document.querySelector('.Allbody')
const loader = document.querySelector('.loader')

body.style.display = "none";

function loaderCallback() {
    loader.style.display = "none";
    body.style.display = "block";
}

function createCard(flag) {
    return `
    <div class="card card1" id="${flag.name.slug}">
                <img src="${flag.flags.png}" alt="flag img">
                <div class="title">
                    <h2>${ flag.name.common}</h2>
                    <p>Population: <span>${flag.population}</span> </p>
                    <p>Region: <span>${flag.region}</span> </p>
                    <p>Capital: <span>${flag.capital}</span> </p>
                </div>
            </div>
    `
}

document.addEventListener('DOMContentLoaded', function () {
    fetch("https://countries-api-v7sn.onrender.com/countries?limit=250", {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            data.data.forEach((flag) => {
                let card = createCard(flag);
                wrapper.innerHTML += card;

            });
            loaderCallback()
        })
        .catch((err) => {
            console.log(err);
        });
})

input.addEventListener('keyup', function () {
    let value = input.value;
    fetch(`https://countries-api-v7sn.onrender.com/countries?search=${value}`)
        .then(data => data.json())
        .then(data => {
            wrapper.innerHTML = ''
            data.data.forEach(element => {
                let card = createCard(element)
                wrapper.innerHTML += card
            });
        })
        .catch(err => {
            console.log(err);
        })
})
wrapper && wrapper.addEventListener('click', () => {
    const card = document.querySelectorAll(".card");
    card.forEach(cardAdd => {
        cardAdd.addEventListener("click", function () {
            let cardId = this.getAttribute("id");
            window.location.assign(`./pages/main.html?${cardId}`);
        });
    });
})

region.addEventListener('change', function () {
    let value = region.value;
    if (value == "All") {
        fetch("https://countries-api-v7sn.onrender.com/countries?limit=250", {
                method: "GET",
            })
            .then(res => res.json())
            .then(data => {
                data.data.forEach((flag) => {
                    let card = createCard(flag);
                    wrapper.innerHTML += card;
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    fetch(`https://countries-api-v7sn.onrender.com/countries?region=${value}`)
        .then(data => data.json())
        .then(data => {
            wrapper.innerHTML = ''
            data.data.forEach(element => {
                let card = createCard(element)
                wrapper.innerHTML += card
            });
            loaderCallback()
        })
        .catch(err => {
            console.log(err);
        })
})

theme && theme.addEventListener("click", () => {
    bodymain.classList.toggle("darc")
});