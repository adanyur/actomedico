export class CieSelect {
  public codigo: string;
  public descripcion: string;
  public tdiag: number;

  constructor(object: any) {
    this.codigo = object.codigo;
    this.descripcion = object.descripcion;
    this.tdiag = 1;
  }
}
