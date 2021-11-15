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
        // nums.push(25 - (0.25 * i));
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

let bubble = document.getElementById("bubble");

bubble.addEventListener("click", async function(){

    // console.log("clicking");
    let arena = document.querySelector(".arena");
    let children = arena.children;

    // console.log(children);


    for(let i = 0; i< 100; i++){

        for( let j = 0 ; j<100 - i - 1; j++){

            // let str = children[j].style.height;
            // let left = parseInt(str.substr(0, str.length - 2));

            let left = get_height(children[j]);
            let right = get_height(children[j+1]);

            // str = children[j+1].style.height;
            // let right = parseInt(str.substr(0, str.length - 2));
            

            if(left > right){

                children[j].style.height = right + "px";
                children[j+1].style.height = left + "px";

            }

        }

    }

})

let merge = document.getElementById("merge");

function merge_array(children, l, r){

    let mid = Math.floor((l + r)/2);

    let temp_children = [];

    let i = l, j = mid+1;

    while( i <= mid || j <= r){

        if( i > mid){

            temp_children.push(children[j]);
            j++;

        }else if( j > r){

            temp_children.push(children[i]);
            i++;

        }else{

            let h1 = get_height(children[i]);
            let h2 = get_height(children[j]);

            if( h1 < h2){

                temp_children.push(children[i]);
                i++;

            }else{
                temp_children.push(children[j]);
                j++;
            }
        }

        // console.log(temp_children.at(-1).style.height);

    }

    i = l;
    let heights = [];

    for( let k = 0 ; k< temp_children.length ; k++){
        // console.log(temp_children[k].style.height + "->" + k);
        heights.push(temp_children[k].style.height);
        
        i++;
    }

    for( i = l, j = 0 ; i <= r; i++, j++){
        
        // console.log(children[i].style.height +"->" + i +" " + temp_children[j].style.height + "->" + j);

        children[i].style.height = heights[j];

    }

}

function merge_sort( children, l , r){

    if(l == r)
        return ;
    
    let mid = Math.floor((l + r)/ 2);

    merge_sort(children, l , mid);
    merge_sort(children, mid+1, r);
    merge_array(children, l, r);

}

function test_sort( children , l , r){

    let x = children[0];

    for( let i = l ; i<= r; i++){

        children[i].style.height = x.style.height;

    }

}

merge.addEventListener("click", async function(){

    let arena = document.querySelector(".arena");
    let children = arena.children;

    console.log("called");
    
    // test_sort(children, 0, 99);
    merge_sort(children , 0, 99);

});

let insertion = document.getElementById("insertion");

function get_height(child){

    let str = child.style.height;
    let curr = parseInt(str.substr(0, str.length - 2));

    return curr;

};

insertion.addEventListener("click", async function(){

    console.log("insertion sort");

    let arena = document.querySelector(".arena");
    let children = arena.children;

    for (i = 1; i < 100; i++)
    {
        let key = get_height(children[i]);
        let j = i - 1;
        
        while (j >= 0 && get_height(children[j]) > key)
        {
            children[j + 1].style.height = children[j].style.height;
            j = j - 1;
        }

        children[j + 1].style.height = key + "px";

        // for(let k = 0 ; k < 5; k++){
        //     console.log(get_height(children[k]));
        // }
        console.log(i + "th pass")

    }

});

let quick = document.getElementById("quick");

function find_pivot(children, l , r){

    let maxi = get_height(children[r]);

    let i = l - 1;
    let temp;

    for( let j = l ; j < r; j++){

        let curr = get_height(children[j]);
        if( curr <= maxi ){

            temp = get_height( children [i+1]);
            
            children[j].style.height = temp + "px";
            children[i+1].style.height = curr + "px";
            i++;
        }

    }

    // temp = get_height(children[i+1]);
    // children[i+1].style.height = maxi + "px";
    // children[r].style.height = temp + "px";

    return i + 1;

}

function quick_sort( children , l, r){

    if(l >= r) return;

    let pivot = find_pivot(children , l, r);

    console.log(l + " " + r + " " + pivot);

    let temp = children[pivot].style.height;
    children[pivot].style.height = children[r].style.height;
    children[r].style.height = temp;
    
    quick_sort(children , l , pivot - 1);
    quick_sort(children, pivot + 1, r);

}

quick.addEventListener("click", async function(){
    
    console.log("quick is clicking");

    let arena = document.querySelector(".arena");
    let children = arena.children;

    quick_sort(children, 0, 99);


} )