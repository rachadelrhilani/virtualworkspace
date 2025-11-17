let workers = [
  {
    id: Date.now(),
    name: "Rachad",
    role: "Agent de sécurité",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"]
  },
  {
    id: Date.now(),
    name: "Rachad",
    role: "Technicien IT",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"]
  },
  {
    id: Date.now(),
    name: "Rachad",
    role: "Réceptionnistes",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"]
  },
  {
    id: Date.now(),
    name: "Rachad",
    role: "Manager",
    email: "test@mail.com",
    phone: "+212...",
    photo: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1749-1760996442.png",
    experiences: ["exp1", "exp2"]
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
    <div class="expItem flex gap-2 mb-2">
        <div>
            <label>Rôle :</label>
            <input type="text" class="roleExp border p-2 rounded" placeholder="Ex : Développeur">
        </div>
        <div>
            <label>De :</label>
            <input type="date" class="fromExp border p-2 rounded">
        </div>
        <div>
            <label>À :</label>
            <input type="date" class="toExp border p-2 rounded">
        </div>
        <button class="bg-red-600 text-white px-2 rounded removeExp">X</button>
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
    experiences: []
  };

  // ----------------------------
  // RÉCUPÉRATION DES EXPÉRIENCES
  // ----------------------------
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
