import {
  getData,
  putData,
  deleteData,
  postData,
  filterRegion,
  filterState,
  filterSearch
} from "./api.js"

// Edit dialog Modals selectors..............
const editDialog = document.querySelector('.editDialog')
let closeEditDialog = document.querySelector('.closeEditDialog')
let editDialog__form = document.querySelector('.editDialog__form')
// Selectors for 'Add modal'
let addOpen = document.querySelector(".addOpen")
let addDialog = document.querySelector(".addDialog")
let addClose = document.querySelector(".addClose")
let tbody = document.querySelector("tbody")
let addDialog__form = document.querySelector(".addDialog__form")
// Selector for Info dialog modal
let infoDialog = document.querySelector(".infoDialog")
// Selectors for dark and light themes
let body = document.querySelector("body")
let dark = document.querySelector(".dark")
let light = document.querySelector(".light")
let switchButton = document.querySelector(".switch-button")
// Filter selectors
let citiesFilter = document.querySelector(".citiesFilter");
let searchFilter = document.querySelector(".searchFilter");
let stateFilter = document.querySelector(".stateFilter");


// Background color for body and sun-moon switching
switchButton.onpointerdown = () => {
  body.className
    ? (body.classList.remove("dark"), (switchButton.innerHTML = "wb_sunny"))
    : (body.classList.add("dark"), (switchButton.innerHTML = "dark_mode"))
}

//Create............................
function create(data) {
  tbody.innerHTML = ""
  data.forEach((element) => {
    // DISPLAY backend info on table body
    let tr = document.createElement("tr")
    tr.innerHTML = `
                <td>
                  <img src="${element.avatar}" alt="${element.firstName}">
                  <div class="userNameEmail">
                    <h2>${element.firstName} ${element.lastName}</h2>
                    <small>${element.email}</small>
                  </div>
                </td>
                <td>${element.region}</td>
                <td>
                  <span class="inactive">${element.state}</span>
                </td>
                <td>
                  ${element.phone}
                      <span class="material-symbols-outlined moreBtn" tabindex="0">more_horiz</span>
                    <ul class="moreBtnonpointerdown">
                      <li class="viewProfile" tabindex="0">
                        <span class="material-symbols-outlined">person</span> View profile
                      </li>
                      <li class="editProfile" tabindex="0">
                        <span class="material-symbols-outlined">edit</span> Edit
                      </li>
                      <li class="deleteProfile" tabindex="0">
                        <span class="material-symbols-outlined">delete</span> Delete
                      </li>
                    </ul>
                </td>
     `    
    tbody.append(tr)
   let state = tr.querySelector(".inactive")
   if (state.innerHTML == 'ACTIVE') {
    state.style.backgroundColor = 'var(--green)'
   }else{
    state.style.backgroundColor = "var(--gray)"
   }
    
    // Let open or close moreBtn..........
    let moreBtn = tr.querySelector(".moreBtn")
    let moreBtnonpointerdown = tr.querySelector(".moreBtnonpointerdown")
    moreBtn.onpointerdown = () => {
      if(moreBtnonpointerdown.style.display == "none"){
        moreBtnonpointerdown.style.display = "block"}
      else{
        moreBtnonpointerdown.style.display = "none"
      }
    }
    // Let open ProfileInfo
    let viewProfile = tr.querySelector(".viewProfile")
    viewProfile.onpointerdown = () => {
      infoDialog.innerHTML = `     
      <div class="infoDialog__header">
        <span class="material-symbols-outlined closeInfo">close</span>
        <h2>User Info</h2>
      </div>
      <div class="infoDialog__userAvatar">
        <img src="${element.avatar}">
        <div class="userNameEmail">
          <h2>${element.firstName} ${element.lastName}</h2>
          <small>${element.email}</small>
        </div>
      </div>
      <table class="infoDialog__status">
        <tr>
          <td>
            <span class="material-symbols-outlined">lock</span>
            City
          </td>
          <td class="infoCity">${element.region}</td>
        </tr>
        <tr>
          <td>
            <span class="material-symbols-outlined">schedule</span>
            Status
          </td>
          <td class="infoUserStatus">${element.state}</td>
        </tr>
        <tr>
          <td>
            <span class="material-symbols-outlined">sell</span>
            Phone
          </td>
          <td class="userPhoneNumber">${element.phone}</td>
        </tr>
      </table>
       `
      infoDialog.style.display = "flex"
      moreBtnonpointerdown.style.display = "none"
     let closeInfo = infoDialog.querySelector(".closeInfo")
      closeInfo.onpointerdown = function () {
        infoDialog.style.display = "none"
      }
    }
    // EDIT........
    let editProfile = tr.querySelector(".editProfile")
    editProfile.onpointerdown = () =>{
      moreBtnonpointerdown.style.display = "none"
      editDialog.style.display = "grid"
  
      editDialog__form.name.value = element.firstName;
      editDialog__form.surname.value = element.lastName;
      editDialog__form.image.value = element.avatar;
      editDialog__form.email.value = element.email;
      editDialog__form.phone.value = element.phone
      
      editDialog__form.onsubmit = (e) =>{
        e.preventDefault();
        let user = {
          firstName: editDialog__form.name.value,
          lastName: editDialog__form.surname.value,
          avatar: editDialog__form.image.value,
          region: editDialog__form.checkVisibility.value,
          email: editDialog__form.email.value,
          state: editDialog__form.state.value.toUpperCase(),
          phone: editDialog__form.phone.value,
          id: data.length + 1,
          region: editDialog__form.city.value
        }
        putData(element.id, user)
        editDialog.style.display = "none"
      }
      
      // Close edit dialog
      closeEditDialog.onpointerdown = () =>{
        editDialog.style.display = "none"
      }
    }

      // DELETE
      let deleteProfile = tr.querySelector(".deleteProfile")
      deleteProfile.onpointerdown = () =>{
        deleteData(element.id)
      }
////////////
        
        

  })
}
      // ADD
      addOpen.onpointerdown = function () {
        addDialog.style.display = "grid"
      }
      addClose.onpointerdown = function () {
        addDialog.style.display = "none"
      }
      addDialog__form.onsubmit = function () {
  
        let user = {
          firstName: addDialog__form.name.value,
          lastName: addDialog__form.surname.value,
          avatar: addDialog__form.image.value,
          region: addDialog__form.city.value,
          email: addDialog__form.email.value,
          state: addDialog__form.state.value.toUpperCase(),
          phone: addDialog__form.phone.value,
          id: new Date().getTime(),
        }
        postData(user)
        console.log(111);
      } 

    // CITY filtering
    citiesFilter.onchange = function () {
     filterRegion()
    }
    // STATE filtering
    stateFilter.onchange = function () {
      filterState()
    }
    // SEARCH filtering
    searchFilter.oninput = function(){
      filterSearch()
    }
//let set themes
dark.onpointerdown = () => {
  body.classList.add("dark")
  dark.classList.add("activeTheme")
  light.classList.remove("activeTheme")
}
light.onpointerdown = () => {
  body.classList.remove("dark")
  light.classList.add("activeTheme")
  dark.classList.remove("activeTheme")
}
export {
  addOpen,
  create,
  editDialog__form,
  citiesFilter,
  stateFilter,
  searchFilter,
}
