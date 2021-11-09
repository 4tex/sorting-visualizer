// console.log("script added");


let nums = [];
let canCreate = 1;

function between(min , max){

    let random = Math.random();
    return Math.floor(random * (max-min + 1)) + min;

}

async function createArray(){

    nums = [];
    for( let i = 0 ; i<100 ; i++){
        nums.push(between(1,25));
    }

    let arena = document.querySelector(".arena");

    arena.innerHTML = "";

    for( let i = 0 ; i < 100 ; i++){

        let element = document.createElement("div");
        element.setAttribute("class", "element");
        element.style.height = nums[i]*21.5 + "px";
        arena.appendChild(element);

    }

    console.log("array created");

}

let create = document.getElementById("create");

create.addEventListener("click" , async function(){

    if(canCreate === 1){
        canCreate = 0;
        await createArray();
        canCreate = 1;
    }

});