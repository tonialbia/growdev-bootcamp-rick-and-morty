async function renderFooterData() {
    const totalCharacters = await getTotalByFeature("character");
    const totalLocations = await getTotalByFeature("location");
    const totalEpisodes = await getTotalByFeature("episode");


    const spanTotalCharacters = document.getElementById("total-characters");
    spanTotalCharacters.innerText = totalCharacters;

    const spanTotalLocations = document.getElementById("total-locations");
    spanTotalLocations.innerText = totalLocations;

    const spanTotalEpisodes = document.getElementById("total-episodes");
    spanTotalEpisodes.innerText = totalEpisodes;

    const spanDevName = document.getElementById("dev-name");
    spanDevName.innerText = "Silvia Tonial";

    const spanCurrentYear = document.getElementById("current-year");
    spanCurrentYear.innerText = new Date().getFullYear();
}

function mapStatus(characterStatus) {
    switch (characterStatus) {
        case "Alive":
            return {
                color: "success",
                text: "Vivo",
            };
        case "Dead":
            return {
                color: "danger",
                text: "Morto",
            };
        default:
            return {
                color: "secondary",
                text: "Desconhecido",
            };
    }
}

function mapSpecies(characterSpecies) {
    switch (characterSpecies) {
        case "Human":
            return "Humano";
        case "Alien":
            return "Alienígena";
        case "Robot":
            return "Robô";
        case "Humanoid":
            return "Humanoide";
        case "unknown":
            return "Desconhecido";
        case "Poopybutthole":
            return "Bunda Cagada";
        case "Mythological Creature":
            return "Criatura Mitológica";
        case "Animal":
            return "Animal";
        case "Cronenberg":
            return "Cronenberg";
        case "Disease":
            return "Doença";
        default:
            return `Outro (${characterSpecies})`;
    }
}