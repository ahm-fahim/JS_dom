// hero load
const loadHeroPhone = async () => {
	const response = await fetch(
		`https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089`
	);
	const data = await response.json();
	const phones = data.data;
	displayHero(phones);
	console.log(phones);
};
// display hero
const displayHero = (phone) => {
	const heroPhoneContainer = document.getElementById("hero-section");
	const heroBody = document.createElement("div");
	heroBody.innerHTML = `
            <div class="hero  min-h-96">
                <div class="hero-content text-center">
                    <div class=" flex flex-col justify-center items-center">
                        <h1 class="text-5xl font-anton mt-10">${phone.name}</h1>
                        <p class ="text-xl text-gray-500 mt-5" >${phone.releaseDate}</p>
                        <button class="btn btn-warning mt-5">Buy Now</button>
                        <img class="h-80 mt-10" src="${phone.image}" alt="phone"/>
                    </div>
                </div>
            </div>
        `;
	heroPhoneContainer.appendChild(heroBody);
};

// load card data
const loadPhone = async (searchText, isShowAll) => {
	const response = await fetch(
		`https://openapi.programming-hero.com/api/phones?search=${searchText}`
	);
	const data = await response.json();
	const phones = data.data;
	displayPhone(phones, isShowAll);
};

// display phone
const displayPhone = (phones, isShowAll) => {
	const phoneContainer = document.getElementById("phone-container");
	phoneContainer.textContent = " ";

	const showAll = document.getElementById("showAll");

	if (phones.length > 10 && !isShowAll) {
		showAll.classList.remove("hidden");
	} else {
		showAll.classList.add("hidden");
	}

	if (!isShowAll) {
		phones = phones.slice(0, 10);
	}

	phones.forEach((phone) => {
		// display phone on card
		const phoneContainer = document.getElementById("phone-container");
		const phoneCard = document.createElement("div");
		phoneCard.classList = "card bg-base-100 shadow-xl";
		phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
                <img
                    src="${phone.image}"
                    alt="phone"
                    class="rounded-xl"
                />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title font-anton"> ${phone.phone_name}</h2>
                <p class = "text-gray-500">${phone.brand}</p>
                <p class = "text-gray-500">${phone.slug}</p>
                <div class="card-actions flex flex-row">
                    <button class="btn btn-warning px-2 btn-outline btn-sm">Buy Now</button>
                    <button onClick = "handleDetails('${phone.slug}'); show_details_modals.showModal()" class="btn btn-warning px-4 btn-sm">Details</button>
                </div>
            </div>
        
        `;
		phoneContainer.appendChild(phoneCard);
	});
	//hide loading
	toggleLoading(false);
};

// show details

const handleDetails = async (id) => {
	const response = await fetch(
		`https://openapi.programming-hero.com/api/phone/${id}`
	);
	const data = await response.json();
	const details = data.data;
	console.log(details);

	const modal_details = document.getElementById("modal_details");
	modal_details.innerHTML = `
        <h1 class="text-2xl font-anton">${details.name}</h1>
        <p class ="text-gray-400">Brand : <span class ="text-orange-400">${details.brand}</span> </p>
        <p class ="text-gray-400">Released Date : <span class ="text-gray-700">${details.releaseDate}</span> </p>
        <hr>
        <h3 class ="text-xl text-black font-bold ">Main Features</h3>
        <p class ="text-gray-400">Chip Set : <span class ="text-gray-700">${details.mainFeatures.chipSet}</span> </p>
        <p class ="text-gray-400">Display Size : <span class ="text-gray-700">${details.mainFeatures.displaySize}</span> </p>
        <p class ="text-gray-400">Memory : <span class ="text-gray-700">${details.mainFeatures.memory}</span> </p>
        <p class ="text-gray-400">Storage : <span class ="text-gray-700">${details.mainFeatures.storage}</span> </p>
        <hr>
        <h3 class ="text-xl text-black font-bold ">Others Details</h3>
        <p class ="text-gray-400">Bluetooth : <span class ="text-gray-700">${details.others.Bluetooth}</span> </p>
        <p class ="text-gray-400">GPS : <span class ="text-gray-700">${details.others.GPS}</span> </p>
        <p class ="text-gray-400">NFC : <span class ="text-gray-700">${details.others.NFC}</span> </p>
        <p class ="text-gray-400">Radio : <span class ="text-gray-700">${details.others.Radio}</span> </p>
        <p class ="text-gray-400">USB : <span class ="text-gray-700">${details.others.USB}</span> </p>\
        <p class ="text-gray-400">WLAN : <span class ="text-gray-700">${details.others.WLAN}</span> </p>
    `;
};

// searching
const handleSearch = (isShowAll) => {
	toggleLoading(true);
	const searchField = document.getElementById("search-field");
	const searchValue = searchField.value;
	loadPhone(searchValue, isShowAll);
};

// loading
const toggleLoading = (isLoading) => {
	const loader = document.getElementById("loader");
	if (isLoading) {
		loader.classList.remove("hidden");
	} else {
		loader.classList.add("hidden");
	}
};

// handle show all

const handleShowAll = () => {
	handleSearch(true);
};

loadPhone("iphone");
loadHeroPhone();
