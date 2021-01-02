
const firstChar = (string) => {
    var firstWord = string.trim();
    console.log(firstWord);
    
    var first = firstWord.charAt(0);

    if(first != '('){
        return first;
    }else{
        firstChar(firstWord.substring(1, length));
    }

}

const format = (string) => {
    var firtsCommand = firstChar(string);
    if(firtsCommand.toUpperCase() === 'D'){
        var newString = string.split('=').join('\\r\\n');
        console.log(newString);

    }else if(firtsCommand.toUpperCase() === 'J'){
        alert('sounds like a JDBC')
    }else{
        alert()
    }

}



$(document).ready( () => {
    $('#format').click(() => {
        var string = $('#string').val();
        format(string);
    });  
})


