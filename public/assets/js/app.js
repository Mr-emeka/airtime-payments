const url = "https://sandbox.wallets.africa/bills/airtime/purchase";
const publicKey = 'byog4b60fwz0'
const secretKey = 'g2h6yucvov83'

window.addEventListener("DOMContentLoaded", () => {
  var db = firebase.database() || database;
  let data;
  const tbody = document.querySelector('#tbody');


  const arr = []
  db.ref(`interns`).on('value', snap => {
    Object.keys(snap.val() || {}).map(x => arr.push(snap.val()[x]))
    arr.map((d, i) => {
      const row = document.createElement('tr')
      const name = document.createElement('td');
      const telephone = document.createElement('td');
      const input = document.createElement('td');
      const airtime = document.createElement('td');
      const btntd = document.createElement('td');
      input.innerHTML = `<div class="group">
      <input type="number" name="amount" class="airtime-amount" required />
      <span class="highlight"></span>
      </div>`

      btntd.innerHTML = `
    <button class="btn send">Send</button>
    `;
      name.innerText = d.name;
      telephone.innerText = d.telephone;
      airtime.innerText = d.network
      row.appendChild(name);
      row.appendChild(telephone);
      row.appendChild(airtime);
      row.appendChild(input);
      row.appendChild(btntd);
      tbody.appendChild(row)
    })
  })

  // document.querySelector('.send').addEvenlistener('click', send)
  console.log(arr)

  function send(i) {
    console.log(i)
  }



  // document.querySelector('.send').addEventlistener('click', send)
  const sendAirtime = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "Code": "airtel",
      "Amount": 100,
      "PhoneNumber": "07068260000",
      "SecretKey": secretKey
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // send airtime url
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }


  const modal = document.querySelector('.modale');
  const open = () => {
    modal.classList.add('opened')
  }
  const close = () => {
    modal.classList.remove('opened')
  }
  const addNewItern = () => {
    const name = document.querySelector('.intern-name').value;
    const tel = document.querySelector('.intern-number').value;
    const airtime = document.querySelector('.select').value.toLowerCase();
    if (name === '' || tel === '' || airtime === "----" || airtime === '') return;
    console.log(airtime)
    db.ref(`/interns`).push({
      name,
      telephone: tel,
      network: airtime
    })
    name.value = '';
    tel.value = '';
    window.location.reload();
    // modal.classList.remove('opened')
  }
  document.querySelector('.add-icon').addEventListener('click', open)
  document.querySelector('.closemodale').addEventListener('click', close)

  document.querySelector('.add-intern').addEventListener('click', addNewItern)
})


