import { create, citiesFilter, stateFilter, searchFilter } from "./crud.js"


// GET data
const api = "https://users-table-list.onrender.com/data"
async function getData(){
  try {
    const response = await fetch(api);
    const data = await response.json();
    create(data)
  } catch (error) {
    console.error(error);
  }
}
getData()

// POST data
async function postData(user){
  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    getData();
  } catch (error) {
    console.error(error);
  }
}

// DELETE data
async function deleteData(id){
  try {
    const response = await fetch(`${api}/${id}`,
    {
      method: 'DELETE'
    })
  } catch (error) {
    console.error(error);
  }
}

// PUT data (edit data)
async function putData(id, user) {
  try {
    const response = await fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    getData()
  } catch (error) {
    console.error(error);
  }
}

// FILTER REGION
async function filterRegion (){
  try {
    let response = null;
      if(citiesFilter.value){
      response = await fetch(`${api}?${'region'}=${citiesFilter.value}`)
    }else{
      response = await fetch(api)
    }
    let data = await response.json();
    create(data)
  } catch (error) {
    console.error(error);
  }
}

// FILTER STATE (status)
async function filterState(){
  try {
    let response = null;
    if(stateFilter.value){
      response = await fetch(`${api}?${"state"}=${stateFilter.value.toUpperCase()}`)
    }else{
      response = await fetch(api)
    }
    let data = await response.json();
    create(data)
  } catch (error) {
    console.error(error);
  }
}

// FILTER SEARCH
async function filterSearch(){
  try {
    let response = null;
    searchFilter ? response = await fetch(`${api}?q=${searchFilter.value}`) : response = await fetch(api);
    let data = await response.json();
    create(data)
  } catch (error) {
    console.error(error);
  }
}
export {
  getData,
  putData,
  deleteData,
  postData,
  filterRegion,
  filterState,
  filterSearch
}