import { useState, useMemo } from "react";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
interface LoginProps {
  onLogin?: (data: {
    email: string;
    password: string;
    remember: boolean;
  }) => Promise<{ ok: boolean; message?: string }>;
  title?: string;
  subtitle?: string;
  brand?: string;
}

const Login: React.FC<LoginProps> = ({
  onLogin,
  title = "Iniciar sesión",
  subtitle = "Accede con tu correo y contraseña",
  brand = "AODA",
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const emailError = useMemo(() => {
    if (!username) return "";
    // const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return re.test(email) ? "" : "Email no válido";
  }, [username]);

  const passwordError = useMemo(() => {
    if (!password) return "";
    return password.length >= 6
      ? ""
      : "La contraseña debe tener al menos 6 caracteres";
  }, [password]);

  const canSubmit = !!(
    username &&
    password &&
    !emailError &&
    !passwordError &&
    !loading
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!canSubmit) return;
    setLoading(true);

    try {
      await loginMutation.mutateAsync({ username, password });
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-white font-bold shadow-sm">
              <img src={"aoda-logo.jpeg"} />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-900">{title}</h1>
            <p className="text-slate-500 text-sm">{subtitle}</p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="text"
                className={`w-full rounded-xl border px-4 py-2.5 outline-none transition focus:ring-4 focus:ring-slate-100 ${
                  emailError ? "border-red-300" : "border-slate-200"
                }`}
                placeholder="tucorreo@dominio.cl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {emailError && (
                <p className="mt-1 text-xs text-red-600">{emailError}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-slate-600 hover:text-slate-900 underline"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full rounded-xl border px-4 py-2.5 outline-none transition focus:ring-4 focus:ring-slate-100 ${
                  passwordError ? "border-red-300" : "border-slate-200"
                }`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="mt-1 text-xs text-red-600">{passwordError}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Recuérdame
              </label>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-slate-900 underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full rounded-xl px-4 py-2.5 font-semibold shadow-sm transition ${
                canSubmit
                  ? "bg-slate-900 text-white hover:opacity-90"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Ingresando…" : "Ingresar"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Al continuar aceptas nuestros{" "}
          <a className="underline" href="#">
            Términos
          </a>{" "}
          y{" "}
          <a className="underline" href="#">
            Política de Privacidad
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
