const url = "http://localhost:3600";

const phoneCards = document.querySelector(".phone-cards");
const comCards = document.querySelector(".com-cards");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalBackdrop = document.querySelector(".modal-backdrop");

const renderPhoneData = async (data) => {
    const slicedData = data.slice(0, 4);
    phoneCards.innerHTML = slicedData.map((item) => `
    <div class="phone-card">
        <div class="phone-card-img">
            <img src="${item.img}" alt="">
        </div>
        <div class="phone-card-content">
            <p class="phone-card-title">${item.title}</p>
            <p class="phone-card-price">${item.price}</p>
            <button data-title="phones" data-id="${item.id}" class="phone-card-btn">Show more</button>
        </div>
    </div>
    `
    ).join("");
}

const getPhoneData = async () => {
    try {
        const response = await fetch(`${url}/phones`);
        const data = await response.json();
        renderPhoneData(data);
    } catch (error) {
        console.log(error);
    }
}
getPhoneData();







const renderComData = async (data) => {
    const slicedData = data.slice(0, 4);
    comCards.innerHTML = slicedData.map((item) => `
    <div class="com-card">
        <div class="com-card-img">
            <img src="${item.img}" alt="">
        </div>
       <div class="com-card-content">
            <p class="com-card-title">${item.title}</p>
            <p class="com-card-price">${item.price}</p>
            <button data-title="notebook" data-id="${item.id}" class="com-card-btn">Show more</button>
        </div>
    </div>
    `).join("");
}

const getComData = async () => {
    try {
        const response = await fetch(`${url}/notebook`);
        const data = await response.json();
        renderComData(data);
    } catch (error) {
        console.log(error);
    }
}
getComData();






const renderModalData = async (data) => {
    modalContent.innerHTML = `
    <div class="modal-content-card">
        <div class="modal-card-img">
            <img src="${data.img}" alt="">
        </div>
        <div class="modal-card-content">
            <p class="modal-card-title">${data.title}</p>
            <p class="modal-card-memory">${data.brand ?? ""}</p>
            <p class="modal-card-memory">${data.rame ?? data.ram}</p>
            <p class="modal-card-memory">${data.memory ?? ''}</p>
            <p class="modal-card-memory">${data.weight ?? ''}</p>
            <p class="modal-card-color">${data.color}</p>
            <p class="modal-card-price">${data.price}</p>
            <button data-id="${data.id}" class="modal-card-btn">Add</button>
        </div>
    </div>
    `;

    const modalCardBtn = document.querySelector(".modal-card-btn");
    modalCardBtn.addEventListener("click", (e) => {
        console.log(e.target.dataset.id);
        const oldData = JSON.parse(localStorage.getItem("modalData")) || [];
        localStorage.setItem("modalData", JSON.stringify([data, ...oldData]));
        getLocal();
    });
};



const getModalData = async (id, title) => {
    try {
        const response = await fetch(`${url}/${title}/${id}`);
        const data = await response.json();
        renderModalData(data);
    } catch (error) {
        console.log(error);
    }
}


phoneCards.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        modal.style.display = "flex";
        modalContent.style.backgroundColor = "hotpink";
        getModalData(e.target.dataset.id, e.target.dataset.title);
    }
});

comCards.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        modal.style.display = "flex";
        getModalData(e.target.dataset.id, e.target.dataset.title);
        modalContent.style.backgroundColor = "khaki";
    }
});


modalBackdrop.addEventListener("click", (e) => {
    modal.style.display = "none";
});






const drawer = document.querySelector(".drawer_content");
const drawerBackdrop = document.querySelector(".drawer_backdrop");
const openBtn = document.querySelector(".opener-btn");
const drawerCloseBtn = document.querySelector(".drawer_content_close_btn");

toggleDrawer = () => {
    drawer.classList.toggle("open");
    drawerBackdrop.classList.toggle("show");
};

openBtn.addEventListener("click", toggleDrawer);
drawerCloseBtn.addEventListener("click", toggleDrawer);
drawerBackdrop.addEventListener("click", toggleDrawer);




const renderDrawer = (data) => {
    drawer.innerHTML = data.map((item) => `
    <div class="drawer-card">
    <h1 class="drawer-card-title">${item.title}</h1>
    <h1 class="drawer-card-price">${item.price}</h1>
    </div>
    `
    ).join("")
}

const getLocal = () => {
    const data = JSON.parse(localStorage.getItem("modalData")) || [];
    renderDrawer(data);
    return data;
}
getLocal();


