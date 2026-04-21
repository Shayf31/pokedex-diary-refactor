const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchDialog = document.getElementById("searchDialog");
const closeDialogBtn = document.getElementById("closeDialogBtn");
const dialogContent = document.getElementById("dialogContent");

searchBtn.addEventListener("click", () => {
  const value = searchInput.value.trim();

  if (!value) {
    dialogContent.textContent = "Please enter a Pokemon name or ID.";
    searchDialog.showModal();
    return;
  }

  dialogContent.textContent = `You searched for: ${value}`;
  searchDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  searchDialog.close();
});