import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Shield,
  Brain,
  BarChart3,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Clock,
} from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-health-primary via-primary to-health-secondary text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 mr-4" />
              <div className="text-left">
                <h1 className="text-5xl font-bold mb-2">AODA</h1>
                <p className="text-xl opacity-90">
                  Agente de Orientación y Derivación Asistida
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 leading-tight">
              Agente Inteligente para la Orientación y Derivación de Víctimas de
              Delitos
            </h2>

            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Plataforma desarrollada para el Servicio de Salud Metropolitano
              que utiliza inteligencia artificial para recomendar el centro de
              atención más apropiado según las características específicas de
              cada caso.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg px-8"
              >
                <Link to="/derivacion">
                  <Brain className="mr-2 h-5 w-5" />
                  Nueva Derivación
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-primary hover:bg-primary hover:text-primary"
              >
                <Link to="/dashboard">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Ver Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Acceso rápido a Lista de Derivaciones */}
        <div className="flex justify-center mt-6">
          <Link to="/lista-derivaciones">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
            >
              Lista de Derivaciones
            </Button>
          </Link>
        </div>

      </section>

      {/* Características Principales */}
      <section className="py-20 bg-health-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Características del Sistema
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Una solución integral que optimiza el proceso de derivación y
              mejora la atención a las víctimas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-health-primary/10 rounded-full w-fit">
                  <Brain className="h-8 w-8 text-health-primary" />
                </div>
                <CardTitle>Inteligencia Artificial</CardTitle>
                <CardDescription>
                  Algoritmos avanzados analizan múltiples variables para
                  recomendar el centro más apropiado
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-health-secondary/10 rounded-full w-fit">
                  <Zap className="h-8 w-8 text-health-secondary" />
                </div>
                <CardTitle>Proceso Automatizado</CardTitle>
                <CardDescription>
                  Reduce significativamente el tiempo manual de análisis y
                  selección de centros
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-health-warning/10 rounded-full w-fit">
                  <Target className="h-8 w-8 text-health-warning" />
                </div>
                <CardTitle>Alta Precisión</CardTitle>
                <CardDescription>
                  94% de precisión en las recomendaciones basadas en datos
                  históricos y factores específicos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-health-success/10 rounded-full w-fit">
                  <Shield className="h-8 w-8 text-health-success" />
                </div>
                <CardTitle>Confidencialidad</CardTitle>
                <CardDescription>
                  Manejo seguro de datos sin incluir información personal
                  identificable de las víctimas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Métricas y KPIs</CardTitle>
                <CardDescription>
                  Dashboard completo con indicadores de rendimiento y análisis
                  de tendencias
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-health-primary/10 rounded-full w-fit">
                  <Clock className="h-8 w-8 text-health-primary" />
                </div>
                <CardTitle>Tiempo Real</CardTitle>
                <CardDescription>
                  Recomendaciones instantáneas con información actualizada de
                  disponibilidad
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Impacto del Sistema</h2>
            <p className="text-xl text-muted-foreground">
              Resultados que demuestran la efectividad de la automatización
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-health-primary mb-2">
                1,247
              </div>
              <div className="text-lg font-medium mb-1">
                Derivaciones Procesadas
              </div>
              <div className="text-sm text-muted-foreground">
                En los últimos 30 días
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-health-secondary mb-2">
                12 min
              </div>
              <div className="text-lg font-medium mb-1">Tiempo Promedio</div>
              <div className="text-sm text-muted-foreground">
                Por procesamiento
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-health-success mb-2">
                94%
              </div>
              <div className="text-lg font-medium mb-1">Precisión IA</div>
              <div className="text-sm text-muted-foreground">
                En recomendaciones
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-health-warning mb-2">
                45
              </div>
              <div className="text-lg font-medium mb-1">Centros Activos</div>
              <div className="text-sm text-muted-foreground">
                En la red metropolitana
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-health-primary to-health-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Optimice el Proceso de Derivación con AODA
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Comience a utilizar AODA para mejorar la eficiencia en la atención a
            víctimas y obtener recomendaciones precisas en tiempo real.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8"
          >
            <Link to="/derivacion">
              Iniciar Nueva Derivación
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-health-primary" />
              <span className="font-semibold">
                AODA - Servicio de Salud Metropolitano
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Agente de Orientación y Derivación Asistida. Todos los
              derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
