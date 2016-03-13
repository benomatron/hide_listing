document.getElementById("clear-hidden-list").addEventListener("click", handleClearList, false);


function handleClearList(e) {
    console.log('pooty');
    var temp = [];
    temp.push(123);
    localStorage['hidden_listings'] = JSON.stringify(temp);
});
