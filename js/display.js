APP.display = {
    tokens: [{
            ele: "<div id='player1-piece'>1</div>"
        },
        {
            ele: "<div id='player2-piece'>2</div>"
        },
        {
            ele: "<div id='player3-piece'>3</div>"
        },
        {
            ele: "<div id='player4-piece'>4</div>"
        },
        {
            ele: "<div id='player5-piece'>5</div>"
        },
        {
            ele: "<div id='player6-piece'>6</div>"
        },
        {
            ele: "<div id='player7-piece'>7</div>"
        },
        {
            ele: "<div id='player8-piece'>8</div>"
        }
    ],
    renderBoard: function() {
        $("#board").show();
        $("#board2").show();
        $("#board-container").show();
        $("#game-container").show();
        $("#info").show();
        $("#player-list").show();

        APP.display.showPlayerList();
        APP.display.showTurnInfo();
        APP.board.printSquares();
        FASTTRACK.printSquares();
        APP.display.showTokens();
    },
    showTokens: function() {
        for (var i = 0; i < APP.pCount; i++) {
            var token = this.tokens[i].ele;
            var startSpace = document.getElementById("tokenSection0");
            startSpace.insertAdjacentHTML("beforeend", token);
        }
    },
    hideHomeScreen: function() {
        var hhs = document.getElementById("home-screen");
        hhs.style.display = hhs.style.display === "none" ? "" : "none";
    },
    showGameSelectionScreen: function() {
        var sgss = document.getElementById("game-selection-screen");
        sgss.style.display = sgss.style.display === "block" ? "block" : "block";
    },
    hideGameSelectionScreen: function() {
        var hgss = document.getElementById("game-selection-screen");
        hgss.style.display = hgss.style.display === "none" ? "" : "none";
    },
    hideSetup: function() {
        var hs = document.getElementById("setup-screen");
        hs.style.display = hs.style.display === "none" ? "" : "none";
    },
    showGameSetupScreen: function() {
        var sgss = document.getElementById("setup-screen");
        sgss.style.display = sgss.style.display === "block" ? "block" : "block";
    },
    showPlayerList: function() {
        var spl = document.getElementById("player-list");
        spl.style.display =
            spl.style.display === "inline-block" ? "inline-block" : "inline-block";
    },
    showTurnInfo: function() {
        var st = document.getElementById("turn-info");
        st.style.display =
            st.style.display === "inline-block" ? "inline-block" : "inline-block";
    },
    showFinanceBox: function() {
        var fb = document.getElementById("finance-box");
        fb.style.display =
            fb.style.display === "inline-block" ? "inline-block" : "inline-block";
    },
    hideDreamPhase: function() {
        var ds = document.getElementById("dream-choices");
        ds.style.display = ds.style.display === "none" ? "" : "none";
    },
    showRacePhase: function() {
        var sp = document.getElementById("turn-info-box");
        sp.style.display =
            sp.style.display === "inline-block" ? "inline-block" : "inline-block";
    },
    showStockCard: function() {
        $("#show-stock-form-btn").show();
        $("#show-stock-sell-form-btn").show();
        $("#done-btn").show();

        $("#sell-shares-form").hide();
        $("#sell-stock-btn").hide();
        $("#buy-shares-form").hide();
        $("#buy-stock-btn").hide();
        $("#done-buy-sell-btn").hide();

        var player = APP.players[APP.currentPlayerArrPos()];
        var arr = player.stockAssets;

        for (var j = 0; j < arr.length; j++) {
            if (arr[j].highlight === "on") {
                arr[j].highlight = "off";
            }
            if (arr[j].selected === true) {
                arr[j].selected = false;
            }
        }
        if (APP.ownedShares() == 0) {
            $("#show-stock-sell-form-btn").hide();
        }
        APP.finance.statement();
    },
    showBuyStockForm: function() {
        $("#show-stock-form-btn").hide();
        $("#show-stock-sell-form-btn").hide();
        $("#sell-shares-form").hide();
        $("#sell-stock-btn").hide();
        $("#done-btn").hide();

        $("#done-buy-sell-btn").show();
        $("#buy-shares-form").show();
        $("#buy-stock-btn").show();
    },
    showSellStockForm: function() {
        $("#show-stock-form-btn").hide();
        $("#show-stock-sell-form-btn").hide();
        $("#buy-shares-form").hide();
        $("#buy-stock-btn").hide();
        $("#done-btn").hide();

        $("#done-buy-sell-btn").show();


        var player = APP.players[APP.currentPlayerArrPos()];
        var arr = player.stockAssets;
        var stockSymbol = APP.currentDeal.symbol;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].symbol == stockSymbol) {
                arr[i].highlight = 'on';
            }
        }
        APP.finance.statement();
    },
    showOffer: function() {
        var player = APP.players[APP.currentPlayerArrPos()];
        
		if (player.debt == true) {
            $("br-settlement-text").hide();
            $("#show-offer-btn").hide();
            $("#bankrupt-card").show();
        } else {
            $("#confirm-settlement-btn").hide();
            $("#settlement-card").hide();
            $("#show-offer-btn").hide();

            $("#offer-card").show();
            $("#done-btn").show();
        }
    },
    increaseShares: function() {
        var player = APP.players[APP.currentPlayerArrPos()];
        var value = parseInt(document.getElementById("share-amt-input-sell").value, 10);
        var arr = player.stockAssets;
        var stockSymbol = APP.currentDeal.symbol;

        var index;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].selected != 'undefined') {
                index = i;
            }
        }

        var shares = Number(arr[index].shares);

        if (value < shares) {
            document.getElementById('share-amt-input-sell').stepUp(1);
        }
    },
    decreaseShares: function(option) {
        if (option == 1) {
            var value = parseInt(document.getElementById("share-amt-input").value, 10);
            value = isNaN(value) ? 0 : value;
            value -= 1;

            if (value > 1) {
                value -= 1;
            } else {
                value = 1;
            }
            document.getElementById("share-amt-input").value = value;
        } else {
            var value2 = parseInt(document.getElementById("share-amt-input-sell").value, 10);
            value2 = isNaN(value2) ? 0 : value2;
            value2 -= 1;

            if (value2 > 1) {
                value2 -= 1;
            } else {
                value2 = 1;
            }
            document.getElementById("share-amt-input-sell").value = value2;
        }
    },
    clearBtns: function() {
        $("#repay-borrow-btns").hide();
        $("#small-deal-btn").hide();
        $("#big-deal-btn").hide();
        $("#buy-coin-btn").hide();
        $("#doodad-pay-button").hide();
        $("#ds-pay-button").hide();
        $("#pd-pay-button").hide();
        $("#charity-donate-btn").hide();
        $("#done-buy-sell-btn").hide();

        $("#pass-btn").hide();
        $("#no-loan-btn").hide();
        $("#done-btn").hide();
        $("#cancel-btn").hide();
        $("#cancel-l-btn").hide();
        $("#borrow-loan-btn").hide();
        $("#borrow-doodad-loan-btn").hide();
        $("#borrow-offer-loan-btn").hide();
        $("#confirm-pay-btn").hide();
        $("#done-repay-btn").hide();
        $("#show-stock-form-btn").hide();
        $("#show-stock-sell-form-btn").hide();
		$("#buy-stock-btn").hide();
        $("#sell-stock-btn").hide();
        $("#confirm-settlement-btn").hide();
        $("#show-offer-btn").hide();
		
        $("#ftic-ok-btn").hide();
        $("#ft-enter-btn").hide();
        $("#ft-dream-roll-btn").hide();
        $("#ft-doodad-roll-btn").hide();
        $("#ft-opp-buy-btn").hide();
        $("#ft-opp-roll-btn").hide();
		$("#ft-roll2-btn").hide()
        $("#ft-pass-btn").hide();
        $("#ft-end-turn-btn").hide();
		$("#ft-dream-roll-btn").hide();
		$("#ft-win-continue-btn").hide();

        $("#buy-real-estate-btn").hide();
        $("#buy-business-btn").hide();
    },
    clearCards: function() {
        $("#turn-instructions").hide();
        $("#opp-card").hide();
        $("#deal-card-real-estate").hide();
        $("#deal-card-stock").hide();
        $("#buy-shares-form").hide();
        $("#deal-coin-card").hide();
        $("#deal-cd-card").hide();
        $("#deal-card-limited").hide();
        $("#deal-card-automated").hide();
        $("#deal-company-card").hide();
        $("#deal-personal-loan-card").hide();
        $("#kid-card").hide();
        $("#offer-card").hide();
        $("#charity-card").hide();
        $("#doodad-card").hide();
        $("#downsize-card").hide();
        $("#repay-card").hide();
        $("#borrow-card").hide();
        $("#cannot-afford-card").hide();
        $("#cannot-afford-loan-card").hide();
        $("#pay-confirm-card").hide();
        $("#bankrupt-card").hide();
        $("#lose-card").hide();
        $("#bankrupt-game-over-card").hide();
        $("#repay-loan-card").hide();
        $("#settlement-card").hide();
        $("#fast-track-intro-card").hide();
        $("#ft-opp-card").hide();
        $("#ft-doodad-card").hide();
        $("#fast-track-intro-card").hide();
        $("#fast-track-option-card").hide();
        $("#ft-cashflow-day").hide();
        $("#ft-finish-turn-card").hide();
        $("#win-game-card").hide();

        $("#automated-cost-table").hide();
        $("#limited-cost-table").hide();
    },
    repay: function() {
        //open card
        $("#end-turn-btn").hide();
        $("#finish-instructions").hide();
        $("#borrow-card").hide();
        $("#pay-confirm-card").hide();
        $("#confirm-pay.btn").hide();

        this.clearBtns();

        $("#repay-card").show();
        $("#done-repay-btn").show();
        $("#card-btns").show();

        //highlight table rows and add onclick functionality to pay for loan
        this.highlightLiabilities(1);
    },
    borrow: function() {
        $("#end-turn-btn").hide();
        $("#finish-instructions").hide();
        $("#repay-card").hide();
        $("#cancel-btn").hide();
        $("#repay-borrow-btns").hide();

        $("#borrow-card").show();
        $("#borrow-loan-btn").show();
        $("#cancel-btn").show();
        APP.finance.loanPayment();
        APP.finance.statement();
    },
    highlightLiabilities: function(option) {
        var player = APP.players[APP.currentPlayerArrPos()];
        var table = document.getElementById("liability-table");
        var rows = table.getElementsByTagName("tr");

        for (var i = 1; i < rows.length; i++) {
            var currentRow = table.rows[i];

            if (option === 1) {
                currentRow.style.backgroundColor = "#FFEB3B";

                var addOnClick = function(row) {
                    var anchor = rows[i];
                    var cell = row.getElementsByTagName("td")[1];
                    var id = cell.getAttribute("id");

                    anchor.onclick = function() {
                        player.loanId = id;

                        var loanName;
                        var loanAmt;

                        switch (id) {
                            case "liability-mortgage":
                                loanName = "Mortgage";
                                loanAmt = "$" + APP.display.numWithCommas(player.jobTitle[9]);
                                break;
                            case "liability-car":
                                loanName = "Car Loan";
                                loanAmt = "$" + APP.display.numWithCommas(player.jobTitle[10]);
                                break;
                            case "liability-credit":
                                loanName = "Credit Card";
                                loanAmt = "$" + APP.display.numWithCommas(player.jobTitle[11]);
                                break;
                            case "liability-retail":
                                loanName = "Retail Loan";
                                loanAmt = "$" + APP.display.numWithCommas(player.jobTitle[12]);
                                break;
                            case "liability-boat":
                                loanName = "Car Loan";
                                loanAmt = "$" + APP.display.numWithCommas(player.boatLoan);
                                break;
                        }

                        if (id === "liability-loans") {
                            $("#repay-loan-card").show();
                            $("#cancel-btn").show();
							$("#repay-loan-input").show();

                            $("#done-repay-btn").hide();
                            $("#pay-confirm-card").hide();
                            $("#confirm-pay-btn").hide();
                            $("#repay-card").hide();
							

							if (player.cash < 1000) {
								document.getElementById("loan-amt-input2").value = player.loans = 0;
								$("#repay-loan-input").hide();
							} else {
								
                            // form val is set to the highest amount the player can pay
								var maxVal = function(cash){
									if (cash < player.loans){
										return cash;
									} else {
										return player.loans;
									}
								};
								
								for (var i = 0; i < maxVal(player.cash); i += 1000) {
									document.getElementById("loan-amt-input2").value = i;
								}
                            }
                        } else if (id == "liability-mortgage") {
                            if (player.mortgagePrepay == true) {
                                APP.finance.mortgagePrepay = true;

                                $("#repay-loan-card").show();
                                $("#cancel-btn").show();

                                $("#done-repay-btn").hide();
                                $("#pay-confirm-card").hide();
                                $("#confirm-pay-btn").hide();
                                $("#repay-card").hide();

                                $("#repay-loan-name").text(loanName);
                                $("#repay-loan-amt").text(loanAmt);
                            }

                            for (var i = 0; i < player.cash - 1000; i += 1000) {
                                document.getElementById("loan-amt-input2").value = 1000;
                            }

                        } else if (id == "liability-boat") {
                            $("#repay-loan-card").show();
                            $("#cancel-btn").show();

                            $("#done-repay-btn").hide();
                            $("#pay-confirm-card").hide();
                            $("#confirm-pay-btn").hide();
                            $("#repay-card").hide();

                            $("#repay-loan-name").text(loanName);
                            $("#repay-loan-amt").text(loanAmt);


                            for (var i = 0; i < player.cash - 1000; i += 1000) {
                                document.getElementById("loan-amt-input2").value = 1000;
                            }
                        } else {
                            $("#confirm-pay-btn").show();
                            $("#cancel-btn").show();
                            $("#pay-confirm-card").show();
							$("#pay-loan-confirmation").html("Are you sure?");
                            // show loan info in card
                            $("#repay-loan-name").text(loanName);
                            $("#repay-loan-amt").text(loanAmt);

                            $("#done-repay-btn").hide();
                            $("#repay-loan-card").hide();
                            $("#repay-card").hide();
                        }
                    };
                };
                currentRow.onClick = addOnClick(currentRow);
            } else if (option === 2) {
                currentRow.style.backgroundColor = "white";

                var removeOnClick = function() {
                    var table = document.getElementById("liability-table");
                    var rows = table.getElementsByTagName("tr");

                    for (var i = 1; i < rows.length; i++) {
                        var anchor = rows[i];

                        anchor.onclick = function() {
                            return 0;
                        };
                    }
                };
                removeOnClick(currentRow);
            }
        }
    },
    renderLiabilitiesTable: function() {
        // get current player
        var player = APP.players[APP.currentPlayerArrPos()];
        var lTable = document.getElementById("liability-table");

        var mortgage = player.jobTitle[9];
        var carLoan = player.jobTitle[10];
        var creditCard = player.jobTitle[11];
        var retail = player.jobTitle[12];
        var loans = player.loans;
        var boatLoan = player.boatLoan;

        // if paid off remove rows, if no loans hide row
        if (mortgage === 0) {
            $("#lia-mortgage-row").hide();
            $("#exp-mortgage-row").hide();
        } else {
            $("#lia-mortgage-row").show();
            $("#exp-mortgage-row").show();
        }
        if (carLoan === 0) {
            $("#lia-car-row").hide();
            $("#exp-car-row").hide();
        } else {
            $("#lia-car-row").show();
            $("#exp-car-row").show();
        }
        if (creditCard === 0) {
            $("#lia-credit-row").hide();
            $("#exp-credit-row").hide();
        } else {
            $("#lia-credit-row").show();
            $("#exp-credit-row").show();
        }
        if (retail === 0) {
            $("#lia-retail-row").hide();
            $("#exp-retail-row").hide();
        } else {
            $("#lia-retail-row").show();
            $("#exp-retail-row").show();
        }
        if (loans === 0) {
            $("#lia-loans-row").hide();
            $("#exp-loans-row").hide();
        } else {
            $("#lia-loans-row").show();
            $("#exp-loans-row").show();
        }
        if (boatLoan === 0) {
            $("#lia-boatloan-row").hide();
            $("#exp-boat-row").hide();
        } else {
            $("#lia-boatloan-row").show();
            $("#exp-boat-row").show();
        }

        // add'$' signs and commas to loan amounts
        document.getElementById("liability-mortgage").innerHTML = APP.display.numWithCommas("$" + mortgage);
        document.getElementById("liability-car").innerHTML = APP.display.numWithCommas("$" + carLoan);
        document.getElementById("liability-credit").innerHTML = APP.display.numWithCommas("$" + creditCard);
        document.getElementById("liability-retail").innerHTML = APP.display.numWithCommas("$" + retail);
        document.getElementById("liability-loans").innerHTML = APP.display.numWithCommas("$" + loans);
        document.getElementById("liability-boat").innerHTML = APP.display.numWithCommas("$" + boatLoan);
    },
    renderAssetTable: function() {
        var player = APP.players[APP.currentPlayerArrPos()];
        var realEstateAssetArr = player.realEstateAssets;
        var businessAssetArr = player.businessAssets;
        var coinAssetArr = player.coinAssets;

        var incomeInterestTableId = document.getElementById("income-interest-body");
        var incomeRealEstateTableId = document.getElementById("income-real-estate-body");
        var assetTableId = document.getElementById("asset-real-estate-body");

        $(incomeInterestTableId).empty();
        $(incomeRealEstateTableId).empty();
        $(assetTableId).empty();

        if (player.position != 19) {
            $("#turn-info").css("box-shadow", "0 0 2px #212121");
        }

        for (var i = 0; i < realEstateAssetArr.length; i++) {
            //insert row for each asset the current player has
            var tag = realEstateAssetArr[i].tag;
            var cost = realEstateAssetArr[i].cost;
            var cashFlow = realEstateAssetArr[i].cashFlow;

            var table = document.getElementById("asset-real-estate-body");
            var rows = table.getElementsByTagName("tr");
            var currentRow = table.rows[i];

            var incomeRow =
                "<tr class='income-row real-estate-asset" +
                parseInt(APP.currentPlayerArrPos(), 10) +
                "-row'><td>" +
                tag +
                "</td><td>$" +
                cashFlow +
                "</td></tr>";
            var assetRow =
                "<tr class='assets-row real-estate-asset rea-row" +
                parseInt(APP.currentPlayerArrPos(), 10) +
                "-row' id='asset" +
                parseInt(i, 10) +
                "-row'><td>" +
                tag + " / $" +
                cashFlow +
                "</td><td>$" +
                cost +
                "</td></tr>";

            $(incomeRealEstateTableId).append(incomeRow);
            $(assetTableId).append(assetRow);

            // row highlight for when the asset is available for deals
            if (realEstateAssetArr[i].highlight === "on") {
                var rowId = "#asset" + parseInt(i, 10) + "-row";

                // highlight row if offer matches asset type
                $(rowId).css("background-color", "#FFEB3B");

                // highlight card
                $("#turn-info").css("box-shadow", ".2px .2px 3px 3px #0277BD");

                var addOnClick = function() {
                    var anchor = rows[i];
                    var id = anchor.getAttribute("id");

                    anchor.onclick = function() {
                        APP.getSettlement(id, false);
                    };
                };

                // when user clicks row show offer
                $(rowId).click(addOnClick());
            }

            if (player.debt == true) {
                var rowId = "#asset" + parseInt(i, 10) + "-row";

                $(rowId).css("background-color", "#FFAB91");

                var addOnClick = function() {
                    var anchor = rows[i];
                    var id = anchor.getAttribute("id");

                    anchor.onclick = function() {
                        APP.getSettlement(id, true);
                    };
                };

                // when user clicks row show offer
                $(rowId).click(addOnClick());
            }
        }
        for (var j = 0; j < coinAssetArr.length; j++) {
            var amount = coinAssetArr[j].amount;
            var name = coinAssetArr[j].name;
            var cost = coinAssetArr[j].cost;

            var coinAssetRow =
                "<tr class='assets-row coin-asset" +
                parseInt(APP.currentPlayerArrPos(), 10) +
                "-row' id='asset-c" +
                parseInt(j, 10) +
                "-row'><td>" +
                amount +
                " " +
                name +
                "</td><td>$" +
                cost +
                "</td></tr>";

            $(incomeInterestTableId).append(coinAssetRow);

            if (coinAssetArr[j].highlight == true) {
                var rowId = "#asset-c" + parseInt(j, 10) + "-row";

                $(rowId).css("background-color", "#FFEB3B");
                //highlight card
                $("#turn-info").css("box-shadow", ".2px .2px 3px 3px #0277BD");

                switch (coinAssetArr[j].name) {
                    case "1500's Spanish":
                        var coinOffer = coinAssetArr[j].amount * 5000;
                        document.getElementById("settlement-offer").innerHTML = coinOffer;
                        APP.settlementOffer = coinOffer;
                        break;
                    case "Krugerrands":
                        var coinOffer = coinAssetArr[j].amount * 600;
                        document.getElementById("settlement-offer").innerHTML = coinOffer;
                        APP.settlementOffer = coinOffer;
                        break;
                    default:
                        break;
                }

                $(rowId).click(function() {
                    $("#offer-card").hide();
                    $("#done-btn").hide();

                    $("#settlement-card").show();
                    $("#confirm-settlement-btn").show();
                    $("#show-offer-btn").show();
                    $("#settlement-offer").html(APP.settlementOffer);
                });
            }
        }
        for (var k = 0; k < businessAssetArr.length; k++) {
            var tag = businessAssetArr[k].tag;
            var cashFlow = businessAssetArr[k].cashFlow;

            var businessIncomeRow =
                "<tr class='income-row business-asset" +
                parseInt(APP.currentPlayerArrPos(), 10) +
                "-row' id='asset-b" +
                parseInt(k, 10) +
                "-row'><td>" +
                tag +
                "</td><td>$" +
                cashFlow +
                "</td></tr>";

            $(incomeRealEstateTableId).append(businessIncomeRow);
        }

        //if table is long keep it a certain width
        if (6 <= realEstateAssetArr.length /* + businessAssetArr.length*/ ) {
            $("#asset-table").css("height", "228px");
        } else {
            $("#asset-table").css("height", "auto");
        }
    },
    renderStockTable: function() {
        var player = APP.players[APP.currentPlayerArrPos()];
        var assetArr = player.stockAssets;
        var incomeInterestTableId = document.getElementById("income-interest-body");
        var tableId = document.getElementById("asset-stock-body");

        //Clear old table
        $(incomeInterestTableId).empty();
        $(tableId).empty();

        //cycle through real estate and business assets arr
        for (var i = 0; i < assetArr.length; i++) {
            var symbol = assetArr[i].symbol;
            var cost = this.numWithCommas(assetArr[i].price);
            var shares = this.numWithCommas(assetArr[i].shares);

            var incomeRow =
                "<tr class='income-row stock-dividend" +
                parseInt(APP.currentPlayerArrPos(), 10) +
                "-row'><td>" +
                symbol + " (" + shares + ")" +
                "</td><td> ROI: $" +
                assetArr[i].dividend +
                "</td></tr>";
            var stockRow =
                "<tr class='assets-row stock-shares" +
                parseInt(APP.currentPlayerArrPos(), 10) +
                "-row' id='stock" +
                parseInt(i, 10) +
                "-row'><td>" +
                shares +
                " Share of " +
                symbol +
                "</td><td>$" +
                cost +
                "</td></tr>";
            var stockRow2 =
                "<tr class='assets-row stock-shares" +
                parseInt(APP.currentPlayerArrPos(), 10) +
                "-row' id='stock" +
                parseInt(i, 10) +
                "-row'><td>" +
                shares +
                " Share of " +
                symbol +
                " / $" +
                (assetArr[i].dividend * shares) +
                "</td><td>$" +
                cost +
                "</td></tr>";

            $(incomeInterestTableId).append(incomeRow);
            if (symbol == "2BIG" || symbol == "1GLO" || symbol == "CD") {
                $(tableId).append(stockRow2);
            } else {
                $(tableId).append(stockRow);
            }
            if (assetArr[i].highlight === "on") {
                var rowId = "#stock" + parseInt(i, 10) + "-row";

                $(rowId).css("background-color", "#FFEB3B");

                $(rowId).click(function() {
                    $("#sell-shares-form").show();
                    $("#sell-stock-btn").show();

                    var idArr = rowId.split('');
                    var curIndex = Number(idArr[6]);

                    assetArr[curIndex].selected = true;
                    document.getElementById("share-cost-bought").innerHTML = String(assetArr[curIndex].price);
                    document.getElementById("share-amt-input-sell").value = assetArr[curIndex].shares;
                });
            }
        }
    },
    renderFtAssets: function() {
        var player = APP.players[APP.currentPlayerArrPos()];
        var assetArr = player.fastTrackAssets;
        var tableId = document.getElementById("ft-assets-body");

        $(tableId).empty();
        $("#right-statement").hide();

        for (var i = 0; i < assetArr.length; i++) {
            var title = assetArr[i].title;
            var cost = assetArr[i].cost;
            var cashFlow = assetArr[i].cashFlow;

            var tableRow =
                "<tr class='assets-row ft-assets-row" +
                parseInt(APP.currentPlayerArrPos(), 10) +
                "-row' id='ft-assets-row" +
                parseInt(i, 10) +
                "'><td>" +
                title +
                "</td><td>$" +
                cashFlow +
                "</td><td>$" +
                cost +
                "</td></tr>";

            $(tableId).append(tableRow);
        }
    },
    continueFt: function() {
        //close fast track intro card
        if (APP.players[APP.currentPlayerArrPos()].fastTrack == false) {
            $("#fast-track-intro-card").hide();
            $("#roll2-btn").hide();
            $("#ftic-ok-btn").hide();
            $("#ft-statement").hide();

            $("#card-btns").show();
            $("#roll-btn").show();
            $("#turn-instructions").show();
            $("#asset-table").show();
            $("#liability-table").show();

        } else {
            //APP.display.clearBtns();
            $("#fast-track-option-card").hide();
            $("#ftic-ok-btn").hide();
            $("#ft-enter-btn").hide();

            $("#ft-turn-instructions").show();
            $("#card-btns").show();
            $("#ft-roll-btn").show();
        }
    },
    numWithCommas: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getCurrentSettlementAsset: function() {}
};