const sudoku = document.getElementById('sudoku');
const button = document.getElementById('solve');
// making the input field in HTML
for(let i = 0; i<9; i++){
    for(let j = 0; j<9; j++){
        sudoku.innerHTML += `<input type="number" min=1 max = 9>`;
    }
}

// taking the input into the array
const inputarr = [];
button.addEventListener('click', ()=>{
    
    for(key in sudoku.children){
        if(sudoku.children[key].value === ''){
            inputarr.push(0);
        }
        else{
            inputarr.push(sudoku.children[key].value)
        }
    }
    let finalarr = inputarr.slice(0,81);
    let data = {input: finalarr};
    fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        let ans = response.answer;
        ans.forEach((elem, index) => {
            sudoku.children[index].value = elem;
        });
    })
    .catch(err => console.log(err));
})

