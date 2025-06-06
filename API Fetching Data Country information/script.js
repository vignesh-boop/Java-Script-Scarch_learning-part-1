const countrySelect = document.getElementById("countrySelect");
let result = document.getElementById("outputResultBox");
let flagImage = document.getElementById("flagImage");
flagImage.style.display="none";
const allCountryApiUrl = "https://restcountries.com/v3.1/all";
let contriesData =[];

// fetching the datas from the URl
const fetchCountries = async()=>{
    try{
        const response = await fetch(allCountryApiUrl);
        contriesData = await response.json();
        console.log(contriesData);  
        populateCountryOption(contriesData);
    }catch(error){
        alert("Not able to fetch the data");
    }
}; 

// appending the fetched country data to the optiomn

const populateCountryOption = (data)=>{
    data.forEach((country)=>{
        const option = document.createElement("option");
        option.value = country.cca2;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
    });
};

//  logic to output of the 3 buttons
function displayInfo(type){
const selectedCountryCode = countrySelect?.value;
if(!selectedCountryCode){
    alert("please enter the country first");
    return;
}

// want to perform the another acton withe the selected country by comparing the country cody we store the selected country

const country = contriesData.find(c=>c?.cca2 == selectedCountryCode);
if(!country){
    return;
}
// result want to change what are button we clicked so we used to switch
switch(type){
    case "population":
            result.value = `population : ${country?.population}`;
        break;
    case "currency":
     
            const currency = Object.entries(country?.currencies||{})
            ?.map(([key , value]) => `${value.name} ${value.symbol}`)
            .join(", ");
            result.value = `Currency : ${currency}`
       
        break;
    case "flag":
        if(country?.flags?.svg){
            flagImage.src = country?.flags?.svg;
            flagImage.style.display = "block";

        }else{
            result.value="Flag is not Found";
        }
}

}  
// logic for clear button

let clearResult = (countryClear = false)=>{
    if(countryClear){
        countrySelect.value="";
    }
    result.value="";
    flagImage.style.display ="none";
};

fetchCountries();