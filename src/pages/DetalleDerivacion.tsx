import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DetalleDerivacion = ({ derivacion }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Detalle de Derivación</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="text-muted-foreground">ID Caso</p>
          <p className="font-medium">{derivacion.id}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Nombre Paciente</p>
          <p className="font-medium">{derivacion.crime?.name}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Descripción</p>
          <p className="font-medium">{derivacion.description}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Responsable</p>
          <p className="font-medium">
            {derivacion.user?.first_name} {derivacion.user?.last_name}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Centro de Salud</p>
          <p className="font-medium">{derivacion.center?.service}</p>
        </div>

        {/* Campos extra que después puedes conectar a la API */}
        <div>
          <p className="text-muted-foreground">Estado de la Derivación</p>
          <p className="font-medium">{derivacion.state}</p>
        </div>
        {/* <div>
          <p className="text-muted-foreground">Observaciones</p>
          <p className="font-medium">
            Sin observaciones adicionales registradas.
          </p>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default DetalleDerivacion;
