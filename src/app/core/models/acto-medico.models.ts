export class ActoMedico {
  idcita: number;
  motivo: string;
  problema: string;
  parterial: number;
  fcardiaca: number;
  frespiratoria: number;
  tbucal: number;
  taxiliar: number;
  peso: number;
  talla: number;
  icorporal: number;
  pcefalico: number;
  examen: string;
  dx1: string;
  desx1: string;
  tdx1: number;
  dx2: string;
  desx2: string;
  tdx2: number;
  dx3: string;
  desx3: string;
  tdx3: number;
  fecha: string;
  usuario: string;
  destino: number;

  constructor(object: any, id: number, cie: any, usuario: string) {
    (this.idcita = id),
      (this.motivo = object.motivo.toUpperCase()),
      (this.problema = object.enfermedad.toUpperCase()),
      (this.parterial = object.arterial.toUpperCase()),
      (this.fcardiaca = object.cardiaca.toUpperCase()),
      (this.frespiratoria = object.respiratorio.toUpperCase()),
      (this.tbucal = object.bucal),
      (this.taxiliar = object.axilar),
      (this.peso = object.peso),
      (this.talla = object.talla),
      (this.icorporal = object.mcorporal),
      (this.pcefalico = object.cefalico),
      (this.examen = object.examen.toUpperCase()),
      (this.destino = object.destino.toUpperCase()),
      (this.dx1 = cie[0] === undefined ? null : cie[0].codigo),
      (this.desx1 =
        cie[0] === undefined ? null : cie[0].descripcion.toUpperCase()),
      (this.tdx1 = cie[0] === undefined ? null : cie[0].tdiag),
      (this.dx2 = cie[1] === undefined ? null : cie[1].codigo),
      (this.desx2 =
        cie[1] === undefined ? null : cie[1].descripcion.toUpperCase()),
      (this.tdx2 = cie[1] === undefined ? null : cie[1].tdiag),
      (this.dx3 = cie[2] === undefined ? null : cie[2].codigo),
      (this.desx3 =
        cie[2] === undefined ? null : cie[2].descripcion.toUpperCase()),
      (this.tdx3 = cie[2] === undefined ? null : cie[2].tdiag),
      //(this.fecha = moment().format()),
      (this.usuario = usuario);
  }
}
