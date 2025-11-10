import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface Derivacion {
    rut: string;
    nombrePaciente: string;
    fechaNacimiento: string;
    fechaInicial: string;
    centroSalud: string;
}

interface DetalleDerivacionProps {
    derivacion: Derivacion;
}

const DetalleDerivacion = ({ derivacion }: DetalleDerivacionProps) => {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-lg">Detalle de Derivación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <p className="text-muted-foreground">RUT</p>
                    <p className="font-medium">{derivacion.rut}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Nombre Paciente</p>
                    <p className="font-medium">{derivacion.nombrePaciente}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Fecha de Nacimiento</p>
                    <p className="font-medium">{derivacion.fechaNacimiento}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Fecha Inicial de Atención</p>
                    <p className="font-medium">{derivacion.fechaInicial}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Centro de Salud</p>
                    <p className="font-medium">{derivacion.centroSalud}</p>
                </div>

                {/* Campos extra que después puedes conectar a la API */}
                <div>
                    <p className="text-muted-foreground">Estado de la Derivación</p>
                    <p className="font-medium">En seguimiento</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Observaciones</p>
                    <p className="font-medium">
                        Sin observaciones adicionales registradas.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default DetalleDerivacion;