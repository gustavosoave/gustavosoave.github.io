
const firstChar = (fullString) => {
    var firstWord = fullString.trim();
    var first = firstWord.charAt(0);

    if (first != '(') {
        return first;
    } else {
        first = firstChar(firstWord.substring(1, firstWord.length));
        return first;
    }

}

const removeSpacesAndBreakLines = (string) => {
    return string.split(" ").join("").split("\r").join("").split("\n").join("").trim();
}

const format = (string) => {
    var originalString = string;
    var firtsCommand = firstChar(string);
    if (firtsCommand.toUpperCase() === 'D') {
        string = removeSpacesAndBreakLines(string);
        var strings = string.split("(");
        var finalString = "";

        var tabs = 1;
        var line = 0;
        strings.forEach((s) => {

            finalString += Array(tabs).join(" ") + (line == 0 ? "" : "(") + s + "\r\n";

            if (s.charAt(s.length - 1) == '=') {
                tabs += 2;
            }
            if (s.slice(-2) == '))') {
                tabs -= 2;
            }

            line++;
        })

        return finalString;

    } else if (firtsCommand.toUpperCase() === 'J') {
        finalString = removeSpacesAndBreakLines(string);

        return finalString;
    } else {
        alert('It looks a bad request (HTTP ERROR 400)');
        return originalString;
    }

}

const toJDBC = (string) => {
    string = removeSpacesAndBreakLines(string);
    if (string.charAt(0) != "(") {
        return "(" + string + ")";
    }
    return " jdbc:oracle:thin:@" + string;

}

const toTNS = (string) => {
    string = removeSpacesAndBreakLines(string);
    
    if(string.includes("DESCRIPTION")){
        string = string.replace("jdbc:oracle:thin:@", "");
        return string;
    }
}

$(document).ready(() => {

    $('#format').click(() => {
        var string = $('#string').val();
        $('#string').val(format(string));
    });

    $('#toJDBC').click(() => {
        var string = $('#string').val();
        $("#string").val(toJDBC(string));
    });

    $('#toTNS').click(()=>{
        var string = $('#string').val();
        $("#string").val(toTNS(string));
    });

    $("#clipboard").click(()=> {
        $("#string").select();
        document.execCommand("copy");
        alert("Text copied to your clipboard");
    })
})


