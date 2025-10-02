import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  MapPin,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useComunas } from "../hooks/useComunas";

const Derivacion = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recomendacion, setRecomendacion] = useState<any>(null);

  const { data: comunas } = useComunas();
  console.log(comunas);

  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    comuna: "",
    migrate_situation: "",
    crime: "",
    description: "",
    factoresRiesgo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular llamada a IA
    setTimeout(() => {
      setRecomendacion({
        centro: "Centro de Atención Integral San Miguel",
        direccion: "Av. José Miguel Carrera 3456, San Miguel",
        telefono: "+56 2 2345 6789",
        especialidad:
          "Atención a víctimas de violencia intrafamiliar y delitos sexuales",
        motivo:
          "El centro cuenta con especialistas en casos similares y está ubicado en la comuna de residencia de la víctima",
        disponibilidad: "Disponible - Próxima cita: Mañana 14:30 hrs",
        confianza: 92,
      });
      setIsLoading(false);
      toast({
        title: "Recomendación generada",
        description: "AODA ha procesado el caso exitosamente.",
      });
    }, 2000);
  };

  const handleConfirmar = () => {
    toast({
      title: "Derivación registrada",
      description: "La derivación ha sido guardada en el sistema.",
      variant: "default",
    });
    // Reset form
    setFormData({
      age: "",
      sex: "",
      comuna: "",
      situacionMigratoria: "",
      tipoDelito: "",
      descripcionCaso: "",
      factoresRiesgo: "",
    });
    setRecomendacion(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Nueva Derivación
          </h1>
          <p className="text-muted-foreground">
            Complete la información del caso para obtener una recomendación de
            AODA del centro más apropiado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Información del Caso</span>
              </CardTitle>
              <CardDescription>
                Ingrese los datos del caso sin incluir información personal
                identificable.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edad">Edad</Label>
                    <Input
                      id="edad"
                      type="number"
                      value={formData.edad}
                      onChange={(e) =>
                        setFormData({ ...formData, edad: e.target.value })
                      }
                      placeholder="Ej: 28"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sexo">Sexo</Label>
                    <Select
                      value={formData.sexo}
                      onValueChange={(value) =>
                        setFormData({ ...formData, sexo: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="femenino">Femenino</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                        <SelectItem value="no-especifica">
                          Prefiere no especificar
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comuna">Comuna de Residencia</Label>
                  <Select
                    value={formData.comuna}
                    onValueChange={(value) =>
                      setFormData({ ...formData, comuna: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar comuna" />
                    </SelectTrigger>
                    <SelectContent>
                      {comunas?.map((comuna) => (
                        <SelectItem value={comuna}>{comuna.nombre}</SelectItem>
                      ))}
                      {/* <SelectItem value="santiago">Santiago</SelectItem>
                      <SelectItem value="las-condes">Las Condes</SelectItem>
                      <SelectItem value="providencia">Providencia</SelectItem>
                      <SelectItem value="san-miguel">San Miguel</SelectItem>
                      <SelectItem value="maipu">Maipú</SelectItem>
                      <SelectItem value="puente-alto">Puente Alto</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="situacionMigratoria">
                    Situación Migratoria
                  </Label>
                  <Select
                    value={formData.situacionMigratoria}
                    onValueChange={(value) =>
                      setFormData({ ...formData, situacionMigratoria: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chileno">Chileno/a</SelectItem>
                      <SelectItem value="residente">
                        Residente permanente
                      </SelectItem>
                      <SelectItem value="temporal">Visa temporal</SelectItem>
                      <SelectItem value="irregular">
                        Situación irregular
                      </SelectItem>
                      <SelectItem value="refugiado">Refugiado/a</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoDelito">Tipo de Delito</Label>
                  <Select
                    value={formData.tipoDelito}
                    onValueChange={(value) =>
                      setFormData({ ...formData, tipoDelito: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de delito" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="violencia-intrafamiliar">
                        Violencia Intrafamiliar
                      </SelectItem>
                      <SelectItem value="delito-sexual">
                        Delito Sexual
                      </SelectItem>
                      <SelectItem value="robo-violencia">
                        Robo con Violencia
                      </SelectItem>
                      <SelectItem value="amenazas">Amenazas</SelectItem>
                      <SelectItem value="lesiones">Lesiones</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcionCaso">Descripción del Caso</Label>
                  <Textarea
                    id="descripcionCaso"
                    value={formData.descripcionCaso}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descripcionCaso: e.target.value,
                      })
                    }
                    placeholder="Descripción breve del caso sin datos personales identificables..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="factoresRiesgo">
                    Factores de Riesgo Adicionales
                  </Label>
                  <Textarea
                    id="factoresRiesgo"
                    value={formData.factoresRiesgo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        factoresRiesgo: e.target.value,
                      })
                    }
                    placeholder="Ej: Vulnerabilidad social, discapacidad, menores de edad involucrados..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-spin" />
                      Procesando con AODA...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Obtener Recomendación AODA
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recomendación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Recomendación de AODA</span>
              </CardTitle>
              <CardDescription>
                Centro recomendado basado en el análisis del agente inteligente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!recomendacion ? (
                <div className="text-center py-12">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Complete el formulario y haga clic en "Obtener Recomendación
                    AODA" para ver la sugerencia.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confianza: {recomendacion.confianza}%
                    </Badge>
                    <Badge variant="outline" className="text-health-success">
                      {recomendacion.disponibilidad}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {recomendacion.centro}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {recomendacion.especialidad}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-health-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Dirección</p>
                        <p className="text-sm text-muted-foreground">
                          {recomendacion.direccion}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Calendar className="h-4 w-4 text-health-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Teléfono</p>
                        <p className="text-sm text-muted-foreground">
                          {recomendacion.telefono}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-health-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">
                          Motivo de la Recomendación
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {recomendacion.motivo}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button onClick={handleConfirmar} className="w-full">
                      Confirmar y Registrar Derivación
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setRecomendacion(null)}
                    >
                      Solicitar Nueva Recomendación
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Derivacion;
