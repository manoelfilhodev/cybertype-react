# ⚡ CYBERTYPE 2.0 — O Desafio da Digitação

> 🧠 Um jogo futurista que testa sua velocidade, precisão e foco — com estética cyberpunk e trilha sonora imersiva.

![CyberType Banner](https://github.com/manoelfilhodev/cybertype-2.0/assets/banner-cybertype.gif)

---

## 🕹️ Sobre o Projeto

**CyberType 2.0** é um jogo de **digitação e reflexos**, desenvolvido em **React + TypeScript**, com uma estética **neon-cyberpunk** inspirada em arcades futuristas.  
O objetivo é **digitar as palavras que aparecem o mais rápido possível**, ganhando pontos por acertos e penalidades por erros.

O jogo conta com:
- 💡 **Sons interativos:** clique, erro e acerto com controle de volume.  
- 🎵 **Trilha sonora futurista**, com opção para pausar.  
- ⚙️ **Tela de configurações (Settings)** para personalização de som e experiência.  
- 🧩 **Diferentes níveis de dificuldade** (Easy, Medium, Hard).  
- 🎯 **Sistema de pontuação e histórico local** com registro dos melhores resultados.  
- 🎨 **Visual imersivo em neon**, com animações e tipografia _tech-mono_.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Função |
|-------------|--------|
| ⚛️ **React** | Estrutura principal do jogo |
| 🧠 **TypeScript** | Tipagem estática e robustez |
| 🎧 **Web Audio API** | Sons interativos e efeitos |
| 🎨 **TailwindCSS** | Estilização moderna e responsiva |
| 💾 **LocalStorage** | Salvamento local de scores |

---

## 🧩 Estrutura de Pastas

```
/src
 ├── core/
 │    ├── audioManager.ts
 │    ├── storage.ts
 │    └── utils.ts
 ├── components/
 │    ├── Menu.tsx
 │    ├── GameArea.tsx
 │    ├── VirtualKeyboard.tsx
 │    └── Settings.tsx
 ├── assets/
 │    ├── sounds/
 │    └── images/
 ├── styles/
 │    └── app.css
 └── main.tsx
```

---

## 🧠 Modo de Jogo

1. Escolha seu **nível de dificuldade** no menu inicial.  
2. Digite as palavras que aparecem **antes do tempo acabar**.  
3. Cada **acerto** toca um som e aumenta sua pontuação.  
4. Cada **erro** reduz sua precisão e toca um som de falha.  
5. Ao final, o jogo salva automaticamente seu **melhor score** local.

---

## ⚙️ Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/manoelfilhodev/cybertype-2.0.git
cd cybertype-2.0

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

Acesse o jogo no navegador:
👉 `http://localhost:5173`

---

## 🎧 Sons e Trilha Sonora

- 🔊 **Som de Teclado:** cada tecla pressionada gera um clique com variação de pitch.  
- 🎵 **Música de Fundo:** pode ser ativada ou desativada nas configurações.  
- 🚫 **Erro/Aviso:** efeitos sonoros distintos para erros e acertos.

---

## 🧰 Configurações (Settings)

A página **Settings** permite controlar:
- Volume geral do teclado  
- Ativar/Desativar sons de acerto/erro  
- Ativar/Desativar música de fundo  

---

## 🏆 Ranking (Em breve)

- 👤 **Modo offline:** salva pontuação local.  
- 🌐 **Modo online:** integrará login (Google/Apple) e ranking global de digitação.

---

## 💡 Ideia Principal

Criar um jogo que:
- Treine **rapidez e precisão** na digitação.  
- Sirva de ferramenta educativa e divertida.  
- Evolua com **mecânicas competitivas** e **modos de desafio**.  

---

## 🧪 Próximos Passos

- [ ] Sistema de ranking global  
- [ ] Perfis e login via Google  
- [ ] Modo “Fases” e “Errou = perdeu”  
- [ ] Efeitos visuais aprimorados (partículas, shaders)  
- [ ] Publicação como **PWA** e **App Mobile (Flutter)**  

---

## 👨‍💻 Desenvolvido por

**Manoel Filho**  
🚀 Engenheiro de Software & Fundador da **Systex Sistemas Inteligentes**  
🌐 [https://systex.com.br](https://systex.com.br)

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT** — sinta-se livre para modificar e aprimorar.

---

> _"Type fast. Think faster. Welcome to the Neon Grid."_ ⚡
