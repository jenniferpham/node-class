//USD CAD - canadian equivalent of $23
//Result should be: "23 USD is worth -- CAD. You can spend this in the following countries (that accept CAD)""
//http://api.fixer.io/latest?base=USD
//https://restcountries.eu/rest/v2/currency/CAD

const axios = require('axios');

const getExchangeRate = async (from, to) => { //to use await, you must have async function
    // return axios.get(`http://api.fixer.io/latest?base=${from}`).then( (response)=> {
    //     return response.data.rates[to]; //just need a number back for the exchange rate. "to" argument is second currency. pull property of second currency
    // })
    try{
        const response = await axios.get(`http://api.fixer.io/latest?base=${from}`); //whether from is valid or not
        var rate = response.data.rates[to];  //this could be undefined if 'to' argument doesnt exist

        if(rate){
            return rate;
        } else{
            throw new Error()
        }
    } catch(err){
        throw new Error(`unable to find rates for ${from} and/or ${to}`)
    }
}

const getCountries = async (currencyCode) => {
    // return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then( (response)=> {
    //     return response.data.map( (country) => country.name)
    // })
    try{
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map( (country) => country.name );
    }
    catch(e){
        throw new Error(`unable to find country for ${currencyCode}`)
    }
    
}

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then( (tempCountries)=> {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then( (rate)=>{
        const exchangedAmount = amount * rate;

        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(", ")}`
    })
}

// convertCurrency('USD', 'CAD', 100).then( (status)=>{
//     console.log(status);
// })
// getExchangeRate('USD', 'EUR').then( (rate)=>{
//     console.log(rate);
// })
// getCountries('EUR').then( (rate)=>{
//     console.log(rate);
// })

const convertCurrencyAlt = async (from, to, amount) => {
    const exchangeRate = await getExchangeRate(from, to);
    const countries = await getCountries(to); //await if resolves gives the variable. if rejected, goes to catch error

    const exchangedAmount = amount * exchangeRate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(", ")}`
}

convertCurrencyAlt('USD', 'EUR', 100).then( (data)=>{
    console.log(data);
}).catch((err) => {
    console.log(err.message);
})
//Craete convertCurrencyAlt as async function
//Get countries and rate using await and our two functions
//Calculate exchangedAmount
//Return status string