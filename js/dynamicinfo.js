function loadData(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response); }
            else {
                reject({ status: this.status, statusText: xhr.statusText}); 
            };
        };
        xhr.onerror = function () { reject({ status: this.status, statusText: xhr.statusText }); }; 
        xhr.send();
    });
}

function randomfact() {
    loadData("GET", "./json/facts.json")
    .then(data => {
        const factP = document.getElementById("facts");
        if (factP !== null) {
            const factslist = JSON.parse(data);
            const factNo = Math.floor(Math.random() * factslist["facts"].length);
            factP.innerHTML = factslist["facts"][factNo];
        }
    })
}

function hotels() {
    loadData("GET", "./json/accomodation.json")
    .then(data => {
        const hotelGrid = document.getElementById("hotelGrid");

        if (hotelGrid !== null) {
            const hotelList = JSON.parse(data);

            hotelList.forEach(hotel => {
                gridItem = document.createElement('div');
                gridItem.className = 'GridItem HorizontalCenter';

                hname = document.createElement('h3');
                hname.className = "ReadAloud";
                hname.innerHTML = hotel.accomodation;
                gridItem.appendChild(hname);

                haddress = document.createElement('p');
                haddress.className = 'Address ReadAloud';
                haddress.innerHTML = hotel.address;
                gridItem.appendChild(haddress);

                himg = document.createElement('img');
                himg.src = hotel.image;
                himg.alt = hotel.accomodation;
                himg.width = 620;
                himg.height = 465;
                gridItem.appendChild(himg);

                hdescription = document.createElement('p');
                hdescription.innerHTML = hotel.description;
                gridItem.appendChild(hdescription);

                hotelGrid.appendChild(gridItem);
            });
        }
    })
}

function events() {
    loadData("GET", "./json/events.json")
    .then(data => {
        const eventGrid = document.getElementById("eventGrid");

        if (eventGrid !== null) {
            const eventList = JSON.parse(data);

            eventList.forEach(event => {
                gridItem = document.createElement('div');
                gridItem.className = 'GridItem HorizontalCenter';

                ename = document.createElement('h3');
                ename.className = 'ReadAloud';
                ename.innerHTML = event.name+" @ "+event.schedules[0].place.name;
                gridItem.appendChild(ename);

                eperformances = document.createElement('div');
                eperformances.className = "Fullwidth Performances ReadAloud"

                const performances = event.schedules[0].performances;
                performances.forEach( performance => {
                    ep = document.createElement('div');

                    elink = document.createElement('a');
                    elink.className = "Highlight Fullwidth Performance";
                    elink.href = performance.links.url;

                    edate = new Date(performance.ts);
                    eprice = new Number(performance.tickets[0].min_price);
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };

                    if (eprice > 0) {
                        etext = edate.toLocaleDateString('en-GB', options)+' (£'+eprice.toFixed(2)+')';
                    }
                    else {
                        etext = edate.toLocaleDateString()+' (free)';
                    }
                    ep.innerHTML = etext;

                    elink.appendChild(ep);
                    eperformances.appendChild(elink);
                })

                gridItem.appendChild(eperformances);

                eventGrid.appendChild(gridItem);
            });
        }
    })
}

