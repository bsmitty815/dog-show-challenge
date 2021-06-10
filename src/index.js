
document.addEventListener('DOMContentLoaded', () => { //the intial fetch for the dog information


    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogShowInfo => {
        dogShowInfo.filter(dogInfo => renderDogInfo(dogInfo))
    })
    .catch(function(error) {
        console.log(error)
    })

    const submitButton = document.getElementById('dog-form')
    submitButton.addEventListener('submit', (e) => updateDogInfo(e))
    //any buttons currently on the page need to go into the dom content loaded so that they are loaded once the page opens
    
})


    function renderDogInfo(dogInfo) { //creating the table with the dog information

        const dogName = dogInfo.name
        const dogBreed = dogInfo.breed
        const dogSex = dogInfo.sex
        const dogId = dogInfo.id
        const editButton = document.createElement('button')
        const table = document.querySelector("body > div > div:nth-child(3) > table")
        const tableBody = document.getElementById('table-body')
        const trRow = document.createElement('tr')
        const tdRowOneNew = document.createElement('td')
        const tdRowTwoNew = document.createElement('td')
        const tdRowThreeNew = document.createElement('td')
        const tdRowFourNew = document.createElement('td')
        trRow.id = dogId
        tdRowOneNew.id = dogId
        tdRowTwoNew.id = dogId
        tdRowThreeNew.id = dogId
        tdRowFourNew.id = dogId
        editButton.id = dogId
        tableBody.appendChild(trRow) // appending the new table rows toe the table body
        trRow.appendChild(tdRowOneNew)
        trRow.appendChild(tdRowTwoNew)
        trRow.appendChild(tdRowThreeNew)
        trRow.appendChild(tdRowFourNew)
        tdRowOneNew.innerText = dogName
        tdRowTwoNew.innerText = dogBreed
        tdRowThreeNew.innerText = dogSex
        tdRowFourNew.appendChild(editButton)
        editButton.innerText = 'Edit Button'
        editButton.id = dogId
        editButton.addEventListener('click', () => editButtonClicked(dogInfo))
 
    }



    function editButtonClicked(dogInfo) { //adding the dog informtation to the submit form once the eidt button is clicked
        const dogNameInput = document.querySelector("#dog-form > input[type=text]:nth-child(1)")
        const dogBreedInput = document.querySelector("#dog-form > input[type=text]:nth-child(2)")
        const dogSexInput = document.querySelector("#dog-form > input[type=text]:nth-child(3)")
        const dogName = dogInfo.name
        const dogBreed = dogInfo.breed
        const dogSex = dogInfo.sex
        const dogId = dogInfo.id
        dogNameInput.value = dogName
        dogBreedInput.value = dogBreed
        dogSexInput.value = dogSex
        const submitButton = document.getElementById('dog-form')
        submitButton.dataset.id = dogId // creating this to carry the dog id to the form
    }
  
  
    function updateDogInfo(e) {

        e.preventDefault()
        
        const dogId = e.target.dataset.id //gets the id that was created to match it to the current dog being edited
        const dogNameInput = document.querySelector("#dog-form > input[type=text]:nth-child(1)")
        const dogBreedInput = document.querySelector("#dog-form > input[type=text]:nth-child(2)")
        const dogSexInput = document.querySelector("#dog-form > input[type=text]:nth-child(3)")
        const newDogName = dogNameInput.value
        const newDogBreed = dogBreedInput.value
        const newDogSex = dogSexInput.value
        


        

        const configurationObject = { //updating the server with the new dog information
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                'name': newDogName,
                'breed': newDogBreed,
                'sex': newDogSex
            })
        }
            fetch(`http://localhost:3000/dogs/${dogId}`, configurationObject)
            .then(response => {
                return response.json()
                })
            .then(data => {
                console.log(data)
                updateDogInfoNewFetch(data)})
            .catch(function(error) {
                console.log(error)
            })
    }

    function updateDogInfoNewFetch() { //fetching for the updated information and calling the next function to update the table
        const tableBody = document.getElementById('table-body') //clearing the old table created and submit form inputs
        tableBody.innerHTML = '';
        const dogNameInput = document.querySelector("#dog-form > input[type=text]:nth-child(1)")
        const dogBreedInput = document.querySelector("#dog-form > input[type=text]:nth-child(2)")
        const dogSexInput = document.querySelector("#dog-form > input[type=text]:nth-child(3)")
        dogNameInput.value = ""
        dogBreedInput.value = ""
        dogSexInput.value = ""

        fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogShowInfo => {
        dogShowInfo.filter(dogInfo => renderDogInfo(dogInfo))
        })
        .catch(function(error) {
            console.log(error)
        })


    }