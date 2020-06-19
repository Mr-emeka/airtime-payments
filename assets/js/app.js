document.addEventListener("DOMContentLoaded", () => {
  const url = "https://sandbox.wallets.africa/bills/airtime/purchase";
  const publicKey = 'byog4b60fwz0'
  const secretKey = 'g2h6yucvov83'

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

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  const modal = document.querySelector('.modale');
  const open = () => {
    modal.classList.add('opened')
  }
  const close = () => {
    modal.classList.remove('opened')
  }
  document.querySelector('.add-icon').addEventListener('click', open)
  document.querySelector('.closemodale').addEventListener('click', close)

})


