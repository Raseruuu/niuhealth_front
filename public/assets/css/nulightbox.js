
function openModal() {
  document.getElementById("ctnModal").style.display = "block";
}

function closeModal() {
  document.getElementById("ctnModal").style.display = "none";
}

function showhide(elementid){
	obj=document.getElementById(elementid);
	obj.style.display=(obj.style.display=='none')?(''):('none');    
}
function forceClose(elementid){
	obj=document.getElementById(elementid).style.display = "none"; 
}