let workers = [
  {
    id: Date.now(),
    name: "hamza",
    role: "agent_securite",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: [],
    assigned: false
  },
  {
    id: Date.now(),
    name: "Ahmed",
    role: "technicien_it",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: [],
    assigned: false
  },
  {
    id: Date.now(),
    name: "karim",
    role: "receptionniste",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: [],
    assigned: false
  },
  {
    id: Date.now(),
    name: "Rachad",
    role: "Manager",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: [],
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
  img.src = photoInput.value  || '..\image\manicon.png';
});

/*recuperer les experiences*/
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


function saveWorkers() {
  localStorage.setItem("workers", JSON.stringify(workers));
}
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


  if (nom.value.trim() === "" || !isNaN(nom.value.trim())) {
    return alert("Le nom est obligatoire !");
  }
  if (!email.value.trim().includes("@")) {
    return alert("Email invalide !");
  }
  if (telephone.value.length < 8 || isNaN(telephone.value)) {
    return alert("Téléphone invalide !");
  }


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
      from: fromExp.value,
      to: toExp.value
    });
  });


  workers.push(newWorker);

  affichestaff();


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
let btn_serveurs = document.getElementById("btn-serveurs");
let btn_securite = document.getElementById("btn-securite");
let btn_personnel = document.getElementById("btn-personnel");
let btn_archives = document.getElementById("btn-archives")
btn_conference.onclick = () => openAssignModal("conference");
btn_reception.onclick = () => openAssignModal("reception");
btn_serveurs.onclick = () => openAssignModal("serveurs");
btn_securite.onclick = () => openAssignModal("securite");
btn_personnel.onclick = () => openAssignModal("personnel");
btn_archives.onclick = () => openAssignModal("archives");
const accessRules = {
  conference: ["manager", "menage", "autres"],
  reception: ["receptionniste", "manager", "menage"],
  serveurs: ["technicien_it", "manager", "menage"],
  securite: ["agent_securite", "manager", "menage"],
  personnel: ["manager", "menage","technicien_it","agent_securite","receptionniste","autres"],
  archives: ["manager", "technicien_it", "agent_securite"]
};
const zoneCapacity = {
  serveurs: 2,
  securite: 2,
  personnel: 2,
  archives: 2,
  conference: 3,
  reception: 6
};
function openAssignModal(zone) {
  const modal = document.getElementById("assignModal");
  const list = document.getElementById("assignList");
  modal.classList.remove("hidden");

  list.innerHTML = "";

  const allowedRoles = accessRules[zone];

  workers.filter(worker => worker.assigned === false).forEach(worker => {
    if (allowedRoles.includes(worker.role.toLowerCase())) {
      const item = document.createElement("div");
      item.className = "p-3 bg-gray-100 rounded flex items-center gap-3 cursor-pointer hover:bg-gray-200 ";

      item.innerHTML = `
                <img src="${worker.photo}" class="w-10 h-10 rounded-full object-cover">
                <div>
                <p>${worker.name}</p>
                <p class="text-gray-400 text-sm">${worker.role}</p>
                </div>
            `;

      item.onclick = () => { assignToZone(worker, zone); }
      list.appendChild(item);
    }
  });
}
function assignToZone(worker, zone) {
  const zoneDiv = document.getElementById("zone-" + zone);
  const currentCount = zoneDiv.querySelectorAll(".workerCard").length;

  if (currentCount >= zoneCapacity[zone]) {
    return alert(`La zone ${zone} est déjà pleine !`);
  }
  worker.assigned = true;

  affichestaff();
  const card = document.createElement("div");
card.className =
  "workerCard flex items-center gap-2 bg-white shadow rounded px-2 py-1 mt-2 w-fit max-w-full cursor-pointer";

card.innerHTML = `
  <img src="${worker.photo}" class="card-photo">
  

  <div class="card-text">
      <span class="card-name">${worker.name}</span>
      <p class="card-role">${worker.role}</p>
  </div>

  <button class="remworker">X</button>
`;




  let remworker = card.querySelector(".remworker");
  remworker.onclick = (e) => {
    e.stopPropagation()
    worker.assigned = false;
    affichestaff();
    card.remove();
    checkRedZone(zone);
  }

  zoneDiv.appendChild(card);

  card.onclick = () => openInfoModal(worker);

  checkRedZone(zone);

  document.getElementById("assignModal").classList.add("hidden");
}
function checkRedZone(zone) {
  const zoneDiv = document.getElementById("zone-" + zone);

  const redzone = zoneDiv.classList.contains("zone-red");

  if (!redzone) {
    return;
  }

  const currentcount = zoneDiv.querySelectorAll(".workerCard").length;

  if (currentcount >= 1) {
    zoneDiv.classList.remove("bg-red-500/60");
  } else {
    zoneDiv.classList.add("bg-red-500/60");
  }
}
function openInfoModal(worker) {
  document.getElementById("infoPhoto").src = worker.photo;
  document.getElementById("infoName").innerText = worker.name;
  document.getElementById("infoRole").innerText = worker.role;
  document.getElementById("infoEmail").innerText = worker.email;
  document.getElementById("infoPhone").innerText = worker.phone;

  const expList = document.getElementById("infoExp");
  expList.innerHTML = "";

  worker.experiences.forEach(exp => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${exp.role}</strong><br>
      De : <span>${exp.from}</span> – À : <span>${exp.to}</span>
    `;
    expList.appendChild(li);
  });

  document.getElementById("infoModal").classList.remove("hidden");

  document.getElementById("closeInfoModal").onclick = () => {
    document.getElementById("infoModal").classList.add("hidden");
  };
}

