const loadMobiles = (search) => {
     const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
     fetch(url)
     .then(res => res.json())
     .then(data => displayPhones(data.data))
}

const displayPhones = (phones) =>{
     //Display not found message
     const notFoundMessage = document.getElementById('not-found-msg');
     if(phones.length === 0){
          notFoundMessage.classList.remove('d-none')
     }
     else{
          notFoundMessage.classList.add('d-none')
     }

     
     phones = phones.slice(0,9)
     const cardContainer = document.getElementById('card-container');
     cardContainer.textContent = '';
     phones.forEach(phone => {
          // console.log(phone);
          const {image, phone_name} = phone;
          const newDiv = document.createElement('div');
          newDiv.classList.add('col')
          newDiv.innerHTML = `
          <div class="card h-100">
          <img class="p-2" src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
               <h5 class="card-title">${phone_name}</h5>
               <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
               <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary fw-semibold" data-bs-toggle="modal" data-bs-target="#phoneDetails">Show Details</button>
          </div>
          </div>
          `
          cardContainer.appendChild(newDiv)
     });

     //Stop loader
     toggleSpinner(false)
}

loadMobiles('a')


//Search button click
document.getElementById('search-btn').addEventListener('click', function(){
     //Start loader
     toggleSpinner(true);

     const searchFiled = document.getElementById('search-field');
     const searchedText = searchFiled.value;

     //Add warning on empty search input⚠️
     if(searchedText === ''){
          alert('Please provide phone name📱')
          return;
     }
     loadMobiles(searchedText)
     searchFiled.value ='';
})

//Enter button clicked
document.getElementById('search-field').addEventListener('keypress', function(event){
     //Start loader
     toggleSpinner(true);

     if (event.key === "Enter") {
          const searchFiled = document.getElementById('search-field');
          const searchedText = searchFiled.value;

          //Add warning on empty search input⚠️
          if(searchedText === ''){
               alert('Please provide phone name📱')
               return;
          }
          loadMobiles(searchedText)
          searchFiled.value ='';
     }
})

//Add loading spinner
const toggleSpinner = (isLoading) =>{
     const loader = document.getElementById('loader');
     if(isLoading){
          loader.classList.remove('d-none')
     }
     else{
          loader.classList.add('d-none')
     }
}

//Show Modal on 'Show details' btn click
const loadPhoneDetails = async (id) => {
     const url = `https://openapi.programming-hero.com/api/phone/${id}`;
     const res = await fetch(url);
     const data = await res.json();
     displayMobileDetails(data.data);
}

const displayMobileDetails = (mobile) => {
     const {name, mainFeatures, image, releaseDate} = mobile;
     const {storage, displaySize, chipSet, memory} = mainFeatures;
     const title = document.getElementById('phoneDetailsLabel');
     title.innerText = name;
     const phoneDetails = document.getElementById('phone-details');
     phoneDetails.innerHTML = `
     <div class="card mb-3" style="max-width: 540px;">
     <div class="row g-0">
     <div class="col-md-4 p-2">
         <img src="${image}" class="img-fluid rounded-start" alt="...">
     </div>
       <div class="col-md-8">
         <div class="card-body">
           <h5 class="card-text">${releaseDate}</h5>
           <p>
           <strong>Chipset:</strong> ${chipSet} <br>
           <strong>Memory:</strong> ${memory} <br>
           <strong>Display:</strong> ${displaySize}
           </p>
         </div>
       </div>
     </div>
     </div>
     `
}

