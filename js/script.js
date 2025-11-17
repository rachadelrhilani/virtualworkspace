let workers = [
  {
    id: Date.now(),
    name: "Rachad",
    role: "Administrateur système",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"]
  },
  {
    id: Date.now(),
    name: "Rachad",
    role: "Administrateur système",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"]
  },
  {
    id: Date.now(),
    name: "Rachad",
    role: "Administrateur système",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"]
  },
  {
    id: 3,
    name: "Rachad",
    role: "Administrateur système",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"]
  }
];

/*Affiche le modal*/
const closeModal = document.getElementById("closeModal");
const modalajouter = document.getElementById("modal");
const openModal= document.getElementById("openModal");
openModal.onclick = () =>{
  modalajouter.classList.remove("hidden");
} 
closeModal.onclick = () =>{
  modalajouter.classList.add("hidden");  
} 

modalajouter.onclick = (e) => {
    if (e.target === modalajouter){
      modalajouter.classList.add("hidden");  
    } 
};

/*Affiche le photo*/
const photoInput = document.getElementById("photoInput");
const img = document.getElementById("previewImg");

photoInput.addEventListener("input", () => {
    img.src = photoInput.value;
});

/*Affiche le photo*/
const container = document.getElementById("experiencesContainer");
const addExp = document.getElementById("addExperience");


/*Ajouter l'input d'experience*/
addExp.addEventListener("click", () => {
    const exp = document.createElement("div");
    exp.className = "gap-2";

    exp.innerHTML = `
        <input class="flex-1 border p-2 rounded" id="exp" placeholder="Ex : 2 ans chez X">
        <input class="flex-1 border p-2 rounded" id="exp" placeholder="Ex : 2 ans chez X">
        <input class="flex-1 border p-2 rounded" id="exp" placeholder="Ex : 2 ans chez X">
        <button class="bg-red-600 text-white px-2 rounded removeExp">X</button>
      `;

    container.appendChild(exp);
    exp.querySelector(".removeExp").onclick = () => exp.remove();
});

/* affiche le staf */
function affichestaff() {
    const staffList = document.getElementById("staffList");
    staffList.innerHTML = "";

    workers.forEach(worker => {
        const div = document.createElement("div");
        div.className = "flex items-center gap-3 p-2 bg-gray-100 rounded-lg shadow";

        div.innerHTML = `
            <img src="${worker.photo}" 
                 class="w-12 h-12 rounded-full object-cover border">
            <div>
                <p class="font-semibold">${worker.name}</p>
                <p class="text-sm text-gray-600">${worker.role}</p>
            </div>
        `;

        staffList.appendChild(div);
    });
}
affichestaff();
document.getElementById("Enregistrer").onclick = function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom");
    const role = document.getElementById("role");
    const email = document.getElementById("email");
    const telephone = document.getElementById("tel");
    const photo = document.getElementById("photoInput");
      
    if (nom.value.trim() === ""){
      return alert("Le nom est obligatoire !");
    } 
    if (!email.value.trim().includes("@")){
      return alert("Email invalide !");
    } 
    if (telephone.length < 8 || isNaN(telephone.value)){
      return alert("Téléphone invalide !");
    } 
    
    const newWorker = {
        id: Date.now(),
        name: nom.value,
        role: role.value,
        email: email.value,
        phone: telephone.value,
        photo: photo.value,
        experiences: []  // tu l’activeras quand tu voudras
    };

   
    workers.push(newWorker);


    
    affichestaff();

    
    nom.value = "";
    email.value = "";
    telephone.value = "";
    photo.value = "";
    previewImg.src = "";
    modalajouter.classList.add("hidden");  
   
};
