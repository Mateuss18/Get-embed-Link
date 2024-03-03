const inputLinkElement = document.getElementById('youTubeLink')
// Expressão regular para extrair o ID do vídeo
const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
const resultElement = document.getElementById('result-link')
const resultsContainer = document.querySelector('.results')
const iframeTestElement = document.getElementById('iframe-preview')
const copyBtn = document.querySelector('.copy')
const failureMessage = document.querySelector('.failure-message')
const copiedMessage = document.querySelector('.copied-message')

function copyLink() {
  let embedLink = resultElement.innerText
  // Criar um bloco de dados da área de transferência
  const blob = new Blob([embedLink], { type: 'text/plain' });
  const item = new ClipboardItem({ 'text/plain': blob });

  // Copiar para a área de transferência
  navigator.clipboard.write([item]).then(() => {
    copiedMessage.style.visibility = 'visible'
    setInterval(() => {
      copiedMessage.style.visibility = 'hidden'
    }, 3000)
  }).catch((err) => {
    console.error('Falha ao copiar para a área de transferência:', err);
  });
}


function getEmbedLink(event) {
  event.preventDefault();
  const youtubeLink = inputLinkElement.value;

  // Executa a expressão regular no URL do YouTube
  const match = youtubeLink.match(regex);

  // Se houver uma correspondência, retorna o link de incorporação
  if (match && match[1]) {
    failureMessage.style.display = 'none'
    const videoId = match[1];
    const embedLink = `https://www.youtube.com/embed/${videoId}?si=CqYD4jzef6Vcqr-E`;
    resultElement.innerHTML = `${embedLink}`
    iframeTestElement.src = embedLink
    copyBtn.style.display = 'block'
    resultsContainer.style.visibility = "visible"
    inputLinkElement.value = ''
  } else {
    failureMessage.style.display = 'block'
    resultsContainer.style.visibility = "hidden"
    iframeTestElement.src = ''
    copyBtn.style.display = 'none'
    inputLinkElement.value = ''
  }
}
