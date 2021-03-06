const companies = axios.get("http://acme-users-api-rev.herokuapp.com/api/companies")
    .then(response=>response.data);
const products = axios.get("http://acme-users-api-rev.herokuapp.com/api/products")
    .then(response=>response.data);

const p1=axios.get("http://acme-users-api-rev.herokuapp.com/api/products")
const p2=axios.get("http://acme-users-api-rev.herokuapp.com/api/companies")
const dataPromise = Promise.all([p1,p2]).then(results=>{
    return{
        products : results[0].data,
        companies : results[1].data
    }
})
dataPromise.then(responses=>renderNavBar(responses)).then(responses=>responses.products)

const table = document.querySelector('#table')
const navBar = document.querySelector('#navBar')
//const p = Promise.all([companies,products]);

//p.then(responses=>renderNavBar(responses)).then(responses=>renderPage(responses[1]));

function renderNavBar(responses){
    const html = `<li class='nav-item'>
                    <a href="#products" class="nav-link">Products (${responses[1].length})</a>
                </li>
                <li class='nav-item'>
                    <a href="#companies" class="nav-link">Companies (${responses[0].length})</a>
                </li>`
    navBar.innerHTML=html
    return responses
}

function renderPage(id){
    
        const tableHeadHTML = `<thead><tr>${Object.keys(id[0]).map(element=>{

            return `<th>${element.toUpperCase()}</th>`
            }).join('')}</tr></thead>`

        const tableBodyHTML = `<tbody>${id.map(element=>{
            return `<tr> ${Object.keys(element).map(key=>{
                return `<td>${element[key]}</td>`
            }).join('')}</tr>`
            
            }).join('')} </tbody>`
    table.innerHTML=tableHeadHTML+tableBodyHTML

}

window.addEventListener('hashchange',()=>{
    const hash = window.location.hash.slice(1)
    if(hash==="products"){
        p.then(results=>renderPage(results[1]))
    }else if (hash==="companies"){
        p.then(results=>renderPage(results[0]))
    }
    
})