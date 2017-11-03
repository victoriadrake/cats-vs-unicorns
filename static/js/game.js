$(document).ready(function () {
    var pToken;
    var cpuToken;
    var pEmoji;
    var cpuEmoji;
    var pTurn;
    var board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    // HELPFUL FUNCTIONS

    function reset() {
        console.log("reset");
        board = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        console.log(board);
        pToken = '';
        cpuToken = '';
        pEmoji = '';
        cpuEmoji = '';
        tooks = [];
        $("[id^='num']").html('');
        $("#message").html('<p class="smaller">Let\'s have a nice relaxing</p><span class="bigger">EPIC BATTLE</p>');

        $("#choose").show();
        $("#cat").click(function () {
            pToken = "🐱";
            pEmoji = "<img src='/cats-vs-unicorns/static/img/cat.png'>";
            cpuToken = "🦄";
            cpuEmoji = "<img src='/cats-vs-unicorns/static/img/unicorn.png'>";
            $("#choose").hide();
        });
        $("#unicorn").click(function () {
            pToken = "🦄";
            pEmoji = "<img src='/cats-vs-unicorns/static/img/unicorn.png'>";
            cpuToken = "🐱";
            cpuEmoji = "<img src='/cats-vs-unicorns/static/img/cat.png'>";
            $("#choose").hide();
        });
    }

    function sleep(ms) { // Thank goodness for ES6
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function pWin() {
        $("#message").html('<p class="bigger">YOU WON!</p><p class="smaller">Your mighty skills have saved the day!</p>');
        await sleep(3000);
        reset();
    }

    async function cpuWin() {
        $("#message").html('<p class="bigger">You lost!</p><p class="smaller">You fought well, but alas your foe has bested you.</p>');
        await sleep(3000);
        reset();
    }

    async function draw() {
        $("#message").html('<p class="bigger">It\'s a draw.</p><p class="smaller">It seems you are destined to battle again...</p>');
        await sleep(3000);
        reset();
    }

    function nextTurn(pTurn) {
        // Decide if CPU goes
        if ((checkWins() == false) && (pTurn == 0)) {
            console.log("CPU TURN");
            cpuChoice();
        } else
            if ((checkWins() == false) && (pTurn == 1)) {
                return
            }
    }

    function cpuChoice() { // Recursion to the rescue...

        var cpuPick = Math.floor((Math.random() * 9) + 1);
        var cpu = "num" + cpuPick;
        console.log("choice: ", cpu);

        // Recursive case
        if (tooks.indexOf(cpuPick) != -1) {
            // new choice
            console.log("CPU gotta choose again...")
            cpuChoice();
        } else {
            // Base case

            // Place token image
            $("#" + cpu).html(cpuEmoji);
            console.log($("#" + cpu).html());

            // Add to array that checks for draw
            tooks.push(cpuPick);
            console.log('Tooks: ', tooks);

            // Alter backend array
            // Find cpuPick in board and change to cpuToken
            for (var i = 0; i < board.length; i++) {
                var row = board[i];
                for (var j = 0; j < row.length; j++) { // for each row check j
                    if (board[i][j] == cpuPick) {
                        board[i][j] = cpuToken;

                        pTurn = 1;
                        console.log("switch :", pTurn);
                        nextTurn(pTurn);
                        return
                    }
                }
            }
        }
    }

    function checkWins() {
        // Check rows
        console.log("Checking rows...");
        for (var i = 0; i < board.length; i++) {
            var row = board[i];
            if ((row[0] == row[1]) && (row[1] == row[2])) {

                if (row[2] === pToken) {
                    console.log("Winner winner chicken dinner!");
                    pWin();
                    return
                } else if (row[2] === cpuToken) {
                    console.log("Ummm you lost to a computer. :(");
                    cpuWin();
                    return
                }
            }
        }
        // Check columns
        console.log("Checking columns...")
        for (var i = 0; i < board.length; i++) {
            if ((board[0][i] === board[1][i]) && (board[1][i] === board[2][i])) {
                if (board[2][i] === pToken) {
                    console.log("Winner winner chicken dinner!");
                    pWin();
                    return
                } else if (board[2][i] === cpuToken) {
                    console.log("Ummm you lost to a computer. :(");
                    cpuWin();
                    return
                }
            }
        }
        // Check diagonals
        console.log("Checking diagonals...");
        if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2])) {
            if (board[2][2] === pToken) {
                console.log("Winner winner chicken dinner!");
                pWin();
                return
            } else if (board[2][2] === cpuToken) {
                console.log("Ummm you lost to a computer. :(");
                cpuWin();
                return
            }
        }
        if ((board[0][2] == board[1][1]) && (board[1][1] == board[2][0])) {
            if (board[2][0] === pToken) {
                console.log("Winner winner chicken dinner!");
                pWin();
                return
            } else if (board[2][0] === cpuToken) {
                console.log("Ummm you lost to a computer. :(");
                cpuWin();
                return
            }
        }
        else if (tooks.length == 9) {
            draw();
        }
        else {
            return false;
        }
    }

    reset();

    // GAMEPLAY
    $("[id^='num']").click(function (event) {

        // Get number of square and assign to curr
        curr = parseInt($(this).attr("value"));
        console.log("curr:", curr);

        // Alter backend array
        for (var i = 0; i < board.length; i++) {
            var row = board[i];
            for (var j = 0; j < row.length; j++) { // for each row, check j
                if ((board[i][j] == pToken) || (board[i][j] == cpuToken)) { // if j is taken
                    console.log("This spot's taken."); // Continues to check other squares that aren't curr; can't access and check only curr square
                } else if (board[i][j] == curr) { // if j matches curr
                    console.log("Spot's open: ", board[i][j], '==', curr)
                    board[i][j] = pToken; // replace j with pToken

                    // Add to array that checks for draw
                    tooks.push(curr);
                    console.log('Tooks: ', tooks);

                    // Place token image
                    $(this).html(pEmoji);
                    console.log($(this).html())

                    console.log("Checking for win:")
                    checkWins();

                    pTurn = 0;
                    console.log("switch :", pTurn)

                }
            }
        }

        nextTurn(pTurn);


        console.log('board: ', board);

    });

});