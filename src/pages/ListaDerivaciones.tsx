import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import DetalleDerivacion, { Derivacion } from "./DetalleDerivacion";
import { Link } from "react-router-dom";

// Datos de ejemplo
const derivacionesData: Derivacion[] = [
  {
    rut: "22283451",
    nombrePaciente: "CASTRO ELIZALDE LOPEZ CONTRERAS",
    fechaNacimiento: "21/08/1983",
    fechaInicial: "07/08/2020",
    centroSalud: "Consultorio N°1- Dr. Ramiro Escalada Vigatana",
  },
  {
    rut: "11400878",
    nombrePaciente: "CRUZ, ELIZABETH HEREDIA GFS",
    fechaNacimiento: "27/08/1982",
    fechaInicial: "07/08/2020",
    centroSalud: "Centro de Salud familiar Ignacio Domenco",
  },
  {
    rut: "22282011",
    nombrePaciente: "TELLO ROSALES CLAUDIO MIGUEL",
    fechaNacimiento: "07/08/1983",
    fechaInicial: "07/08/2020",
    centroSalud: "Consultorio N°1- Dr. Ramiro Escalada Vigatana",
  },
  {
    rut: "22282075",
    nombrePaciente: "FLORES DEL CAMPO BLAS NAZARIO",
    fechaNacimiento: "30/09/1983",
    fechaInicial: "07/08/2020",
    centroSalud: "Consultorio N°2- Dr. Ramiro Escalada Vigatana",
  },
  {
    rut: "21388432",
    nombrePaciente: "VILLARROEL FLORES BURGOS CHAVEZ",
    fechaNacimiento: "13/08/1980",
    fechaInicial: "11/08/2020",
    centroSalud: "Consultorio N°1- Dr. Ramiro Escalada Vigatana",
  },
];

const ListaDerivaciones = () => {
  const [filtroDerivacion, setFiltroDerivacion] = useState("Todos");
  const [fechaInicio, setFechaInicio] = useState("");
  const [filtroTexto, setFiltroTexto] = useState("");
  const [derivacionSeleccionada, setDerivacionSeleccionada] = useState<
    Derivacion | null
  >(derivacionesData[0] ?? null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold">AODA</h1>
          </div>
          <p className="text-lg mb-2">
            Agente de Orientación y Derivación Asistida
          </p>
          <h2 className="text-2xl font-semibold mb-4">
            Agente Inteligente para la Orientación y Derivación de Víctimas de
            Delitos
          </h2>
          <p className="text-white/90 max-w-3xl mx-auto">
            Plataforma desarrollada para el Servicio de Salud Metropolitano que
            utiliza inteligencia artificial para recomendar el centro de
            atención más apropiado según las características específicas de cada
            caso.
          </p>
        </div>

        {/* Contenedor principal: tabla + detalle al costado */}
        <Card className="bg-white shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                Lista de Derivaciones
              </h3>

              {/* Botones de acciones */}
              <div className="flex gap-2">
                {/* Nueva derivación */}
                <Button asChild>
                  <Link to="/derivacion">Nueva Derivación</Link>
                </Button>

                {/* Alertas derivaciones */}
                <Button asChild variant="secondary">
                  <Link to="/alertas-derivaciones">Alertas Derivaciones</Link>
                </Button>

                {/* Volver al inicio */}
                <Button asChild variant="outline">
                  <Link to="/">Volver al Inicio</Link>
                </Button>
              </div>
            </div>

            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-sidebar rounded-lg">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Derivación
                </label>
                <Select
                  value={filtroDerivacion}
                  onValueChange={setFiltroDerivacion}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Consulta">Consulta</SelectItem>
                    <SelectItem value="Derivado">Derivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Fecha de Inicio
                </label>
                <Input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Fecha Final
                </label>
                <Input type="date" className="bg-white" />
              </div>

              <div className="flex items-end">
                <Button className="w-full">Filtrar</Button>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="mb-4">
              <Input
                placeholder="Buscar por RUT, nombre, centro de salud..."
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
                className="max-w-md"
              />
            </div>

            {/* GRID: tabla (izquierda) + detalle (derecha) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tabla de derivaciones */}
              <div className="lg:col-span-2">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-sidebar hover:bg-sidebar">
                        <TableHead className="font-bold">Rut</TableHead>
                        <TableHead className="font-bold">
                          Nombre Paciente
                        </TableHead>
                        <TableHead className="font-bold">
                          Fecha Nacimiento
                        </TableHead>
                        <TableHead className="font-bold">
                          Fecha Inicial
                        </TableHead>
                        <TableHead className="font-bold">
                          Centro de Salud
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {derivacionesData.map((derivacion, index) => (
                        <TableRow
                          key={index}
                          onClick={() =>
                            setDerivacionSeleccionada(derivacion)
                          }
                          className={`hover:bg-muted/50 cursor-pointer ${
                            derivacionSeleccionada?.rut === derivacion.rut
                              ? "bg-muted"
                              : ""
                          }`}
                        >
                          <TableCell className="font-medium">
                            {derivacion.rut}
                          </TableCell>
                          <TableCell>{derivacion.nombrePaciente}</TableCell>
                          <TableCell>{derivacion.fechaNacimiento}</TableCell>
                          <TableCell>{derivacion.fechaInicial}</TableCell>
                          <TableCell>{derivacion.centroSalud}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Paginación */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Mostrando {derivacionesData.length} de{" "}
                    {derivacionesData.length} resultados
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      Siguiente
                    </Button>
                  </div>
                </div>
              </div>

              {/* Panel de detalle */}
              <div className="lg:col-span-1">
                {derivacionSeleccionada && (
                  <DetalleDerivacion derivacion={derivacionSeleccionada} />
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ListaDerivaciones;
