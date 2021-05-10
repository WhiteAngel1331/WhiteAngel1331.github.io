var inputTXID = document.getElementById("TXID")
var botao = document.getElementById("submitTXID")
var main = document.querySelector(".main")
var modal = document.querySelector(".modalBackground")
var span = document.querySelector(".modalBackground span")
var tokenSpace = document.getElementById("TokenSpace")
var tx1Space = document.getElementById("TX1Space")
var addSpace = document.getElementById("ADDSpace")
 
botao.addEventListener("click", async function(){
   try {
        var conteudoJSON = await requestBlock(inputTXID.value)
    } catch (error) {
        console.log(error)
        span.classList.add("spanLigado")
        setTimeout(()=>{
            span.classList.remove("spanLigado")
        }, 1000)

    }

    if(conteudoJSON.isImage){
        let imagem = document.createElement("img")
        imagem.src = conteudoJSON.Content
        main.append(imagem)
    }else{
        let texto = document.createElement("p")
        texto.textContent = conteudoJSON.Content
        main.appendChild(texto)
    }

    tokenSpace.textContent += conteudoJSON.Token
    tx1Space.textContent += conteudoJSON.TX1
    addSpace.textContent += conteudoJSON.ADD

    modal.style.display="none"

})






