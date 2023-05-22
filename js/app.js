const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  // display 10 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-hidden");
  }

  // display no phones found
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  // display all phones
  // stop spinner or loader
  //   toggleSpinner(false);
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text"> </p>
                <button onclick="loadModal('${phone.slug}')" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Details
              </button>
                
            </div>
        </div>
        `;

    phonesContainer.appendChild(phoneDiv);
  });
};

const processSearch = (dataLimit) => {
  // toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

// handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
  // start loader
  processSearch(10);
});

// search input field enter key handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "enter") {
      processSearch(10);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (!isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// not the best way to load show All
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

// const loadPhoneDetails = async (id) => {
//   const url = `www.openapi.programming-hero.com/api/phone/${id}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   displayPhoneDetails(data.data);
// };

const loadModal = async (id) => {
  console.log(id);
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("body");
  console.log(phone.mainFeatures.sensors[0]);
  phoneDetails.innerHTML = `
  <img src="${phone.image}">
          <p>Release Date: ${phone.releaseDate}</p>
          <p>Storage: ${phone.mainFeatures}</p>
          <p>Others: ${
            phone.others ? phone.others.Bluetooth : "No Bluetooth Information"
          }</p>
          <p>Sensor: ${
            phone.mainFeatures.sensors
              ? phone.mainFeatures.sensors[0]
              : "no sensor"
          }</p>
      `;
};
loadPhones("iphone");
