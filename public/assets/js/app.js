const url = "https://sandbox.wallets.africa/bills/airtime/purchase";
const proxy = 'https://cors-anywhere.herokuapp.com/';
const publicKey = 'byog4b60fwz0'
const secretKey = 'g2h6yucvov83'

var db = firebase.database() || database;
const send = (i) => {
  console.log(i)
  const button = document.querySelector('.send');
  const airtimeamount = document.querySelectorAll('.airtime-amount')[i].value;
  const airtime = document.querySelectorAll('.airtime')[i].innerText;
  const tel = document.querySelectorAll('.tel')[i].innerText;
  const name = document.querySelectorAll('.name')[i].innerText;
  console.log(airtimeamount, tel, airtime, name)
  sendAirtime(airtimeamount, tel, airtime, name, i, button, airtime)
}

const sendAirtime = (amount, tel, code, name, i, button, airtime) => {
  if (amount === '') return alert('Specify an amount');

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${publicKey}`);

  var raw = JSON.stringify({
    "Code": code,
    "Amount": amount,
    "PhoneNumber": tel,
    "SecretKey": secretKey
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // send airtime url
  button.setAttribute('disabled', true)
  fetch(proxy + url, requestOptions)
    .then(response => response.json())
    .then(result => {
      button.setAttribute('disabled', false)
      document.querySelectorAll('.airtime-amount')[i].value === '';
      console.log(result)
      alert(`${airtime} of ${amount} successfully sent to ${name}, ${result.message}`)
    })
    .catch(error => {
      button.setAttribute('disabled', false)
      alert(`${error}`)
    });

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

document.addEventListener("DOMContentLoaded", () => {
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

      telephone.classList.add('tel');
      airtime.classList.add('airtime');
      name.classList.add('name');

      input.innerHTML = `<div class="group">
      <input type="number" name="amount" class="airtime-amount" required />
      <span class="highlight"></span>
      </div>`

      btntd.innerHTML = `
    <button class="btn send" onclick="send(${i})">Send</button>
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

  const modal = document.querySelector('.modale');
  const open = () => {
    modal.classList.add('opened')
  }
  const close = () => {
    modal.classList.remove('opened')
  }

  document.querySelector('.add-icon').addEventListener('click', open)
  document.querySelector('.closemodale').addEventListener('click', close)

  document.querySelector('.add-intern').addEventListener('click', addNewItern)
})


