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
import DetalleDerivacion from "./DetalleDerivacion";
import { Link } from "react-router-dom";
import { useDerivations } from "@/hooks/useDerivations";

const ListaDerivaciones = () => {
  const { data: derivations } = useDerivations();
  console.log(derivations);

  const [filtroDerivacion, setFiltroDerivacion] = useState("Todos");
  const [fechaInicio, setFechaInicio] = useState("");
  const [filtroTexto, setFiltroTexto] = useState("");
  const [derivacionSeleccionada, setDerivacionSeleccionada] = useState(
    derivations ? derivations[0] : []
  );

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
                        <TableHead className="font-bold">ID Caso</TableHead>
                        <TableHead className="font-bold">Delito</TableHead>
                        <TableHead className="font-bold">Responsable</TableHead>
                        <TableHead className="font-bold">Creada</TableHead>
                        <TableHead className="font-bold">
                          Centro de Salud
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {derivations?.map((derivacion, index) => (
                        <TableRow
                          key={index}
                          onClick={() => setDerivacionSeleccionada(derivacion)}
                          className={`hover:bg-muted/50 cursor-pointer`}
                        >
                          <TableCell className="font-medium">
                            {derivacion?.id}
                          </TableCell>
                          <TableCell>{derivacion.crime.name}</TableCell>
                          <TableCell>
                            {derivacion?.user?.first_name}{" "}
                            {derivacion?.user?.last_name}
                          </TableCell>
                          <TableCell>
                            {new Date(derivacion?.created_at).toLocaleString()}
                          </TableCell>
                          <TableCell>{derivacion?.center.service}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Paginación */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Mostrando {derivations?.length} de {derivations?.length}{" "}
                    resultados
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