function food() {
    loadData("GET", "./json/food.json")
    .then(data => {
        const foodGrid = document.getElementById("foodGrid");

        if (foodGrid !== null) {
            const foodList = JSON.parse(data);

            foodList.forEach(food => {
                gridItem = document.createElement('div');
                gridItem.className = 'GridItem HorizontalCenter';

                fname = document.createElement('h3');
                fname.innerHTML = food.name;
                fname.className = 'ReadAloud';
                gridItem.appendChild(fname);

                fcuisine = document.createElement('p');
                fcuisine.className = "cuisine";
                const tags = food.cuisine.split(", ");
                tags.forEach( tag => {
                    ftag = document.createElement('span');
                    ftag.innerHTML = tag;
                    fcuisine.appendChild(ftag);
                })
                gridItem.appendChild(fcuisine);

                cuisineText = document.createElement('div');
                cuisineText.style.display = 'none';
                cuisineText.className = 'ReadAloud';
                cuisineText.innerHTML = "The cuisine is "+food.cuisine;
                gridItem.appendChild(cuisineText);

                fstarDiv = document.createElement('div');
                fstarCount = (Math.round(food.stars * 2) / 2).toFixed(1);
                fstarWhole = Math.trunc(fstarCount);
                for (let i = 0; i < fstarWhole; i++) {
                    fstars = document.createElement('i');
                    fstars.className = 'fa-solid fa-star';
                    fstarDiv.appendChild(fstars);
                }
                if (fstarCount - fstarWhole > 0) {
                    fstars = document.createElement('i');
                    fstars.className = 'fa-solid fa-star-half';
                    fstarDiv.appendChild(fstars);
                }

                starText = document.createElement('div');
                starText.style.display = 'none';
                starText.className = 'ReadAloud';
                starText.innerHTML = "Rated "+food.stars+" stars with "+food.reviewcount+" reviews";
                gridItem.appendChild(starText);

                freviews = document.createElement('p');
                freviews.className = 'reviewCount';
                freviews.innerHTML = "("+food.reviewcount+" reviews)";
                fstarDiv.appendChild(freviews);
                gridItem.appendChild(fstarDiv);

                freview = document.createElement('blockquote');
                let freviewArray = "";
                food.reviews.forEach( review => {
                    freviewArray = freviewArray+'"'+review+'"<br /><br />';
                });
                freview.innerHTML = freviewArray;
                gridItem.appendChild(freview);
               
                foodGrid.appendChild(gridItem);
            });
        }
    })
}

function histories() {
    loadData("GET", "./json/history.json")
    .then(data => {
        const historyGrid = document.getElementById("historyGrid");

        if (historyGrid !== null) {
            const historyList = JSON.parse(data);

            historyList.forEach(history => {
                gridItem = document.createElement('div');
                gridItem.className = 'GridItem HorizontalCenter';

                hname = document.createElement('h3');
                hname.className =  'ReadAloud';
                hname.innerHTML = history.name;
                gridItem.appendChild(hname);

                haddress = document.createElement('p');
                haddress.className = 'Address ReadAloud';
                haddressContent = history.address.replace(", ", "<br />")
                if (history.telephone !== "") {
                    haddressContent = haddressContent+'<br />Tel: '+history.telephone;
                }
                haddress.innerHTML = haddressContent;
                gridItem.appendChild(haddress);

                hstarDiv = document.createElement('div');
                hstarCount = (Math.round(history.stars * 2) / 2).toFixed(1);
                hstarWhole = Math.trunc(hstarCount);
                for (let i = 0; i < hstarWhole; i++) {
                    hstars = document.createElement('i');
                    hstars.className = 'fa-solid fa-star';
                    hstarDiv.appendChild(hstars);
                }
                if (hstarCount - hstarWhole > 0) {
                    hstars = document.createElement('i');
                    hstars.className = 'fa-solid fa-star-half';
                    hstarDiv.appendChild(hstars);
                }
                gridItem.appendChild(hstarDiv);

                hstarCountText = "Rated "+history.stars+" stars,";
                hstarTextDiv = document.createElement('div');
                hstarTextDiv.style.display = 'none';
                hstarTextDiv.className = 'ReadAloud';
                hstarTextDiv.innerHTML = hstarCountText;
                gridItem.appendChild(hstarTextDiv);

                if (history.review !== "") {
                    hreview = document.createElement('quote');
                    hreview.className = 'ReadAloud';
                    hreview.innerHTML = '"'+history.review+'"';
                    gridItem.appendChild(hreview);
                }

                historyGrid.appendChild(gridItem);
            });
        }
    })
}