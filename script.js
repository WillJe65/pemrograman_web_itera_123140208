const openpopup = document.getElementById("openpopup");
const closepopup = document.getElementById("close-popup");
const popup = document.getElementById("popup");



function ValidationDate(datestring){
    const date = new Date(datestring);
    const now = new Date();

    if(date < now){
        alert("tanggal tidak boleh kurang dari ini")
    }
}

function Validationstatus(status){
    const status = document.getElementById("status").value
    if(document.getElementById("date") <= new Date() && status === "done"){
        //perintah untuk mengubah status menggunakan DOM
    }
}

