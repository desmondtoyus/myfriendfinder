$('#submit_survey').on('click', function (event) {

    //this array will hold the calculated difference betwwen the user and the friends
    var matches = [];
    event.preventDefault();
    let name = $('#name').val().trim();
    let photo = $('#photo').val().trim();
    let question1 = parseFloat($('#question1').val().trim());
    let question2 = parseFloat($('#question2').val().trim());
    let question3 = parseFloat($('#question3').val().trim());
    let question4 = parseFloat($('#question4').val().trim());
    let question5 = parseFloat($('#question5').val().trim());
    let question6 = parseFloat($('#question6').val().trim());
    let question7 = parseFloat($('#question7').val().trim());
    let question8 = parseFloat($('#question8').val().trim());
    let question9 = parseFloat($('#question9').val().trim());
    let question10 = parseFloat($('#question10').val().trim());

    if (name === '' || photo === '' || question2 === '' || question2 === '' || question3 === '' || question4 === '' || question5 === '' || question6 === '' || question7 === '' || question8 === '' || question9 === '' || question10 === '') {
        $('#error_div').text("All Questions are required");

    } else {
        let userResponse = {
            name: name,
            photo: photo,
            scores: [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]
        }
        //getting the user score as a sum of all the score array
        let myScore = question1 + question2 + question3 + question4 + question5 + question6 + question7 + question8 + question9 + question10;
        // calling the friendfind
        $.post("/api/friends", userResponse, function (success) {
            if (success) {
                console.log('successful');
                //if the user post is successful get the friends detail
                $.get('/api/friends', function (res) {
                    var total = 0;
                    for (var index = 0; index < res.length; index++) {
                        var total = 0;
                        var bestmatch = 0;
                        //calculating each friends total
                        for (var i = 0; i < res[index].scores.length; i++) {

                            total += parseFloat(res[index].scores[i]);
                        }
                        //creatig a new object to hold the difference between the user and each friend
                        var bestmatches = {
                            unique: parseFloat(index),
                            best: Math.abs(myScore - parseFloat(total))
                        }
                        matches.push(bestmatches);

                    }
                    //the match array is sorted by the least difference between the user and the friend. 
                    //the first item in the array is the best match since it has the least difference in sore
                    matches.sort(function (a, b) {
                        return a.best - b.best
                    })
                    //list of friends sorted by best match
                    console.log(matches);
                    $('#myModal').css('display', 'block');
                    // retrieving the best match friends pic and dispalying it in the DOM
                    $('#friendimg').attr('src', res[matches[0].unique].photo);
                     // retrieving the best match friends name and dispalying it in the DOM
                    $('#friendname').text(res[matches[0].unique].name);

                    $('#name').val("");
                    $('#photo').val("");
                    $('#question1').val("");
                    $('#question2').val("");
                    $('#question3').val("");
                    $('#question4').val("");
                    $('#question5').val("");
                    $('#question6').val("");
                    $('#question7').val("");
                    $('#question8').val("");
                    $('#question9').val("");
                    $('#question10').val("");
                })

            } else {
                console.log('Unsuccessful');
            }
        })

    }

})

$('.close').on('click', function () {
    $('#myModal').css('display', 'none');

})