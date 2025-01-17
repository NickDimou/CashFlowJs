var OPTIONS = {
    elements: {
        playerNumber: document.getElementById("player-number"),
        slider: document.getElementById("start-savings-slide"),
        output: document.getElementById("start-savings-option-value"),
        checkboxes: document.querySelectorAll("input[type=checkbox]"),
        smallRE: document.getElementById("ao-small-real-estate"),
        bigRE: document.getElementById("ao-big-real-estate"),
        stocks: document.getElementById("ao-stocks"),
        preferredStocks: document.getElementById("ao-preferred-stocks"),
        mutuals: document.getElementById("ao-mutuals"),
        cds: document.getElementById("ao-cds"),
        coins: document.getElementById("ao-coins"),
        limitedPartnership: document.getElementById("ao-limited-partnership"),
        companies: document.getElementById("ao-companies"),
        startingSavings: document.getElementById("start-savings-slide"),
        kids: document.getElementById("oo-kids"),
        paycheckDoodads: document.getElementById("oo-paycheck-doodads"),
        chooseJob: document.getElementById("oo-choose-job"),
        mortgagePrepay: document.getElementById("oo-mortgage-prepay"),
        instantFastTrack: document.getElementById("oo-instant-ft"),
        oneCentAway: document.getElementById("oo-one-cent-away"),
        noLoans: document.getElementById("oo-no-loans"),
        manualDice: document.getElementById("oo-manual-dice"),
        customGameIndicator: document.getElementById("custom-game-indicator"),
        defaultGameIndicator: document.getElementById("default-game-indicator"),
    },

    checkState: function () {
        const { elements } = this;
        const {
            smallRE, bigRE, stocks, mutuals, preferredStocks, cds, coins,
            limitedPartnership, companies, startingSavings, kids,
            paycheckDoodads, mortgagePrepay, instantFastTrack, oneCentAway,
            noLoans, manualDice, customGameIndicator, defaultGameIndicator
        } = elements;

        // Helper function to check default game state
        const isDefaultGame = () =>
            smallRE.checked &&
            bigRE.checked &&
            stocks.checked &&
            mutuals.checked &&
            preferredStocks.checked &&
            cds.checked &&
            coins.checked &&
            limitedPartnership.checked &&
            companies.checked &&
            startingSavings.value === "1" &&
            !kids.checked &&
            !paycheckDoodads.checked &&
            !instantFastTrack.checked &&
            !oneCentAway.checked &&
            !noLoans.checked &&
            !manualDice.checked;

        if (isDefaultGame()) {
            defaultGameIndicator.style.color = "#FDD835";
            customGameIndicator.style.color = "#4E342E";
        } else {
            defaultGameIndicator.style.color = "#4E342E";
            customGameIndicator.style.color = "#FDD835";
        }

        // Set custom game mode indicator
        if (smallRE.checked && bigRE.checked && !stocks.checked && mutuals.checked && cds.checked &&
            coins.checked && limitedPartnership.checked && companies.checked && startingSavings.value === "0" &&
            kids.checked && paycheckDoodads.checked && !mortgagePrepay.checked) {
            customGameIndicator.innerText = "Hard";
        } else if (smallRE.checked && bigRE.checked && stocks.checked && mutuals.checked && preferredStocks.checked &&
            !cds.checked && !coins.checked && limitedPartnership.checked && companies.checked &&
            startingSavings.value === "3" && !kids.checked && !paycheckDoodads.checked && mortgagePrepay.checked) {
            customGameIndicator.innerText = "Fast";
        } else {
            customGameIndicator.innerText = "Custom";
        }

        // Update slider output
        const sliderValues = ["None", "Normal", "Salary", "2x Salary"];
        elements.output.innerHTML = sliderValues[parseInt(startingSavings.value, 10)];
    },

    defaultOptions: function () {
        const { elements } = this;
        const { smallRE, bigRE, stocks, mutuals, preferredStocks, cds, coins, limitedPartnership, companies, startingSavings, kids, paycheckDoodads, mortgagePrepay, instantFastTrack, oneCentAway, noLoans, manualDice } = elements;

        smallRE.checked = true;
        bigRE.checked = true;
        stocks.checked = true;
        mutuals.checked = true;
        preferredStocks.checked = true;
        cds.checked = true;
        coins.checked = true;
        limitedPartnership.checked = true;
        companies.checked = true;
        startingSavings.value = "1";
        kids.checked = false;
        paycheckDoodads.checked = false;
        mortgagePrepay.checked = false;
        instantFastTrack.checked = false;
        oneCentAway.checked = false;
        noLoans.checked = false;
        manualDice.checked = false;

        this.checkState();
    },

    setupGame: function () {
        const { elements } = this;

        // Loop through all players to apply game settings
        APP.players.forEach((player, index) => {
            const savingsMultiplier = [0, 1, 2, 3];
            player.cash = player.jobTitle[savingsMultiplier[elements.startingSavings.value]];

            player.kidLimit = !elements.kids.checked;
            player.mortgagePrepay = elements.mortgagePrepay.checked;
            player.fastTrackOption = elements.instantFastTrack.checked;
            player.cash = elements.oneCentAway.checked ? 999999 : player.cash;

            // Clear loans if no loans option is checked
            if (elements.noLoans.checked) {
                [9, 10, 11, 12].forEach((loanIndex) => player.jobTitle[loanIndex] = 0);
                [4, 5, 6, 7].forEach((paymentIndex) => player.jobTitle[paymentIndex] = 0);
            }
        });
    },

    selectGameMode: function () {
        const mode = this.elements.customGameIndicator.innerText;
        const modes = {
            "Custom": "Fast",
            "Fast": "Hard",
            "Hard": "Custom",
        };
        this.elements.customGameIndicator.innerText = modes[mode] || "Custom";
        this.defaultOptions();
    }
};
