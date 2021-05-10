var inputTXID = document.getElementById("TXID")
var botao = document.getElementById("submitTXID")
var tagMain = document.querySelector("main")
var modal = document.querySelector(".modalBackground")
var span = document.querySelector(".modalBackground span")

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
        tagMain.appendChild(imagem)
    }else{
        let texto = document.createElement("p")
        texto.textContent = conteudoJSON.Content
        tagMain.appendChild(texto)
    }

    modal.style.display="none"

})






