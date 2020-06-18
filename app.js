document.addEventListener("DOMContentLoaded", () => {
  const url = "https://sandbox.wallets.africa/bills/airtime/purchase";

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      console.log(res);
    });
});
