import { useState, useMemo, useEffect, FormEvent } from "react";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  // Términos aceptados (persistidos en localStorage)
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigate = useNavigate();
  const loginMutation = useLogin();

  // Cargar estado previo desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("aoda_accepted_terms");
    if (stored === "true") {
      setAcceptedTerms(true);
    }
  }, []);

  const emailError = useMemo(() => {
    if (!username) return "";
    return "";
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

  // Login real (solo si ya aceptó términos)
  const doLogin = async () => {
    setLoading(true);
    try {
      await loginMutation.mutateAsync({ username, password });
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(
        err.response?.data?.detail ||
          "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    if (!acceptedTerms) {
      toast.warning(
        "Debes aceptar los Términos y la Política de Privacidad para continuar.",
        { duration: 3000 }
      );
      return;
    }

    await doLogin();
  };

  const handleAcceptTermsToggle = (checked: boolean) => {
    setAcceptedTerms(checked);
    localStorage.setItem("aoda_accepted_terms", checked ? "true" : "false");

    if (checked) {
      toast.success(
        "Has aceptado los términos y la política de privacidad.",
        { duration: 2500 }
      );

      // “Registro” simple de auditoría (puedes cambiarlo por un POST al backend)
      console.log(
        `[AODA] Términos aceptados por ${
          username || "usuario"
        } en ${new Date().toISOString()}`
      );
    }
  };

  return (
    <>
      <Navigation />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-6">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-white font-bold shadow-sm">
                <img src={"aoda-logo.jpeg"} />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-slate-900">
                Iniciar sesión
              </h1>
              <p className="text-slate-500 text-sm">
                Accede con tu correo y contraseña
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border px-4 py-2.5 border-slate-200 focus:ring-4 focus:ring-slate-100"
                  placeholder="tucorreo@dominio.cl"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
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
                  className="w-full rounded-xl border px-4 py-2.5 border-slate-200 focus:ring-4 focus:ring-slate-100"
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

              {/* Checkbox obligatorio de Términos */}
              <div className="mt-2 text-xs text-slate-600 flex items-start gap-2">
                <input
                  id="accept-terms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                  checked={acceptedTerms}
                  onChange={(e) => handleAcceptTermsToggle(e.target.checked)}
                />
                <div>
                  <label
                    htmlFor="accept-terms"
                    className="font-medium text-slate-700"
                  >
                    He leído y acepto los{" "}
                    {/* Modal Términos */}
                    <AlertDialog>
                      <AlertDialogTrigger className="underline cursor-pointer text-slate-700">
                        Términos de Servicio
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Términos de Servicio</AlertDialogTitle>
                          <AlertDialogDescription className="space-y-3 text-sm max-h-60 overflow-y-auto pr-2">
                            <p>
                              La plataforma AODA es una herramienta institucional del
                              Servicio de Salud, destinada a apoyar la orientación y
                              derivación de personas afectadas por hechos de violencia
                              o situaciones de riesgo.
                            </p>
                            <p>
                              Al utilizar esta plataforma, aceptas que la información
                              ingresada será revisada por profesionales autorizados y
                              podrá ser derivada a centros de atención pertinentes
                              según criterios técnicos y normativa vigente.
                            </p>
                            <p>
                              Conforme a la <strong>Ley N° 20.584</strong>, se garantiza
                              el derecho a la confidencialidad de los datos de salud,
                              asegurando que solo personal autorizado acceda a la
                              información contenida en esta plataforma.
                            </p>
                            <p>
                              Está estrictamente prohibido ingresar información falsa,
                              incompleta o que vulnere la dignidad o privacidad de
                              terceros. Todo uso indebido será informado a la autoridad
                              correspondiente.
                            </p>
                            <p>
                              La plataforma puede registrar actividad de uso con fines
                              de seguridad, auditoría y mejora continua del servicio.
                            </p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">
                            Cerrar
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>{" "}
                    y la{" "}
                    {/* Modal Política */}
                    <AlertDialog>
                      <AlertDialogTrigger className="underline cursor-pointer text-slate-700">
                        Política de Privacidad
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Política de Privacidad</AlertDialogTitle>
                          <AlertDialogDescription className="space-y-3 text-sm max-h-60 overflow-y-auto pr-2">
                            <p>
                              El tratamiento de datos personales realizado en la
                              plataforma AODA se rige por la{" "}
                              <strong>Ley N° 19.628</strong> sobre Protección de la Vida
                              Privada y las directrices del Ministerio de Salud respecto
                              al manejo de datos sensibles.
                            </p>
                            <p>
                              La información ingresada en la plataforma será utilizada
                              únicamente para la evaluación, orientación y derivación de
                              personas dentro de la red pública de salud y organismos
                              colaboradores establecidos por ley.
                            </p>
                            <p>
                              Los datos son almacenados mediante mecanismos de resguardo
                              digital, cifrado y control de accesos, según estándares
                              institucionales.
                            </p>
                            <p>
                              No se compartirá información con terceros no autorizados.
                              El usuario puede ejercer su derecho de acceso,
                              rectificación, eliminación o bloqueo de datos mediante
                              solicitud formal al administrador del sistema.
                            </p>
                            <p>
                              El uso de esta plataforma implica la aceptación de estas
                              condiciones y del tratamiento de datos conforme a la
                              normativa vigente.
                            </p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">
                            Cerrar
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    .
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Este paso es obligatorio para continuar.
                  </p>
                </div>
              </div>

              {/* Botón Ingresar */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full mt-3 rounded-xl px-4 py-2.5 font-semibold shadow-sm transition ${
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
            AODA · Servicio de Salud Metropolitano · Plataforma de orientación y
            derivación asistida.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;