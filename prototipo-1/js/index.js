document.addEventListener('DOMContentLoaded', main);

async function main() {
    loadMainContent(1);
    renderFooterData();
}

async function loadMainContent(page) {
    const result = await listCharactersByPage(page);

    const characters = [...result.charactersList];

    for (const character of characters) {
        const lastEpisodeUrl = character.episode[character.episode.length - 1];
        
        const episodeName = await getEpisodeDataFromUrl(lastEpisodeUrl);
        
        character.episode = {
            url: lastEpisodeUrl,
            name: episodeName,
        };
    }

    renderCharactersList(characters);
    renderPagination(result.prevPage, result.nextPage);
}


function renderCharactersList(characters) {
    
    const row = document.getElementById("characters-list");
    row.innerHTML = "";
    
    for (const character of characters) {
        let nameCharacter = character.name;
    
        if (nameCharacter.length > 18) {
            nameCharacter = nameCharacter.slice(0, 18).concat("...");
        }

        const card = `
        <div class="card mb-3 card-character" onclick="viewCharacterDetails(${character.id})">
            <div class="row g-0">
                <div class="col-12 col-md-5">
                    <div class="object-fit-fill border rounded h-100">
                        <img src="${character.image}" class="w-100 h-100 rounded" alt="Foto do Personagem ${character.name}">
                    </div>
                </div>
                <div class="col-12 col-md-7">
                    <div class="card-body fw-bolder">
                        <h5 class="card-title">${nameCharacter}</h5>
                        <p class="card-text">
                            <small>
                                <i id="circle-status" class="bi bi-circle-fill text-${mapStatus(character.status).color}"></i>
                                <span>${mapStatus(character.status).text} - ${mapSpecies(character.species)}</span>
                            </small>
                        </p>
                        <p class="card-text">
                            <small class="text-secondary">Última localização conhecida:</small>
                            <br>
                            <small>${character.location.name}</small>
                        </p>
                        <p class="card-text">
                            <small class="text-secondary">Visto pela última vez em:</small>
                            <br>
                            <small>${character.episode.name}</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `;

        const col = document.createElement("div");
        col.classList.add("col-12", "col-md-6");

        col.innerHTML = card;
        row.appendChild(col);
    }
}

function renderPagination(prevPage, nextPage) {
    const prevPageNumber = !prevPage ? 0 : prevPage.split("?page=")[1];
    const nextPageNumber = !nextPage ? 0 : nextPage.split("?page=")[1];

    const nav = document.getElementById("pagination");
    nav.innerHTML = "";
    const ul = document.createElement("ul");
    ul.classList.add("pagination", "justify-content-center");

    // Button Previous Page
    const liPrevPage = document.createElement("li");
    liPrevPage.classList.add("page-item");

    if (!prevPage) {
        liPrevPage.classList.add("disabled");
    }

    const buttonPrevPage = document.createElement("button");
    buttonPrevPage.setAttribute("type", "button");
    buttonPrevPage.classList.add("page-link");
    buttonPrevPage.innerText = "Anterior";
    buttonPrevPage.addEventListener("click", () => loadMainContent(prevPageNumber));

    liPrevPage.appendChild(buttonPrevPage);

    // Button Next Page
    const liNextPage = document.createElement("li");
    liNextPage.classList.add("page-item");

    if (!nextPage) {
        liNextPage.classList.add("disabled");
    }

    const buttonNextPage = document.createElement("button");
    buttonNextPage.setAttribute("type", "button");
    buttonNextPage.classList.add("page-link");
    buttonNextPage.innerText = "Próximo";
    buttonNextPage.addEventListener("click", () => loadMainContent(nextPageNumber));


    liNextPage.appendChild(buttonNextPage);

    ul.appendChild(liPrevPage);
    ul.appendChild(liNextPage);

    document.getElementById("pagination").appendChild(ul);
}

function viewCharacterDetails(characterId) {
    window.location.href = `detail.html?character=${characterId}`;
}