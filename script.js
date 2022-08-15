const API_KEY = "f7c0b35e-a226-4729-932e-9cbceab833ca"

document.getElementById("countries-list-btn").addEventListener("click",() => {
    renderCountries()
})
// country list
const getCountries = async () => {
    try {
        const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`
        const res = await fetch(url)
        const data = await res.json()
        console.log("data",data)
        return data
    } catch (error) {
        console.log("error",error)
    }
}

const renderCountries = async() => {
    try {
        //1. Fetch all the countries by using function `getCountries`
        const data = await getCountries()

        //2. Find the element with the id `countries-list`
        const countriesList = document.getElementById("countries-list")

        //3. Take out the `ul` element
        const ulCountriesList = countriesList.children[2]

        //4. Delete the sample inside `ul` element
        ulCountriesList.innerHTML=""

        //5. Loop through the list of countries
        data.countries.forEach((country, index) => {

            //Create new `li` for each element
            const x = document.createElement("li")
            x.innerHTML= `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${country.name}</div>
                <div>Code: ${country.code}</div>
            </div>`

             //Then append them to the `ul` element
            ulCountriesList.appendChild(x)
        })
      
    } catch (error){
        console.log("error",error)
    }
}

// language list

const getLanguage = async() => {
    try {
        const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console("error",error)
        return error
    }

}

document.getElementById("languages-list-btn").addEventListener("click",() => {
    renderLanguage()
})

const renderLanguage = async() => {
    try {
        const data = await getLanguage() 
        // await function getLanguage to get data array from API
        const languageList = document.getElementById("languages-list")
        // find languageList (HTML)

        const ulLanguageList = languageList.children[2]
        // find ul (HTML)
        ulLanguageList.innerHTML =""
        // clear UL content (HTML)

        data.languages.forEach((language, index) => {
            const y = document.createElement("li")
            y.innerHTML = `   <div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
              <div class="li-title">${language.name}</div>
              <div class="li-text">${language.code}</div>
            </div>`
    // loop through each iteration of "languages" array and create a li element, then languages.name and languages.code

            ulLanguageList.appendChild(y)
            // append added li to UL (HTML) in FOREACH
    })
  
    }catch(error) {
        console.log("error",error)
    }
}

// holiday list

const searchInput = document.getElementById("search-query")
const yearInput = document.getElementById("year-query")
const monthInput = document.getElementById("month-query")
const dayInput = document.getElementById("day-query")
const countryInput = document.getElementById("country-query")
const langInput = document.getElementById("language-query")
const holidayCountry = document.getElementById("holidays-list").children[0]

let countryName 
let url = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&country=${countryName}&year=2021`

document.getElementById("holidays-btn").addEventListener("click", () => {
    renderHoliday()
})
const getHoliday  = async() => {
    try {
        if(!countryInput.value) {
            
            countryName ="VN"
            url = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&country=${countryName}&year=2021`
            await getCountries()
            // const countryTest = await getCountries()
            // console.log(countryTest.countries)
            // // const test = countryTest.countries.find(({code} => code ==="VN"))
            // console.log(test)
            const res = await fetch(url)
            const data = await res.json()
            holidayCountry.textContent=`Holidays of ${countryName}`
            console.log(data)
            return data
        }
        else {
            countryName =countryInput.value
             url = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&country=${countryName}&year=2021`
            const res = await fetch(url)
            const data = await res.json()
            holidayCountry.textContent=`Holidays of ${countryName}`
            console.log(data)
            return data        }
    } catch (error) {
        console.log("error",error)
    }
}

const renderHoliday = async () => {
    try{
        const data = await getHoliday()
        const holidayList = document.getElementById("holidays-list")
        const ulHolidayList = holidayList.children[1]
        ulHolidayList.innerHTML=""
        // console.log(data.holidays[0].date)
        data.holidays.forEach((holiday,index) => {
            const z = document.createElement("li") 
            z.innerHTML=` <div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
              <div class="li-title">${holiday.name}</div>
              <div class="li-text">${holiday.date}</div>
            </div>`

            ulHolidayList.appendChild(z)
        })
    } catch (error) {
        console.log("error",error)
    }
}