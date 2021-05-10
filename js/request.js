async function requestBlock(txID){
    let block = await requestJsonBlock(txID);
    block = trataJson(block);
    let isImage = verifyIsImage(block[1]);
    if(isImage){
        return {
            "isImage": true,
            "Token":block[0][1],
            "TX1":block[0][2],
            "ADD":block[0][3],
            "Content":`data:image/png;base64,${hexToBase64(block[1])}`
        }
    }else{
        let blockTexto = hex_to_ascii(block[1])

        return {
            "isImage": false,
            "Token":block[0][1],
            "TX1":block[0][2],
            "ADD":block[0][3],
            "Content":blockTexto
        }
    }

}

async function requestJsonBlock(txID){
    let url = `https://api.whatsonchain.com/v1/bsv/main/tx/hash/${txID}`

    try{
        let res = await fetch(url)
        return await res.json();
    }catch(error){
        console.log(error);
    }

} 

function trataJson(block){
    let textoBase = block.vout[0].scriptPubKey.asm;
    let texto = textoBase.split(" ")[2]
    return hexFirstData_to_ascii(texto)
}

function hexFirstData_to_ascii(str1){
    var hex  = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        if(String.fromCharCode(parseInt(hex.substr(n, 2), 16)) == "&"){
            return [str.split("\n"), hex.substr(n+2)]
        }
        str+= String.fromCharCode(parseInt(hex.substr(n, 2), 16))
    }
}

function hex_to_ascii(str1){
    var hex  = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

function verifyIsImage(block){
    let hex = block.toString()
    let counter = 0

    for (let n = 0; n < 300; n+=2) {
        let hexSingle = parseInt(hex.substr(n, 2), 16)

        if(counter == 20){
            return true
        } 

        
        if((hexSingle > 1 && hexSingle < 31) || (hexSingle > 128 && hexSingle < 255)){
            counter++
        }
    }

    return false
}

function hexToBase64(hexstring) {
    return btoa(hexstring.match(/\w{2}/g).map(function(a) {
        return String.fromCharCode(parseInt(a, 16));
    }).join(""));
}