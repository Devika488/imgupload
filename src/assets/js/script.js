// Get the modal

function view(src){
    console.log("onclick image :"+src);
    let modal = document.getElementById("myModal");
// console.log(modal);
// Get the image and insert it inside the modal - use its "alt" text as a caption
let modalImg = document.getElementById("img01");
// var img = document.getElementById(this.img.);
  modal.style.display = "block";
  modalImg.src = src;
//   var span = document.getElementsByClassName("close")[0];

}

// Get the <span> element that closes the modal

// When the user clicks on <span> (x), close the modal
 function close() { 
     console.log("close");
  modal.style.display = "none";
}