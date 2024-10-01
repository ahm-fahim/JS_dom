const loadPhone = async (params) => {
	const response = await fetch(
		`https://openapi.programming-hero.com/api/phones?search=iphone`
	);
	const data = await response.json();
	const phones = data.data;
	displayPhone(phones);
};

const displayPhone = (phones) => {
	phones.forEach((phone) => {
		console.log(phone);
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
                <div class="card-actions">
                    <button class="btn btn-warning btn-outline  px-10 btn-sm">Buy Now</button>
                </div>
            </div>
        
        `;

        phoneContainer.appendChild(phoneCard);
	});
};
loadPhone();
