const products=axios.get("http://acme-users-api-rev.herokuapp.com/api/products")
const companies=axios.get("http://acme-users-api-rev.herokuapp.com/api/companies")
const dataPromise = Promise.all([products,companies]).then(results=>{
    return {
        products : results[0].data,
        companies : results[1].data
    }
})
dataPromise.then(responses=>renderNavBar(responses)).then(responses=>renderPage(responses.products))

const table = document.querySelector('#table')
const navBar = document.querySelector('#navBar')

function renderNavBar(responses){
    const html = `<li class='nav-item'>
                    <a href="#products" class="nav-link">Products (${responses['products'].length})</a>
                </li>
                <li class='nav-item'>
                    <a href="#companies" class="nav-link">Companies (${responses['companies'].length})</a>
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
        dataPromise.then(results=>renderPage(results.products))
    }else if (hash==="companies"){
        dataPromise.then(results=>renderPage(results.companies))
    }
    
})