$('#submit_survey').on('click', function (event) {

    //this array will hold the calculated difference betwwen the user and the friends
    var matches = [];
    var userResponse;
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

    if (name === '' || photo === '' || question1 === '' || question2 === '' || question3 === '' || question4 === '' || question5 === '' || question6 === '' || question7 === '' || question8 === '' || question9 === '' || question10 === '') {
        $('#error_div').text("All Questions are required");

    } else {
        userResponse = {
            name: name,
            photo: photo,
            scores: [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]
        }
        //getting the user score as a sum of all the score array
        let myScore = question1 + question2 + question3 + question4 + question5 + question6 + question7 + question8 + question9 + question10;
        // calling the friendfind


        //getting friends details
        $.get('/api/friends', function (res) {
            var total = 0;
            for (var index = 0; index < res.length; index++) {
                var total = 0;
                var bestmatch = 0;
                //calculating each friend scores
                for (var i = 0; i < res[index].scores.length; i++) {

                    total += parseFloat(res[index].scores[i]);
                }
                //creatig a new object to hold the difference between the user and each friend score
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
            //adding user value to the friends obdject
            $.post('/api/friends', userResponse, function (success) {
                if (success) {
                    console.log(userResponse);
                } else {
                    console.log("Error adding user");
                }
            });
            //display list of friends sorted by best match
            console.log(matches);
            //displaying the popup
            $('#myModal').css('display', 'block');
            // retrieving the best match friends pic and dispalying it in the DOM
            $('#friendimg').attr('src', res[matches[0].unique].photo);
            // retrieving the best match friends name and dispalying it in the DOM
            $('#friendname').text(res[matches[0].unique].name);
            //resetting all textboxes
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




    }

})
// when user clicks the X on the popup, close the popup
$('.close').on('click', function () {
    $('#myModal').css('display', 'none');

})