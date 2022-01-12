// Get the modal

function view(src){
    console.log("onclick image :"+src);
    let modal = document.getElementById("myModal");
// Get the image and insert it inside the modal - use its "alt" text as a caption
let modalImg = document.getElementById("img01");
  modal.style.display = "block";
  modalImg.src = src;

}


// When the user clicks on <span> (x), close the modal
 function close() { 
     console.log("close");
  modal.style.display = "none";
}

function highlight(){

}