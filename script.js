const inputLinkElement = document.getElementById('youTubeLink')
// Expressão regular para extrair o ID do vídeo
const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
const resultElement = document.getElementById('result')
const iframeTestElement = document.getElementById('iframeTest')

function copyLink(embedLink) {
  // Criar um bloco de dados da área de transferência
  const blob = new Blob([embedLink], { type: 'text/plain' });
  const item = new ClipboardItem({ 'text/plain': blob });

  // Copiar para a área de transferência
  navigator.clipboard.write([item]).then(() => {
    console.log('Conteúdo copiado para a área de transferência:', embedLink);
  }).catch((err) => {
    console.error('Falha ao copiar para a área de transferência:', err);
  });
}

function getEmbedLink() {
  const youtubeLink = inputLinkElement.value;

  // Executa a expressão regular no URL do YouTube
  const match = youtubeLink.match(regex);

  // Se houver uma correspondência, retorna o link de incorporação
  if (match && match[1]) {
    const videoId = match[1];
    const embedLink = `https://www.youtube.com/embed/${videoId}?si=CqYD4jzef6Vcqr-E`;
    resultElement.innerHTML = `${embedLink}`
    copyLink(embedLink)
    iframeTestElement.src = embedLink
    iframeTestElement.style.display = "block"
    inputLinkElement.value = ''
  } else {
    resultElement.innerHTML = 'This is not a valid link'
  }
}
