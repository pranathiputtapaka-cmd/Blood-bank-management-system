const donateForm = document.getElementById("donateForm");
const donorTable = document.getElementById("donorTable").querySelector("tbody");
const inventoryTable = document.getElementById("inventoryTable").querySelector("tbody");
const requestForm = document.getElementById("requestForm");

let donors = JSON.parse(localStorage.getItem("donors")) || [];

let inventory = JSON.parse(localStorage.getItem("inventory")) || {
    "A+": 0,
    "B+": 0,
    "O+": 0,
    "AB+": 0
};

function updateInventory() {

    inventoryTable.innerHTML = "";

    for (let blood in inventory) {

        let row = inventoryTable.insertRow();

        row.insertCell(0).textContent = blood;
        row.insertCell(1).textContent = inventory[blood];
    }
}

function displayDonors() {

    donorTable.innerHTML = "";

    donors.forEach(donor => {

        let row = donorTable.insertRow();

        row.insertCell(0).textContent = donor.name;
        row.insertCell(1).textContent = donor.bloodType;
        row.insertCell(2).textContent = donor.date;
    });
}

updateInventory();
displayDonors();

donateForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let donorName = document.getElementById("donorName").value;
    let bloodType = document.getElementById("bloodType").value;
    let donationDate = document.getElementById("donationDate").value;

    donors.push({
        name: donorName,
        bloodType: bloodType,
        date: donationDate
    });

    inventory[bloodType]++;

    localStorage.setItem("donors", JSON.stringify(donors));
    localStorage.setItem("inventory", JSON.stringify(inventory));

    displayDonors();
    updateInventory();

    donateForm.reset();

    alert("Blood Donated Successfully!");
});

requestForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let bloodType = document.getElementById("requiredBloodType").value;

    if (inventory[bloodType] > 0) {

        inventory[bloodType]--;

        localStorage.setItem("inventory", JSON.stringify(inventory));

        updateInventory();

        alert("Blood Request Approved");

    } else {

        alert("Blood Not Available");
    }
});

function generateCertificate() {

    let donorName = document.getElementById("certificateName").value;

    if (donorName === "") {

        alert("Enter Your Name");
        return;
    }

    let newWindow = window.open("", "_blank");

    newWindow.document.write(`
        <html>
        <head>
            <title>Certificate</title>

            <style>
                body{
                    text-align:center;
                    font-family:Arial;
                    padding-top:100px;
                }

                .certificate{
                    border:5px solid red;
                    padding:40px;
                    width:60%;
                    margin:auto;
                }
            </style>

        </head>

        <body>

            <div class="certificate">

                <h1>Blood Donation Certificate</h1>

                <h2>${donorName}</h2>

                <p>Thank you for donating blood and saving lives.</p>

            </div>

        </body>
        </html>
    `);

    newWindow.document.close();
}