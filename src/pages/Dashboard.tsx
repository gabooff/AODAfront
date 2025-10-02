import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Users,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { getDerivations } from "../services/apiDerivations";

const Dashboard = () => {
  // Datos simulados para KPIs

  const { data: derivations } = useQuery({
    queryKey: ["derivations"],
    queryFn: getDerivations,
  });

  const kpis = {
    derivacionesTotales: derivations?.length || 0,
    derivacionesHoy: 18,
    centrosActivos: 45,
    tiempoPromedioProceso: "12 min",
    satisfaccionUsuario: 87,
    precision: 94,
  };

  const derivacionesPorTipo = [
    {
      tipo: "Violencia Intrafamiliar",
      cantidad: 456,
      porcentaje: 36.6,
      color: "bg-red-500",
    },
    {
      tipo: "Delitos Sexuales",
      cantidad: 298,
      porcentaje: 23.9,
      color: "bg-orange-500",
    },
    {
      tipo: "Robo con Violencia",
      cantidad: 234,
      porcentaje: 18.8,
      color: "bg-yellow-500",
    },
    { tipo: "Amenazas", cantidad: 156, porcentaje: 12.5, color: "bg-blue-500" },
    { tipo: "Otros", cantidad: 103, porcentaje: 8.3, color: "bg-purple-500" },
  ];

  const centrosMasDerivados = [
    {
      centro: "Centro de Atención Integral San Miguel",
      derivaciones: 89,
      disponibilidad: "Alta",
    },
    {
      centro: "CAVS Santiago Centro",
      derivaciones: 76,
      disponibilidad: "Media",
    },
    {
      centro: "Centro de la Mujer Las Condes",
      derivaciones: 67,
      disponibilidad: "Alta",
    },
    { centro: "CAVI Maipú", derivaciones: 54, disponibilidad: "Baja" },
    {
      centro: "Centro Integral Puente Alto",
      derivaciones: 43,
      disponibilidad: "Alta",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard de Indicadores
          </h1>
          <p className="text-muted-foreground">
            Métricas y KPIs del sistema AODA de orientación y derivación
            asistida.
          </p>
        </div>

        {/* KPIs Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Derivaciones Totales
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpis.derivacionesTotales.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +{kpis.derivacionesHoy} hoy
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Centros Activos
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpis.centrosActivos}</div>
              <p className="text-xs text-muted-foreground">
                En la red metropolitana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tiempo Promedio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpis.tiempoPromedioProceso}
              </div>
              <p className="text-xs text-muted-foreground">
                Procesamiento por caso
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Precisión AODA
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpis.precision}%</div>
              <Progress value={kpis.precision} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Satisfacción
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpis.satisfaccionUsuario}%
              </div>
              <Progress value={kpis.satisfaccionUsuario} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Casos Pendientes
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                Requieren seguimiento
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Derivaciones por Tipo de Delito */}
          <Card>
            <CardHeader>
              <CardTitle>Derivaciones por Tipo de Delito</CardTitle>
              <CardDescription>
                Distribución de casos por categoría en los últimos 30 días
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {derivacionesPorTipo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium truncate">
                          {item.tipo}
                        </p>
                        <span className="text-sm text-muted-foreground">
                          {item.cantidad} ({item.porcentaje}%)
                        </span>
                      </div>
                      <Progress value={item.porcentaje} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Centros Más Utilizados */}
          <Card>
            <CardHeader>
              <CardTitle>Centros con Más Derivaciones</CardTitle>
              <CardDescription>
                Top 5 centros por número de derivaciones este mes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {centrosMasDerivados.map((centro, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {centro.centro}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {centro.derivaciones} derivaciones
                      </p>
                    </div>
                    <Badge
                      variant={
                        centro.disponibilidad === "Alta"
                          ? "default"
                          : centro.disponibilidad === "Media"
                          ? "secondary"
                          : "destructive"
                      }
                      className="ml-2"
                    >
                      {centro.disponibilidad}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Métricas Adicionales */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Eficiencia del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">
                    Casos procesados automáticamente
                  </span>
                  <span className="text-sm font-medium">96%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Derivaciones exitosas</span>
                  <span className="text-sm font-medium">91%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tiempo promedio de respuesta</span>
                  <span className="text-sm font-medium">8 seg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cobertura Territorial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Comunas cubiertas</span>
                  <span className="text-sm font-medium">34/52</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Población atendida</span>
                  <span className="text-sm font-medium">5.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Centros especializados</span>
                  <span className="text-sm font-medium">28</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tendencias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Incremento mensual</span>
                  <span className="text-sm font-medium text-green-600">
                    +12%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Mejora en tiempo</span>
                  <span className="text-sm font-medium text-green-600">
                    -23%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Satisfacción usuario</span>
                  <span className="text-sm font-medium text-green-600">
                    +8%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
