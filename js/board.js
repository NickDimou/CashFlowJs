APP.board = {
    square: [
        ["OPPORTUNITY", "#21940f"],
        ["LIABILITY", "#cc1f00"],
        ["OPPORTUNITY", "#21940f"],
        ["CHARITY", "gold"],
        ["OPPORTUNITY", "#21940f"],
        ["PAYCHECK", "#e3ce00"],
        ["OPPORTUNITY", "#21940f"],
        ["OFFER", "#0082e3"],
        ["OPPORTUNITY", "#21940f"],
        ["LIABILITY", "#cc1f00"],
        ["OPPORTUNITY", "#21940f"],
        ["CHILD", "#00bd92"],
        ["OPPORTUNITY", "#21940f"],
        ["PAYCHECK", "#e3ce00"],
        ["OPPORTUNITY", "#21940f"],
        ["OFFER", "#0082e3"],
        ["OPPORTUNITY", "#21940f"],
        ["LIABILITY", "#cc1f00"],
        ["OPPORTUNITY", "#21940f"],
        ["DOWNSIZE", "teal"],
        ["OPPORTUNITY", "#21940f"],
        ["PAYCHECK", "#e3ce00"],
        ["OPPORTUNITY", "#21940f"],
        ["OFFER", "#0082e3"]
    ],
    printSquares: function() {
        for (let i = 0; i < this.square.length; i++) {
            const [label] = this.square[i];
            const cell = document.getElementById(`cell${i}`);
            if (cell) {
                cell.innerHTML = `
                    <div id="tokenSection${i}">
                        <div class="cellx">
                            <p>${label}</p>
                        </div>
                    </div>
                `;
            }
        }
    }
};
