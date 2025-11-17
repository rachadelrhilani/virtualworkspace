let workers = [
  {
    id: Date.now(),
    name: "hamza",
    role: "agent_securite",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"],
    assigned: false
  },
  {
    id: Date.now(),
    name: "Ahmed",
    role: "Technicien",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"],
    assigned: false
  },
  {
    id: Date.now(),
    name: "karim",
    role: "receptionniste",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"],
    assigned: false
  },
  {
    id: Date.now(),
    name: "Rachad",
    role: "Manager",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"],
    assigned: false
  }
];

/*Affiche le modal*/
const closeModal = document.getElementById("closeModal");
const modalajouter = document.getElementById("modal");
const openModal = document.getElementById("openModal");
openModal.onclick = () => {
  modalajouter.classList.remove("hidden");
}
closeModal.onclick = () => {
  modalajouter.classList.add("hidden");
}

modalajouter.onclick = (e) => {
  if (e.target === modalajouter) {
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
  const container = document.getElementById("experiencesContainer");

  const div = document.createElement("div");
  div.className = "experience-item border p-3 rounded-lg bg-gray-50 mt-2";

  div.innerHTML = `
        <div id="experienceContainer">
    <div class="expItem gap-2 mb-2">
        <div>
            <label>Rôle :</label>
            <input type="text" class="roleExp border p-2 rounded" placeholder="Ex : Développeur">
        </div>
        <div class="mt-3">
            <label>De :</label>
            <input type="date" class="fromExp border p-2 rounded">
        </div>
        <div class="mt-3">
            <label>À :</label>
            <input type="date" class="toExp border p-2 rounded">
        </div>
        <button class="bg-red-600 mt-3 text-white px-2 rounded removeExp">X</button>
    </div>
</div>

    `;

  container.appendChild(div);
  div.querySelector(".removeExp").onclick = () => div.remove();
});


/* affiche le staf */
function affichestaff() {
  const staffList = document.getElementById("staffList");
  staffList.innerHTML = "";

  workers.filter(worker => worker.assigned === false).forEach(worker => {
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

  // ----------------------------
  // VALIDATION DE BASE
  // ----------------------------
  if (nom.value.trim() === "") {
    return alert("Le nom est obligatoire !");
  }
  if (!email.value.trim().includes("@")) {
    return alert("Email invalide !");
  }
  if (telephone.value.length < 8 || isNaN(telephone.value)) {
    return alert("Téléphone invalide !");
  }

  // ----------------------------
  // CRÉATION DE L’OBJET WORKER
  // ----------------------------
  const newWorker = {
    id: Date.now(),
    name: nom.value,
    role: role.value,
    email: email.value,
    phone: telephone.value,
    photo: photo.value,
    experiences: [],
    assigned: false
  };


  const expItems = document.querySelectorAll(".expItem");

  expItems.forEach(item => {
    const roleExp = item.querySelector(".roleExp").value.trim();
    const fromExp = item.querySelector(".fromExp");
    const toExp = item.querySelector(".toExp");

    if (roleExp === "" || fromExp === "" || toExp === "") {
      return alert("Tous les champs d'expérience doivent être remplis !");
    }

    if (fromExp.value > toExp.value) {
      return alert("La date début ne peut pas être supérieure à la date fin !");
    }

    newWorker.experiences.push({
      role: roleExp,
      from: fromExp,
      to: toExp
    });
  });

  // ----------------------------
  // AJOUT DANS workers
  // ----------------------------
  workers.push(newWorker);

  affichestaff();

  // ----------------------------
  // RESET FORM
  // ----------------------------
  nom.value = "";
  email.value = "";
  telephone.value = "";
  photo.value = "";
  previewImg.src = "";
  modalajouter.classList.add("hidden");
};
/* ajoute dans une zone */
let btn_conference = document.getElementById("btn-conference");
let btn_reception = document.getElementById("btn-reception");
let btn_serveurs=document.getElementById("btn-serveurs");
let btn_securite=document.getElementById("btn-securite");
let btn_personnel=document.getElementById("btn-personnel");
let btn_archives=document.getElementById("btn-archives")
btn_conference.onclick = () => openAssignModal("conference");
btn_reception.onclick = () => openAssignModal("reception");
btn_serveurs.onclick = () => openAssignModal("serveurs");
btn_securite.onclick = () => openAssignModal("securite");
btn_personnel.onclick = () => openAssignModal("personnel");
btn_archives.onclick = () => openAssignModal("archives");
const accessRules = {
    conference: ["manager", "autre"],
    reception: ["receptionniste", "manager"],
    serveurs: ["technicien", "manager"],
    securite: ["agent_securite", "manager"],
    personnel: ["manager", "autre"],
    archives: ["manager", "technicien", "agent_securite", "autre"] // nettoyage interdit
};
function openAssignModal(zone) {
    const modal = document.getElementById("assignModal");
    const list = document.getElementById("assignList");
    modal.classList.remove("hidden");

    list.innerHTML = ""; // reset l'affichage

    const allowedRoles = accessRules[zone];

    workers.filter(worker => worker.assigned === false).forEach(worker => {
        if (allowedRoles.includes(worker.role.toLowerCase())) {
            const item = document.createElement("div");
            item.className = "p-3 bg-gray-100 rounded flex items-center gap-3 cursor-pointer hover:bg-gray-200";

            item.innerHTML = `
                <img src="${worker.photo}" class="w-10 h-10 rounded-full object-cover">
                <div>
                <p>${worker.name}</p>
                <p class="text-gray-400 text-sm">${worker.role}</p>
                </div>
            `;

            item.onclick = () =>{
              assignToZone(worker, zone);
              console.log(workers.pop((w) => w.name !== worker.name));
            } 
            list.appendChild(item);
        }
    });
}
function assignToZone(worker, zone) {
    const zoneDiv = document.getElementById("zone-" + zone);
    // 1. Marquer comme assigné
    worker.assigned = true;

    // 2. Mettre à jour liste unassigned
    affichestaff();
    const card = document.createElement("div");
    card.className = "p-1 bg-white shadow rounded flex items-center gap-2 mt-2 w-fit";

    card.innerHTML = `
        <img src="${worker.photo}" class="w-8 h-8 rounded-full object-cover">
        <span class="text-sm">${worker.name}</span>
        <button class="bg-red-600 mt-3 text-white px-2 rounded remworker">X</button>
    `;
    let remworker =card.querySelector(".remworker");
    remworker.onclick = () =>{
        worker.assigned = false;
        affichestaff();
        card.remove();
    } 
    zoneDiv.appendChild(card);

    // Fermer le modal
    document.getElementById("assignModal").classList.add("hidden");
}

