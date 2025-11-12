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
import { useCenters, useTopCenters } from "../hooks/useCenters";
import { useDerivations } from "@/hooks/useDerivations";

const Dashboard = () => {
  // Datos simulados para KPIs

  const { data: derivations } = useDerivations();
  const { data: centers } = useCenters();
  const { data: topCenters } = useTopCenters();

  // Derivations KPIS
  const createdTime = derivations?.map(
    (derivation) => new Date(derivation.created_at)
  );
  const currentDate = new Date().toDateString();
  const todayDerivations = createdTime?.filter(
    (time) => time.toDateString() === currentDate
  );
  const pendingDerivations = derivations?.filter(
    (derivation) => derivation.state === "pendiente"
  );
  const kpis = {
    derivacionesTotales: derivations?.length || 0,
    derivacionesHoy: todayDerivations?.length || 0,
    centrosActivos: centers?.length || 0,
    tiempoPromedioProceso: "12 min",
    satisfaccionUsuario: 87,
    precision: 94,
    pendingCases: pendingDerivations?.length || 0,
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
      tipo: "Trata de personas",
      cantidad: 234,
      porcentaje: 18.8,
      color: "bg-yellow-500",
    },
    {
      tipo: "Explotación laboral",
      cantidad: 156,
      porcentaje: 12.5,
      color: "bg-blue-500",
    },
    { tipo: "Otros", cantidad: 103, porcentaje: 8.3, color: "bg-purple-500" },
  ];

  // Centers KPI

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard de Indicadores
        </h1>
        <p className="text-muted-foreground">
          Métricas y KPIs del sistema AODA de orientación y derivación asistida.
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
            <CardTitle className="text-sm font-medium">Satisfacción</CardTitle>
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
            <div className="text-2xl font-bold">{kpis.pendingCases}</div>
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
              {topCenters?.map((centro, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {centro.centro}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {centro.total_derivaciones} derivaciones
                    </p>
                  </div>
                  <Badge
                    variant={
                      centro.total_derivaciones === "Alta"
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
    </main>
  );
};

export default Dashboard;
