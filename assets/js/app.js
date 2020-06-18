document.addEventListener("DOMContentLoaded", () => {
  const url = "https://sandbox.wallets.africa/bills/airtime/purchase";

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      console.log(res);
    });

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


