// =============================
// 🎮 discordAuth.ts — Login direto via OAuth2 do Discord
// =============================
const CLIENT_ID = "1429618030991900694"; // copie do Discord Developer Portal
const REDIRECT_URI = window.location.origin + "/"; // volta para a tela inicial do app
const API_ENDPOINT = "https://discord.com/api";

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  email?: string;
}

/**
 * Inicia o login com Discord — redireciona o usuário para a página de autorização.
 */
export function loginWithDiscordDirect() {
  const scope = "identify email";
  const authUrl = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=token&scope=${encodeURIComponent(scope)}`;
  window.location.href = authUrl;
}

/**
 * Verifica se há um token de acesso na URL (após o redirecionamento)
 * e, se existir, obtém os dados do usuário.
 */
export async function checkDiscordCallback(): Promise<DiscordUser | null> {
  const hash = window.location.hash;
  if (!hash.includes("access_token")) return null;

  const params = new URLSearchParams(hash.replace("#", ""));
  const token = params.get("access_token");
  if (!token) return null;

  // Remove o hash da URL para limpar a barra de endereços
  window.history.replaceState(null, "", window.location.pathname);

  // Busca os dados do usuário
  const res = await fetch(`${API_ENDPOINT}/users/@me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Falha ao obter usuário do Discord");

  const user = await res.json();

  const discordUser: DiscordUser = {
    id: user.id,
    username: user.username,
    avatar: `${API_ENDPOINT}/users/${user.id}/avatars/${user.avatar}.png`,
    email: user.email,
  };

  // Armazena sessão local
  localStorage.setItem("cyberUser", JSON.stringify(discordUser));
  return discordUser;
}

/**
 * Logout — remove os dados do usuário armazenados localmente.
 */
export function logoutDiscord() {
  localStorage.removeItem("cyberUser");
}
