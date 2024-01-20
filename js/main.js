// console.log(window.location.href);
const wrapper = document.getElementById('wrapper');
let url = window.location.href.substring(38)
const body = document.querySelector('.Allbody')
const loader = document.querySelector('.loader')
body.style.display = "none";

function loaderCallback() {
    loader.style.display = "none";
    body.style.display = "block";
}


function createCard(flag) {
    return `
    <div class="main">
                <div class="img">
                    <img src="${flag.flags.png}" width="560" height="420"  alt="">
                </div>
                <div class="description_main">
                    <div class="description">
                    <div class="title">
                        <h5>${flag.name.common}</h5>
                        <p>Native Name: <span>${flag.languages}</span></p>
                        <p>Population: <span>${flag.population}</span></p>
                        <p>Region: <span>${flag.region}</span></p>
                        <p>Sub Region: <span>${flag.subregion}</span></p>
                        <p>Capital: <span>${flag.capital}</span></p>
                    </div>
                    <div class="text">
                        <p>Top Level Domain: <span>be</span></p>
                        <p>Currencies: <span>${flag.currencies}</span></p>
                        <p>Languages: <span>${flag.languages}</span></p>
                    </div>
                </div>
                <div class="footer">
                    <h4>Border Countries: </h4>

                </div>
                </div>
            </div>
    `
}
document.addEventListener('DOMContentLoaded', function () {
    fetch(`https://countries-api-v7sn.onrender.com/countries/slug/${url}`)
   
        .then(data => data.json())
        .then(data => {
            let card = createCard(data)
            wrapper.innerHTML = card;
            loaderCallback()
            
        })
        
})

